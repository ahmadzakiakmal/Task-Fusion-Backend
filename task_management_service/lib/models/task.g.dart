// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'task.dart';

// **************************************************************************
// JsonSerializableGenerator
// **************************************************************************

Task _$TaskFromJson(Map<String, dynamic> json) => Task(
      id: (json['id'] as num).toInt(),
      project_id: (json['project_id'] as num?)?.toInt(),
      title: json['title'] as String,
      description: json['description'] as String,
      milestone: json['milestone'] as String,
      created: DateTime.parse(json['created'] as String),
      deadline: DateTime.parse(json['deadline'] as String),
    );

Map<String, dynamic> _$TaskToJson(Task instance) => <String, dynamic>{
      'id': instance.id,
      'project_id': instance.project_id,
      'title': instance.title,
      'description': instance.description,
      'milestone': instance.milestone,
      'deadline': instance.deadline.toIso8601String(),
      'created': instance.created.toIso8601String(),
    };
