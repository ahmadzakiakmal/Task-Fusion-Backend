import 'dart:developer';

import 'package:dotenv/dotenv.dart';
import 'package:postgres/postgres.dart';

class DatabaseConnecton{
  DatabaseConnecton(this._dotEnv){
     _host = _dotEnv['DB_HOST'] ?? 'localhost';
    _port = int.tryParse(_dotEnv['DB_PORT'] ?? '') ?? 5432;
    _database = _dotEnv['DB_DATABASE'] ?? 'test';
    _username = _dotEnv['DB_USERNAME'] ?? 'test';
    _password = _dotEnv['DB_PASSWORD'] ?? 'test';
  }
  final DotEnv _dotEnv;

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
        password: _password,)
      );
      log('Database connection successful');
      
    } catch (e) {
      log('Database connection failed: $e');
    }
  }

  Future<void> close() => _postgreSQLConnection!.close();
}