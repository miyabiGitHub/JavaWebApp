package com.javaapppractice.ankenkanri_system;

import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("") // 🔹 "/auth" ではなくルートに設定（"/login" を直接利用可能）
@CrossOrigin(origins = "http://localhost") // 🔹 CORSエラーを防ぐ
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * 🔹 POST /login
     * 🔹 ユーザーのログイン処理
     */
    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> request) {
        String result = authService.login(request.get("username"), request.get("password"));

        if ("SUCCESS".equals(result)) {
            return Map.of("success", "true", "redirect", "main.html");
        } else {
            return Map.of("error", result);
        }
    }
}
