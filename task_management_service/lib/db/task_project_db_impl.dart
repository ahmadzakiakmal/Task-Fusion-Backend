import 'package:task_management_service/db/task_DB_abstrac.dart';
import 'package:task_management_service/models/task.dart';

class TaskProjectDatabaseClass extends TaskDatabaseAbstract{ 
  TaskProjectDatabaseClass(super.dbConnection, {required this.project_id});

  final String project_id;
  
  @override
  Future createTask({required Task task, int? userId}) {
    // TODO: implement createTask
    throw UnimplementedError();
  }
  
  @override
  Future deleteTask({required int taskId, int? userId}) {
    // TODO: implement deleteTask
    throw UnimplementedError();
  }
  
  @override
  Future<List<Task>> getAllTask({int? userId}) {
    // TODO: implement getAllTask
    throw UnimplementedError();
  }
  
  @override
  Future<Task> getTask({required int taskId, int? userId}) {
    // TODO: implement getTask
    throw UnimplementedError();
  }
  
  @override
  Future updateTask({required Task task, int? userId}) {
    // TODO: implement updateTask
    throw UnimplementedError();
  }
  


}