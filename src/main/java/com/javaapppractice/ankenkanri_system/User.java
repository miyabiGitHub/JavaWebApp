package com.javaapppractice.ankenkanri_system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users")  // ✅ テーブル名を明示的に「users」にする
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userid;
    private String password;
    private String role;
}
