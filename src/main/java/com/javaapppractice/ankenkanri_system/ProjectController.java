package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
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
        p.setStatus("申請待ち"); // 初期値

        projectRepository.save(p);
        return "登録成功";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "削除成功";
    }

    @PutMapping("/{id}/approve")
    public String approve(@PathVariable Long id, @RequestParam String role) {
        Project p = projectRepository.findById(id).orElseThrow();

        String currentStatus = p.getStatus();
        String nextStatus = null;

        if ("申請待ち".equals(currentStatus) && "manager".equals(role)) {
            nextStatus = "部長承認待ち";
        } else if ("部長承認待ち".equals(currentStatus) && "admin".equals(role)) {
            nextStatus = "最終承認待ち";
        } else if ("最終承認待ち".equals(currentStatus) && "admin".equals(role)) {
            nextStatus = "最終承認済み";
        } else {
            throw new RuntimeException("承認権限がない、またはすでに完了しています");
        }

        p.setStatus(nextStatus);
        projectRepository.save(p);
        return "承認更新成功";
    }


    // ✅ 申請ボタン（申請待ち → 部長承認待ち）
    @PutMapping("/{id}/submit")
    public String submitProject(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        if (!"申請待ち".equals(project.getStatus())) {
            throw new RuntimeException("申請できるのは『申請待ち』のみです");
        }
        project.setStatus("部長承認待ち");
        projectRepository.save(project);
        return "申請が完了しました";
    }

    // ✅ 差し戻し
    @PutMapping("/{id}/reject")
    public String rejectProject(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        project.setStatus("差し戻し");
        projectRepository.save(project);
        return "差し戻しが完了しました";
    }

    @PutMapping("/{id}/resubmit")
    public String resubmitProject(@PathVariable Long id) {
        Project project = projectRepository.findById(id).orElseThrow();
        if (!"差し戻し".equals(project.getStatus())) {
            throw new RuntimeException("『差し戻し』状態の案件のみ再申請可能です");
        }
        project.setStatus("申請待ち");
        projectRepository.save(project);
        return "再申請が完了しました";
    }

    @GetMapping("/export/csv")
    public void exportCSV(HttpServletResponse response) throws IOException {
        List<Project> projects = projectRepository.findAll();

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"projects.csv\"");

        PrintWriter writer = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8));

        // CSVヘッダー行
        writer.println("案件名,顧客名,金額,参画者,担当営業,案件タイプ,業務内容,ステータス,期限");

        for (Project p : projects) {
            writer.printf("%s,%s,%s,%s,%s,%s,%s,%s,%s%n",
                safe(p.getTitle()),
                safe(p.getCustomer()),
                p.getAmount() != null ? p.getAmount().toString() : "",
                safe(p.getMember()),
                safe(p.getSales()),
                safe(p.getType()),
                safe(p.getDescription()),
                safe(p.getStatus()),
                p.getDeadline() != null ? p.getDeadline().toString() : ""
            );
        }

        writer.flush();
        writer.close();
    }

    // CSVに安全に出力する（カンマ・改行を考慮）
    private String safe(String s) {
        if (s == null) return "";
        return "\"" + s.replace("\"", "\"\"").replace("\n", " ").replace("\r", "") + "\"";
    }

}
