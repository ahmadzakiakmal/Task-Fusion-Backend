package com.projects.project_management.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long>{

    @Query(value = "SELECT COUNT(*) FROM users WHERE id = :userId", nativeQuery = true)
    int userExists(@Param("userId") Long userId);

    @Query(value = "SELECT COUNT(*) FROM Project WHERE id = :projectId", nativeQuery = true)
    int projectExists(@Param("projectId") Long projectId);

    @Query(value = "SELECT COUNT(*) FROM Project_user WHERE user_id = :userId", nativeQuery = true)
    int userExistInProjectUser(@Param("userId") Long userId);

    
    
    @Query(value = "SELECT COUNT(*) FROM Project_user WHERE user_id = :userId and is_master = True", nativeQuery = true)
    int userMaster(@Param("userId") Long userId);

    

    
    @Query(value = "SELECT COUNT(*) FROM Project_user WHERE user_id = :userId and project_id = :projectId", nativeQuery = true)
    int alreadyInvited(@Param("userId") Long userId, @Param("projectId") Long projectId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Project_user (user_id, project_id, is_master) VALUES (:userId, :projectId, TRUE)", nativeQuery = true)
    void createRelationUserProject(@Param("userId") Long userId, @Param("projectId") Long projectId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO Project_user (user_id, project_id, is_master) VALUES (:userId, :projectId, False)", nativeQuery = true)
    void inviteUserToProject(@Param("userId") Long userId, @Param("projectId") Long projectId);


    @Modifying
    @Transactional
    @Query(value = "DELETE FROM Project_User WHERE user_id = :userId AND project_id = :projectId;", nativeQuery = true)
    void removeUserFromProject(@Param("userId") Long userId, @Param("projectId") Long projectId);

} 
