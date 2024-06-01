
import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/authenticator.dart';

Handler middleware(Handler handler) {
 
  return handler.use(
    provider<Authenticator>(
      (_) => Authenticator(),
    ),
  );
}