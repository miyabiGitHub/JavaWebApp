package com.javaapppractice.ankenkanri_system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "employees") // ✅ テーブル名指定
@Data
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    
    private Long id;
    private String name;
    private Integer age;
    private String department;
    private String position;
    private String phone;
     
}

