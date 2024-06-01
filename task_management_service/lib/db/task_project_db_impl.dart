import 'package:task_management_service/db/task_DB_abstrac.dart';
import 'package:task_management_service/models/task.dart';

class TaskProjectDatabaseClass extends TaskDatabaseAbstract{ 
  TaskProjectDatabaseClass(super.db, {required this.project_id});

  final String project_id;
 
  
  @override
  Future<void> createTask(Task task) {
    print("Project id : $project_id");
    // TODO: implement createTask
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

    @override
  Future<void> deleteTask(int taskId) async{
    print("Project id : $project_id");

    // TODO: implement deleteTask
    // throw UnimplementedError();
  }
  
  
}