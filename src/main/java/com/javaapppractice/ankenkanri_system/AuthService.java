package com.javaapppractice.ankenkanri_system;

import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class AuthService {
    private final UserRepository userRepository;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     * 🔹 ログイン処理
     * 🔹 ユーザー名とパスワードを検証し、アカウントロックをチェック
     */
    public String login(String username, String password) {
        Optional<User> userOpt = userRepository.findByUsername(username);

        // 🔹 ユーザーが存在しない場合
        if (userOpt.isEmpty()) return "ユーザーIDまたはパスワードが間違っています";

        User user = userOpt.get();

        // 🔹 アカウントがロックされている場合
        if (user.isLocked()) return "アカウントがロックされています";

        // 🔹 パスワードが正しい場合
        if (BCrypt.checkpw(password, user.getPassword())) {
            user.setFailedAttempts(0); // 🔹 失敗回数リセット
            userRepository.save(user);
            return "SUCCESS";
        } else {
            int attempts = user.getFailedAttempts() + 1;
            user.setFailedAttempts(attempts);

            // 🔹 3回失敗でアカウントロック
            if (attempts >= 3) user.setLocked(true);

            userRepository.save(user);
            return "ユーザーIDまたはパスワードが間違っています";
        }
    }
}
