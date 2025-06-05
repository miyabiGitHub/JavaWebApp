package com.javaapppractice.ankenkanri_system;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "projects")  // ✅ テーブル名指定
@Data
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;         // 案件名
    private String customer;      // 顧客名（文字列 or FK）
    private BigDecimal amount;    // 金額 💰
    private String member;        // 参画者
    private String sales;         // 担当営業
    private String type;          // 案件タイプ
    private String description;   // 業務内容
    private LocalDate deadline;   // 期限
    private String status;        // ステータス（承認待ち／承認済み／差し戻し）
}

