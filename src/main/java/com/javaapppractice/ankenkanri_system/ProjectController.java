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

    @GetMapping("/status/{status}")
    public List<Project> getByStatus(@PathVariable String status) {
        return projectRepository.findByStatus(status);
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Long id) {
        return projectRepository.findById(id).orElseThrow(() -> new RuntimeException("指定IDが存在しません"));
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
        p.setStatus("申請待ち"); // 初期状態
        projectRepository.save(p);
        return "登録成功";
    }

    @PutMapping("/{id}")
    public String update(@PathVariable Long id, @RequestBody ProjectRequest request) {
        Project p = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("IDが存在しません"));
        p.setTitle(request.getTitle());
        p.setCustomer(request.getCustomer());
        p.setAmount(new BigDecimal(request.getAmount()));
        p.setMember(request.getMember());
        p.setSales(request.getSales());
        p.setType(request.getType());
        p.setDescription(request.getDescription());
        p.setDeadline(LocalDate.parse(request.getDeadline()));
        // ステータスは維持
        projectRepository.save(p);
        return "更新成功";
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        projectRepository.deleteById(id);
        return "削除成功";
    }

    @PutMapping("/{id}/approve")
    public String approve(@PathVariable Long id, @RequestParam String role) {
        Project p = projectRepository.findById(id).orElseThrow(() -> new RuntimeException("IDが見つかりません"));

        String currentStatus = p.getStatus();
        String nextStatus = null;

        if ("部長承認待ち".equals(currentStatus) && "manager".equals(role)) {
            nextStatus = "最終承認待ち";
        } else if ("最終承認待ち".equals(currentStatus) && "admin".equals(role)) {
            nextStatus = "最終承認済み";
        } else {
            throw new RuntimeException("承認不可：ロール権限が不足しているか、すでに承認済みです");
        }

        p.setStatus(nextStatus);
        projectRepository.save(p);
        return "承認ステータスが「" + nextStatus + "」に更新されました";
    }

    @PutMapping("/{id}/submit")
    public String submitProject(@PathVariable Long id) {
        Project p = projectRepository.findById(id).orElseThrow();
        if (!"申請待ち".equals(p.getStatus())) {
            throw new RuntimeException("申請は『申請待ち』状態のみ可能です");
        }
        p.setStatus("部長承認待ち");
        projectRepository.save(p);
        return "申請完了（部長承認待ちへ）";
    }

    @PutMapping("/{id}/resubmit")
    public String resubmitProject(@PathVariable Long id) {
        Project p = projectRepository.findById(id).orElseThrow();
        if (!"差し戻し".equals(p.getStatus())) {
            throw new RuntimeException("再申請は『差し戻し』状態のみ可能です");
        }
        p.setStatus("申請待ち");
        projectRepository.save(p);
        return "再申請完了（申請待ちへ）";
    }

    @PutMapping("/{id}/reject")
    public String rejectProject(@PathVariable Long id) {
        Project p = projectRepository.findById(id).orElseThrow();

        String current = p.getStatus();
        String prevStatus = null;

        switch (current) {
            case "最終承認待ち":
                prevStatus = "部長承認待ち";
                break;
            case "部長承認待ち":
                prevStatus = "申請待ち";
                break;
            case "申請待ち":
                throw new RuntimeException("申請待ちは差し戻しできません");
            default:
                throw new RuntimeException("差し戻しできないステータスです: " + current);
        }

        p.setStatus(prevStatus);
        projectRepository.save(p);
        return "差し戻し完了（" + current + " → " + prevStatus + "）";
    } 


    @GetMapping("/export/csv")
    public void exportCSV(HttpServletResponse response) throws IOException {
        List<Project> projects = projectRepository.findAll();

        response.setContentType("text/csv; charset=UTF-8");
        response.setHeader("Content-Disposition", "attachment; filename=\"projects.csv\"");

        PrintWriter writer = new PrintWriter(new OutputStreamWriter(response.getOutputStream(), StandardCharsets.UTF_8));
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

    private String safe(String s) {
        if (s == null) return "";
        return "\"" + s.replace("\"", "\"\"").replace("\n", " ").replace("\r", "") + "\"";
    }
}
