package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserRequest loginRequest) {
        // ユーザIDでDB検索
        User user = userRepository.findByUserid(loginRequest.getUserid());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            // ✅ ログイン成功 → HTTP 200 OK
            return ResponseEntity.ok("ログイン成功");
        } else {
            // ❌ ログイン失敗 → HTTP 401 Unauthorized で返す（これが正解）
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("ログイン失敗");
        }
    }
}
