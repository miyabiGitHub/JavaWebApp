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

    // ✅ ユーザIDで情報を取得（編集用）
    @GetMapping("/{userid}")
    public User getUser(@PathVariable String userid) {
        return userRepository.findByUserid(userid);
    }

    // ✅ ユーザ情報を更新する
    @PutMapping("/{userid}")
    public String updateUser(@PathVariable String userid, @RequestBody UserRequest userRequest) {
        User user = userRepository.findByUserid(userid);
        if (user != null) {
            user.setPassword(userRequest.getPassword());
            user.setRole(userRequest.getRole());
            userRepository.save(user);
            return "更新成功！";
        } else {
            throw new RuntimeException("該当ユーザが存在しません");
        }
    }

    // ✅ ユーザ削除
    @DeleteMapping("/{userid}")
    public String deleteUser(@PathVariable String userid) {
        User user = userRepository.findByUserid(userid);
        if (user != null) {
            userRepository.delete(user);
            return "削除成功！";
        } else {
            throw new RuntimeException("ユーザが存在しません");
        }
    }

}
