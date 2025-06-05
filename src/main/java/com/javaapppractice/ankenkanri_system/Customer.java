package com.javaapppractice.ankenkanri_system;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Customer {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;
  private String address;
  private String contact;
  private String sales;
}

