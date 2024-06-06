import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/db/task_project_db_impl.dart';

Future<Response> onRequest(RequestContext context, String id)async {
  print("halo bang 222");
  final projectClass = context.read<TaskProjectDatabaseClass>();
  projectClass.deleteTask(taskId: 123);
  return Response();
}