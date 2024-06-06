
import 'dart:async';

import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/task_project_db_impl.dart';

import '../../../_middleware.dart';






Handler middleware(Handler handler){
  return handler
  .use((handler) => (context) => initialMiddleware(context, handler) ,)
  .use( provider<TaskProjectDatabaseClass>((context) => TaskProjectDatabaseClass(db, project_id: context.mountedParams["id"]??"")));  
}

Future<Response> initialMiddleware(RequestContext context, Handler handler)async{
    print(context.mountedParams["id"]);
 
  return  handler(context.provide(() => null));
}