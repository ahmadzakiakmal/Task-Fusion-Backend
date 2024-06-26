package com.projects.project_management.projects;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;





@RestController
@RequestMapping("/projects")
public class ProjectController {
    
    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAllProjects() {
       
        return projectRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> getProjectById(@PathVariable Long id) {
        try {
            if ( projectRepository.existsById(id)) {
              Project project = projectRepository.findById(id).get();
                return new ResponseEntity<>(project, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ApiResponse(false, "Project not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "An error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }


        
    }

    @PostMapping
    public ResponseEntity<Object> createProject(@RequestBody Project project, @RequestParam Long userId) {
        if (projectRepository.userExists(userId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "User not found"), HttpStatus.NOT_FOUND);
        }
        Project result = projectRepository.save(project);
        projectRepository.createRelationUserProject(userId, result.getId());
        return new ResponseEntity<>( result , HttpStatus.OK);
    }

    @PostMapping("/invite")
    public ResponseEntity<Object> inviteMemberToProject(@RequestBody InviteRequestProject inviteRequestProject ,@RequestParam Long userMasterId ) {
        if (projectRepository.userExists(userMasterId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Master User not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.userExists(inviteRequestProject.getUserId()) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "User not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.projectExists(inviteRequestProject.getProjectId()) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Project not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.userMaster(userMasterId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "userMasterId is not master"), HttpStatus.NOT_FOUND);
        }

        if (projectRepository.alreadyInvited(inviteRequestProject.getUserId(), inviteRequestProject.getProjectId()) != 0) {
            return new ResponseEntity<>(new ApiResponse(false, "User already invited"), HttpStatus.NOT_FOUND);
        }

        
        projectRepository.inviteUserToProject(inviteRequestProject.getUserId(), inviteRequestProject.getProjectId());


        
        return new ResponseEntity<>(new ApiResponse(true, "Successfully invite user to project"), HttpStatus.OK);
    }

    @DeleteMapping("/kick")
    public ResponseEntity<Object> removeMemberFromProject(@RequestParam Long userMasterId, @RequestParam Long userId, @RequestParam Long projectId ) {
        if (projectRepository.userExists(userMasterId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Master User not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.userExists(userId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "User not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.projectExists(projectId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "Project not found"), HttpStatus.NOT_FOUND);
        }
        if (projectRepository.userMaster(userMasterId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "userMasterId is not master"), HttpStatus.NOT_FOUND);
        }

        if (projectRepository.alreadyInvited(userId,projectId) == 0) {
            return new ResponseEntity<>(new ApiResponse(false, "User already removed"), HttpStatus.NOT_FOUND);
        }

        
        projectRepository.removeUserFromProject(userId, projectId);


        
        return new ResponseEntity<>(new ApiResponse(true, "Successfully remove user from project"), HttpStatus.OK);
    }
    

    @PutMapping("/{id}")
    public Project updateProject(@PathVariable Long id, @RequestBody Project project) {
        Project existingProject = projectRepository.findById(id).get();
        if(project.getTitle() != null)
        existingProject.setTitle(project.getTitle());
        if(project.getDescription() != null)
        existingProject.setDescription(project.getDescription());
        
        return projectRepository.save(existingProject);
        
    }

    @DeleteMapping("/{projectId}")
    public ResponseEntity<Object> deleteProject(  @PathVariable Long projectId, @RequestParam Long userMasterId) {
        try {

            if (projectRepository.userExistInProjectUser(userMasterId) == 0) {
                return new ResponseEntity<>(new ApiResponse(false, "User not created project yet"), HttpStatus.NOT_FOUND);
            }
            if (projectRepository.userMaster(userMasterId) == 0) {
                return new ResponseEntity<>(new ApiResponse(false, "userMasterId is not master"), HttpStatus.NOT_FOUND);
            }
        
            if ( projectRepository.existsById(projectId)) {
                projectRepository.deleteById(projectId);
                return new ResponseEntity<>(new ApiResponse(true, "Project deleted successfully"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ApiResponse(false, "Project not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "An error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
