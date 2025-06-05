package com.javaapppractice.ankenkanri_system;

import lombok.Data;

@Data
public class ProjectRequest {
    private String title;
    private String customer;
    private String amount;
    private String member;
    private String sales;
    private String type;
    private String description;
    private String deadline;
    private String status;
}
