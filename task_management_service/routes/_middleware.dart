
import 'package:dart_frog/dart_frog.dart';
import 'package:dotenv/dotenv.dart';
import 'package:task_management_service/authenticator.dart';
import 'package:task_management_service/db/database_connection.dart';

final env = DotEnv()..load();
final db = DatabaseConnecton(env);

Handler middleware(Handler handler) {
 
  return handler.use(
    provider<Authenticator>(
      (_) => Authenticator(),
    ),
  );
}