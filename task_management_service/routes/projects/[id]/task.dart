import 'package:dart_frog/dart_frog.dart';

Response onRequest(RequestContext context,String id){


  return Response.json(body: {
    'message': 'success',
    'id': id,
  },);
}
