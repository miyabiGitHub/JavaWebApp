package com.javaapppractice.ankenkanri_system;

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
}
