import '../models/task.dart';

abstract class TaskDatabaseAbstract{
  Future<dynamic> createTask(Task task);

  Future<List<Task>> getAllTask();

  Future<Task> getTask(int taskId );

  Future<dynamic> updateTask(Task task);

  Future<dynamic> deleteTask(int taskId);
}