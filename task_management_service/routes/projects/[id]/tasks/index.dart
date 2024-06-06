// routes/tasks/index.dart
import 'dart:io';

import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/task_db_impl.dart';
import 'package:task_management_service/db/task_project_db_impl.dart';
import 'package:task_management_service/models/task.dart';

Future<Response> onRequest(RequestContext context, String id)async{
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

  final taskProjectDatabaseClass = context.read<TaskProjectDatabaseClass>();
  final allTask = await taskProjectDatabaseClass.getAllTask();
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
  final taskProjectDatabaseClass = context.read<TaskProjectDatabaseClass>();

  final title = body['title'] as String;
  final description = body['description'] as String;
  final milestone = body['milestone'] as String;
  final created = DateTime.now();
  final deadline = DateTime.now();
  final newTask = Task( title: title, description: description, 
  milestone: milestone, 
  created: created, 
  deadline: deadline);
   await taskProjectDatabaseClass.createTask(task: newTask,);
  return Response.json(
    statusCode: 201,
    body: {
      'message': 'success'
    }
  );

}