import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/task_db_impl.dart';
import 'package:task_management_service/db/task_project_db_impl.dart';
import 'package:task_management_service/models/task.dart';

Future<Response> onRequest(RequestContext context,String id, String taskId)async{
  switch(context.request.method){
    case HttpMethod.get:
      return _get(context, taskId); 
    case HttpMethod.put:
      return _update(context,id, taskId);
    case HttpMethod.delete:
      return _delete(context, taskId);
    default:
      return Response();

  }
}

Future<Response> _get(RequestContext context, String taskId)async{
  try{
  final todoDatabaseClass = context.read<TaskProjectDatabaseClass>();
  final getTask = await todoDatabaseClass.getTask(taskId: int.tryParse(taskId)??0);
  return Response.json(
    statusCode: 200,
    body: {
      'message': 'success',
      'task': getTask.toJson()
    }
  );
  }catch(err){
    if(err.toString().contains('data empty')){
      return Response.json(
        statusCode: 200, 
      body: {
        'message': 'success',
        'task' : null
      });
    }
    return Response.json(
      statusCode: 404,
      body: {
        'error': 'data error'
      }
    );
  }
}

Future<Response> _update(RequestContext context,String projectId, String taskId)async{
  try{

    final body = await context.request.json();

  final todoDatabaseClass = context.read<TaskProjectDatabaseClass>();
final getTask = await todoDatabaseClass.getTask(
  taskId: int.tryParse(taskId)??0, 
  );




  final title = body['title'] as String?;
  final description = body['description'] as String?;
  final milestone = body['milestone'] as String?;
  final deadline = DateTime.now();
  final newTask = getTask.copyWithTaskProject(
    id: int.tryParse(taskId)??0,
    project_id: int.tryParse(projectId)??0,
    title: title,
    description: description,
    milestone: milestone,
    deadline: deadline

     
     );

   await todoDatabaseClass.updateTask(task: newTask);
  return Response.json(
    statusCode: 201,
    body: {
      'message': 'success'
    }
  );
  }catch(err){
 return Response.json(
      statusCode: 404,
      body: {
        'error': 'data error'
      }
    );
  }

}

Future<Response> _delete(RequestContext context, String taskId)async{


  final todoDatabaseClass = context.read<TaskProjectDatabaseClass>();
  try{
    await todoDatabaseClass.deleteTask(taskId: int.tryParse(taskId)??0, );
  return Response.json(
    statusCode: 201,
    body: {
      'message' : 'success'
    }
  ); 
  }catch(err){
    print(err);
    return Response.json(
      statusCode: 404,
      body: {
        'error': 'data error'
      }
    );
  }
  
}