// routes/sign_in.dart
import 'dart:io';

import 'package:dart_frog/dart_frog.dart';
import 'package:task_management_service/authenticator.dart';

Future<Response> onRequest(RequestContext context) async {
  return switch (context.request.method) {
    HttpMethod.post => _onPost(context),
    _ => Future.value(
        Response(statusCode: HttpStatus.methodNotAllowed),
      ),
  };
}

Future<Response> _onPost(RequestContext context) async {
  final body = await context.request.json() as Map<String, dynamic>;
  final username = body['username'] as String?;
  final password = body['password'] as String?;

  if (username == null || password == null) {
    return Response(statusCode: HttpStatus.badRequest);
  }

  final authenticator = context.read<Authenticator>();
  print(username);
  print(password);

  final user = authenticator.findByUsernameAndPassword(
    username: username,
    password: password,
  );

  if (user == null) {
    return Response(statusCode: HttpStatus.unauthorized);
  } else {
    return Response.json(
      body: { 'token': username },
    );
  }
}