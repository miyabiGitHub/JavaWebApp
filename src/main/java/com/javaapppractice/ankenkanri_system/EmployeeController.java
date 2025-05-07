package com.javaapppractice.ankenkanri_system;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    @PostMapping
    public String registerEmployee(@RequestBody EmployeeRequest request) {
        System.out.println("✅ 受け取った社員名: " + request.getName());
        System.out.println("✅ 年齢: " + request.getAge());
        System.out.println("✅ 部署: " + request.getDepartment());
        return "社員登録成功！";
    }
}

