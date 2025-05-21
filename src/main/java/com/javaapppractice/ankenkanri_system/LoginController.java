package com.javaapppractice.ankenkanri_system;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@CrossOrigin(origins = "*")
public class LoginController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody UserRequest loginRequest) {
        User user = userRepository.findByUserid(loginRequest.getUserid());

        if (user != null && user.getPassword().equals(loginRequest.getPassword())) {
            Map<String, String> response = new HashMap<>();
            response.put("userid", user.getUserid());
            response.put("role", user.getRole()); // ← フロントで必要な情報
            return response;
        } else {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "ログイン失敗");
        }
    }
}
