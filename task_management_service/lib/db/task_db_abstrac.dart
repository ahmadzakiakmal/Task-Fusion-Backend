import 'package:postgres/postgres.dart';
import 'package:task_management_service/db/database_connection.dart';

import '../models/task.dart';

abstract class TaskDatabaseAbstract{
  final DatabaseConnecton db;
  TaskDatabaseAbstract(this.db);
  
  Future<dynamic> createTask(Task task);

  Future<List<Task>> getAllTask();

  Future<Task> getTask(int taskId );

  Future<dynamic> updateTask(Task task);

  Future<dynamic> deleteTask(int taskId);
}