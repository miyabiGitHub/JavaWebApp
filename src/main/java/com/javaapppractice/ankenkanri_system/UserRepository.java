package com.javaapppractice.ankenkanri_system;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

/**
 * 🔹 ユーザーデータを取得するリポジトリ
 * 🔹 ユーザー名で検索するメソッドを定義
 */
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}
