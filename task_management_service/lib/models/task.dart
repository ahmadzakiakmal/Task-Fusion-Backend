import 'package:json_annotation/json_annotation.dart';

part 'task.g.dart';

@JsonSerializable()
class Task{
  
  const Task({ this.id, this.user_id ,this.project_id, required this.title, required this.description, required this.milestone, required this.created, required this.deadline});

  final int? id;
  final int? user_id;
  final int? project_id;
  final String title;
  final String description;
  final String milestone;
  final DateTime deadline;
  final DateTime created;
  factory Task.fromJson(Map<String, dynamic> json) => _$TaskFromJson(json);

  Task copyWithTask({
    required int id,
    required int user_id,
    String? title,
    String? description,
    String? milestone,
    DateTime? deadline
  }){
    return Task(
      id: id,
      user_id: user_id,
      title: title?? this.title, description: description?? this.description, 
      milestone: milestone?? this.milestone, 
      created: created, 
      deadline: deadline?? this.deadline);
  }

  Task copyWithTaskProject({
    required int id,
    required int project_id,
    String? title,
    String? description,
    String? milestone,
    DateTime? deadline
  }){
    return Task(
      id: id,
      project_id: project_id,
      title: title?? this.title, description: description?? this.description, 
      milestone: milestone?? this.milestone, 
      created: created, 
      deadline: deadline?? this.deadline);
  }

  Map<String, dynamic> toJson() => _$TaskToJson(this);

}