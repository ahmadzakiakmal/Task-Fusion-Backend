
import 'dart:async';

import 'package:dart_frog/dart_frog.dart';
import 'package:dotenv/dotenv.dart';
import 'package:task_management_service/db/database_connection.dart';
import 'package:task_management_service/db/task_project_db_impl.dart';
import 'package:task_management_service/user.dart';


final env = DotEnv()..load();
final _db = DatabaseConnecton(env);



Handler middleware(Handler handler){
  return handler
  .use((handler) => (context) => initialMiddleware(context, handler) ,)
  .use( provider<TaskProjectDatabaseClass>((context) => TaskProjectDatabaseClass(_db, project_id: context.mountedParams["id"]??"")));  
}

Future<Response> initialMiddleware(RequestContext context, Handler handler)async{
    print(context.mountedParams["id"]);
 
  return  handler(context.provide(() => User(id: "id", name: "name", password: "password")));
}