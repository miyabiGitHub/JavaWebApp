package com.javaapppractice.ankenkanri_system;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public String registerUser(@RequestBody UserRequest userRequest) {
        System.out.println("ユーザID: " + userRequest.getUserid());
        System.out.println("パスワード: " + userRequest.getPassword());
        System.out.println("ロール: " + userRequest.getRole());

        // ここでDB登録や処理をする

        return "登録完了";
    }
}
