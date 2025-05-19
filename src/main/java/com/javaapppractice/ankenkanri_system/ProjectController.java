package com.javaapppractice.ankenkanri_system;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("/projects")
@CrossOrigin
public class ProjectController {

  @Autowired
  private ProjectRepository repo;

  @GetMapping
  public List<Project> getAll() {
    return repo.findAll();
  }

  @PostMapping
  public String register(@RequestBody Project p) {
    p.setStatus("承認待ち");
    repo.save(p);
    return "登録成功";
  }

  @GetMapping("/{id}")
  public Project getOne(@PathVariable Long id) {
    return repo.findById(id).orElse(null);
  }

  @PutMapping("/{id}")
  public String update(@PathVariable Long id, @RequestBody Project p) {
    p.setId(id);
    repo.save(p);
    return "更新成功";
  }

  @DeleteMapping("/{id}")
  public String delete(@PathVariable Long id) {
    repo.deleteById(id);
    return "削除成功";
  }

  @GetMapping("/status/{status}")
  public List<Project> getByStatus(@PathVariable String status) {
  return repo.findByStatus(status);
}

  @PutMapping("/{id}/approve")
  public String approve(@PathVariable Long id) {
    Project p = repo.findById(id).orElseThrow();
    p.setStatus("承認済み");
    repo.save(p);
    return "承認成功";
  }

  @GetMapping("/export/csv")
  public void exportCSV(HttpServletResponse response) throws IOException {
    response.setContentType("text/csv; charset=UTF-8");
    response.setHeader("Content-Disposition", "attachment; filename=projects.csv");

    List<Project> projects = repo.findAll();

    PrintWriter writer = response.getWriter();
    writer.println("案件名,顧客名,業務内容,参画者,担当営業,案件タイプ,ステータス");

    for (Project p : projects) {
        writer.printf("\"%s\",\"%s\",\"%s\",\"%s\",\"%s\",\"%s\"\n",
            p.getTitle(), p.getCustomer(), p.getDescription(),
            p.getSyain(), p.getEigyo(), p.getType(), p.getStatus());
    }

    writer.flush();
    writer.close();
}

  @PutMapping("/{id}/reject")
    public String reject(@PathVariable Long id) {
      Project p = repo.findById(id).orElseThrow();
      p.setStatus("差し戻し");
      repo.save(p);
      return "差し戻し完了";
  }
}



