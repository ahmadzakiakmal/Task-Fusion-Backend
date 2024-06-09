package com.projects.project_management.projects;

import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
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
    public Project createpProject(@RequestBody Project project) {
        return projectRepository.save(project);
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

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteProject(@PathVariable Long id) {
        try {
            if ( projectRepository.existsById(id)) {
                projectRepository.deleteById(id);
                return new ResponseEntity<>(new ApiResponse(true, "Project deleted successfully"), HttpStatus.OK);
            } else {
                return new ResponseEntity<>(new ApiResponse(false, "Project not found"), HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(new ApiResponse(false, "An error occurred"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    

}
