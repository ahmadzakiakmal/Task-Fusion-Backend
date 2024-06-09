
import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/database_connection.dart';

final db = DatabaseConnecton();

Handler middleware(Handler handler){
  return handler;
}