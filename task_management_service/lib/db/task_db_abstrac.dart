import 'package:postgres/postgres.dart';
import 'package:task_management_service/db/database_connection.dart';

import '../models/task.dart';

abstract class TaskDatabaseAbstract{
  TaskDatabaseAbstract(this.dbConnection);
  final DatabaseConnecton dbConnection;
  
  Future<dynamic> createTask({required Task task, int? userId});

  Future<List<Task>> getAllTask({int? userId});

  Future<Task> getTask({required int taskId, int? userId});

  Future<dynamic> updateTask({required Task task, int? userId});

  Future<dynamic> deleteTask({required int taskId, int? userId});
}