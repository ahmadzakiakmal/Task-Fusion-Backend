import 'package:intl/intl.dart';

import 'package:task_management_service/db/task_DB_abstrac.dart';
import 'package:task_management_service/models/task.dart';

class TaskDatabaseClass extends TaskDatabaseAbstract{
  TaskDatabaseClass(super.dbConnection);
  
  @override
  Future<void> createTask({required Task task, int? userId}) async{
  try{
   await dbConnection.connect();
    String deadline = DateFormat('yyyy-MM-dd HH:mm:ss').format(task.deadline);
    String created = DateFormat('yyyy-MM-dd HH:mm:ss').format(task.created);


 final result =  await dbConnection.db.execute('''

INSERT INTO task (user_id, title, description, milestone, deadline, created) 
VALUES ($userId,  '${task.title}', '${task.description}', '${task.milestone}', '$deadline', '$created');

''');
    if (result.affectedRows == 0) {
        throw  Exception('Failed to create todo');
    }
  }
   on Exception catch (_) {
    throw Exception( 'Unexpected error');
  } finally {
    await dbConnection.close();
  }

  }
  
  @override
  Future<void> deleteTask({required int taskId, int? userId}) async{
     try{
   await dbConnection.connect();


 final result =  await dbConnection.db.execute('''
      DELETE FROM task WHERE id = $taskId AND user_id = $userId

''');
   
  }
   on Exception catch (_) {
    throw Exception( 'Unexpected error');
  } finally {
    await dbConnection.close();
  }
  }
  
  @override
  Future<List<Task>> getAllTask({int? userId})async {
    try{
   await dbConnection.connect();

      print('get task');
      final result = await dbConnection.db.execute('''
      SELECT * FROM task
      WHERE user_id = $userId
      ;
      ''');

      final tasks = result.map((row) {
        return Task(
          id: (row[0] as num?)?.toInt(), 
          user_id: (row[1] as num?)?.toInt(), 
          project_id: (row[2] as num?)?.toInt(),  
          title: row[3]as String? ??'', 
          description: row[4]as String? ??'', 
          milestone: row[5]as String? ??'', 
          deadline: row[6]as DateTime? ?? DateTime.now(), 
          created: row[7]as DateTime? ?? DateTime.now(),);
      }).toList();

      return tasks;
    }catch(err){
      print(err.toString());
      print('error');
      throw Exception("Error Occured");
    }finally{
      await dbConnection.close();
    }
  }
  
  @override
  Future<Task> getTask({required int taskId, int? userId}) async{
     try{
   await dbConnection.connect();


 final result =  await dbConnection.db.execute('''
      SELECT * FROM task WHERE id = $taskId AND user_id = $userId

''');
    if(result.isEmpty){
      throw Exception('data empty');
    }

    final data = result[0];
    

    return Task(
          id: (data[0] as num?)?.toInt(), 
          user_id: (data[1] as num?)?.toInt(), 
          project_id: (data[2] as num?)?.toInt(),  
          title: data[3]as String? ??'', 
          description: data[4]as String? ??'', 
          milestone: data[5]as String? ??'', 
          deadline: data[6]as DateTime? ?? DateTime.now(), 
          created: data[7]as DateTime? ?? DateTime.now(),);
  }
    catch (err) {
      print(err);
    if(err.toString().contains('data empty')){
      throw Exception('data empty');
    }
    throw Exception( 'Unexpected error');
  } finally {
    await dbConnection.close();
  }
  }
  
  @override
  Future<void> updateTask({required Task task, int? userId})async {
    try{
   await dbConnection.connect();
    String deadline = DateFormat('yyyy-MM-dd HH:mm:ss').format(task.deadline);
    print("UPDATE TASK");
    print(task.toJson());


 final result =  await dbConnection.db.execute('''

  UPDATE task
  SET title = '${task.title}', description = '${task.description}', milestone = '${task.milestone}', deadline = '$deadline'
  WHERE id = ${task.id};

''');


    if (result.affectedRows == 0) {
        throw  Exception('Failed to update todo');
    }
  }
   on Exception catch (_) {
    throw Exception( 'Unexpected error');
  } finally {
    await dbConnection.close();
  }
  }

 
  
}