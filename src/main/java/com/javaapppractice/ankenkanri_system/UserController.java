package com.javaapppractice.ankenkanri_system;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*") // フロントのHTMLから呼べるように
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping
    public String registerUser(@RequestBody UserRequest userRequest) {
        User user = new User();
        user.setUserid(userRequest.getUserid());
        user.setPassword(userRequest.getPassword());
        user.setRole(userRequest.getRole());

        userRepository.save(user);
        
        return "登録成功！";
    }

    // ✅ GET一覧取得API これ絶対必要
    @GetMapping
    public List<User> getAllUsers() {
        return userRepository.findAll();  // ✅ DBの全ユーザを返す
    }
}
