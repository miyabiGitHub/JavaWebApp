package com.javaapppractice.ankenkanri_system;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserid(String userid);  // ✅ ユーザIDで検索
}
