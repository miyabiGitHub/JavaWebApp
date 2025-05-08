package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @PostMapping
    public String registerProject(@RequestBody ProjectRequest request) {
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setCustomer(request.getCustomer());
        project.setDescription(request.getDescription());
        project.setSyain(request.getSyain());
        project.setEigyo(request.getEigyo());
        project.setType(request.getType());

        Project savedProject = projectRepository.save(project);
        System.out.println("保存結果: " + savedProject.getId());

        return "案件登録成功！";
    }
}


