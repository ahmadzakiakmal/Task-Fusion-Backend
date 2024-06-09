import 'dart:developer';
import 'dart:io';

import 'package:postgres/postgres.dart';

class DatabaseConnecton{
  DatabaseConnecton(){
     _host = Platform.environment['DB_HOST']?? "localhost";
    _port = int.tryParse(Platform.environment['DB_PORT'] ?? '') ?? 5432;
    _database = Platform.environment['DB_DATABASE'] ?? 'test';
    _username = Platform.environment['DB_USERNAME'] ?? 'test';
    _password = Platform.environment['DB_PASSWORD'] ?? 'test';
  }

  late final String _host;
  late final int _port;
  late final String _database;
  late final String _username;
  late final String _password;
  
  Connection? _postgreSQLConnection;

  Connection get db =>
      _postgreSQLConnection ??= throw Exception('Database connection not initialized');

  Future<void> connect() async {


    try {
      _postgreSQLConnection = await Connection.open(
      Endpoint(
        host: _host, 
        database: _database,
        port:  _port, 
        username: _username, 
        password: _password,),
        settings: ConnectionSettings(sslMode: SslMode.disable)
      );
      print('Database connection successful');
      
    } catch (e) {
      print('Database connection failed: $e');
    }
  }

  Future<void> close() => _postgreSQLConnection!.close();
}