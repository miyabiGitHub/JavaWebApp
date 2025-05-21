package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepository;

    @GetMapping
    public List<Project> getAll() {
        return projectRepository.findAll();
    }

    @GetMapping("/{status}")
    public List<Project> getByStatus(@PathVariable String status) {
        return projectRepository.findByStatus(status);
    }

    @PostMapping
    public String register(@RequestBody ProjectRequest request) {
        Project p = new Project();
        p.setTitle(request.getTitle());
        p.setCustomer(request.getCustomer());
        p.setAmount(new BigDecimal(request.getAmount()));
        p.setMember(request.getMember());
        p.setSales(request.getSales());
        p.setType(request.getType());
        p.setDescription(request.getDescription());
        p.setDeadline(LocalDate.parse(request.getDeadline()));
        p.setStatus("承認待ち"); // 初期値

        projectRepository.save(p);
        return "登録成功";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "削除成功";
    }

    @PutMapping("/{id}/approve")
    public String approve(@PathVariable Long id) {
        Project p = projectRepository.findById(id).orElseThrow();
        p.setStatus("承認済み");
        projectRepository.save(p);
        return "承認完了";
    }

    @PutMapping("/{id}/reject")
    public String reject(@PathVariable Long id) {
        Project p = projectRepository.findById(id).orElseThrow();
        p.setStatus("差し戻し");
        projectRepository.save(p);
        return "差し戻し完了";
    }
}
