package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public String login(@RequestBody UserRequest loginRequest) {
        // ユーザIDでDB検索
        User user = userRepository.findByUserid(loginRequest.getUserid());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // ✅ ログイン成功
            return "ログイン成功";
        } else {
            // ❌ ログイン失敗
            throw new RuntimeException("ログイン失敗");
        }
    }
}

