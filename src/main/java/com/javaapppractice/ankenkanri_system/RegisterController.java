package com.javaapppractice.ankenkanri_system;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/register")
public class RegisterController {

    @PostMapping
    public String registerProject(@RequestBody RegisterRequest request) {
        System.out.println("受け取った案件名: " + request.getTitle());
        System.out.println("顧客名: " + request.getCustomer());
        System.out.println("業務内容: " + request.getDescription());
        System.out.println("参画者: " + request.getSyain());
        System.out.println("担当営業: " + request.getEigyo());
        System.out.println("案件タイプ: " + request.getType());
        return "案件登録成功！";
    }
}

