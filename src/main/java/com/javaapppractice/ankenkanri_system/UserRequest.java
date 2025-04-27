package com.javaapppractice.ankenkanri_system;

import lombok.Data;

@Data
public class UserRequest {
    private String userid;
    private String password;
    private String role;
}
