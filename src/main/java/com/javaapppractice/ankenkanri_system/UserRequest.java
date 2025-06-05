package com.javaapppractice.ankenkanri_system;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserRequest {
    private String userid;
    private String password;
    private String role;
}