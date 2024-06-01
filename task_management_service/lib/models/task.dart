import 'package:json_annotation/json_annotation.dart';

part 'task.g.dart';

@JsonSerializable()
class Task{
  
  const Task({required this.id, this.project_id, required this.title, required this.description, required this.milestone, required this.created, required this.deadline});

  final int id;
  final int? project_id;
  final String title;
  final String description;
  final String milestone;
  final DateTime deadline;
  final DateTime created;

  Map<String, dynamic> toJson() => _$TaskToJson(this);

}