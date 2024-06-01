import 'package:postgres/postgres.dart';
import 'package:task_management_service/db/task_DB_abstrac.dart';
import 'package:task_management_service/models/task.dart';

class TaskDatabaseClass extends TaskDatabaseAbstract{
  TaskDatabaseClass(super.db);

  
  @override
  Future<void> createTask(Task task) {
    
    // TODO: implement createTask
    throw UnimplementedError();
  }

  @override
  Future<void> deleteTask(int taskId) {
    // TODO: implement deleteTask
    throw UnimplementedError();
  }

  @override
  Future<List<Task>> getAllTask() {
    // TODO: implement getAllTask
    throw UnimplementedError();
  }

  @override
  Future<Task> getTask(int taskId) {
    // TODO: implement getTask
    throw UnimplementedError();
  }

  @override
  Future<void> updateTask(Task task) {
    
    // TODO: implement updateTask
    throw UnimplementedError();
  }


  
}