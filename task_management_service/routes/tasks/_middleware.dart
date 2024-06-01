// lib/routes/tasks/_middleware.dart
import 'package:dart_frog/dart_frog.dart';
import 'package:dart_frog_auth/dart_frog_auth.dart';
import 'package:task_management_service/authenticator.dart';
import 'package:task_management_service/user.dart';

Handler middleware(Handler handler) {
  return handler.use(
    
    bearerAuthentication<User>(
      authenticator: (context, token) async {
        final body = await context.request.json();
        print(body);

        final authenticator = context.read<Authenticator>();
        return authenticator.verifyToken(token);
      },
    ),
  );
}