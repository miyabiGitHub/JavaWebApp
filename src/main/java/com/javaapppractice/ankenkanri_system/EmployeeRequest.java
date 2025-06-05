package com.javaapppractice.ankenkanri_system;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class EmployeeRequest {
    private String name;
    private Integer age;
    private String department;
}


