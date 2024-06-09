// lib/routes/tasks/_middleware.dart
import 'package:dart_frog/dart_frog.dart';
import 'package:dart_frog_auth/dart_frog_auth.dart';
import 'package:dotenv/dotenv.dart';
import 'package:task_management_service/authenticator.dart';
import 'package:task_management_service/db/task_db_impl.dart';
import 'package:task_management_service/user.dart';

import '../_middleware.dart';



Handler middleware(Handler handler){
  return handler
  .use((handler) => (context) => initialMiddleware(context, handler) ,)
  .use( provider<TaskDatabaseClass>((context) => TaskDatabaseClass(db)));  
}

Future<Response> initialMiddleware(RequestContext context, Handler handler)async{
    print(context.mountedParams["id"]);
 
  return  handler(context.provide(() => null));
}