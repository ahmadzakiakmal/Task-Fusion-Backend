// routes/tasks/index.dart
import 'dart:io';

import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/task_db_impl.dart';
import 'package:task_management_service/models/task.dart';

Future<Response> onRequest(RequestContext context)async{
  switch(context.request.method){
    case HttpMethod.get:
      return _getAllTask(context); 
    case HttpMethod.post:
      return _create(context);
    default:
      return Response();

  }
}


Future<Response> _getAllTask(RequestContext context)async{
  final request = context.request;
  final params = request.uri.queryParameters;
   final userId = int.tryParse(params['userId'] as String);
  final todoDatabaseClass = context.read<TaskDatabaseClass>();
  final allTask = await todoDatabaseClass.getAllTask(userId: userId);
  return Response.json(
    statusCode: 200,
    body: {
      'message' : 'success',
      'tasks': allTask.map((e) => e.toJson()).toList()
    }
  );
}

Future<Response> _create(RequestContext context)async{
  final body = await context.request.json();
  final todoDatabaseClass = context.read<TaskDatabaseClass>();

  final userId = body['userId'] as int;
  final title = body['title'] as String;
  final description = body['description'] as String;
  final milestone = body['milestone'] as String;
  final created = DateTime.now();
  final deadline = DateTime.tryParse(   body['deadline'] as String);
  final newTask = Task( title: title, description: description, milestone: milestone, created: created, deadline: deadline?? DateTime.now());
   await todoDatabaseClass.createTask(task: newTask, userId: userId);
  return Response.json(
    statusCode: 201,
    body: {
      'message': 'success'
    }
  );

}

