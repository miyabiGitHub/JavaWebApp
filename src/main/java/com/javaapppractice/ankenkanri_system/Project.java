package com.javaapppractice.ankenkanri_system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "projects")  // ✅ テーブル名指定
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String customer;
    private String description;
    private String syain;
    private String eigyo;
    private String type;
    private String status;
}

