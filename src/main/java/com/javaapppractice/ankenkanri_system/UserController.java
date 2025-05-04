package com.javaapppractice.ankenkanri_system;

import org.springframework.web.bind.annotation.*;

@RestController // ★注意：@RestControllerにする（@Controllerじゃない）
@RequestMapping("/users")
public class UserController {

    @PostMapping
    public String registerUser(@RequestBody UserRequest userRequest) {
        System.out.println("受け取ったユーザID: " + userRequest.getUserid());
        System.out.println("受け取ったパスワード: " + userRequest.getPassword());
        System.out.println("受け取ったロール: " + userRequest.getRole());

        return "登録成功！"; // レスポンスメッセージ
    }
}
