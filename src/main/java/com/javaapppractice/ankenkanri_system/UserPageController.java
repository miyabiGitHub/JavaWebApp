package com.javaapppractice.ankenkanri_system;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class UserPageController {

    @GetMapping("/users")
    public String showUserPage() {
        return "users"; // templates/users.html があればOK！
    }
}
