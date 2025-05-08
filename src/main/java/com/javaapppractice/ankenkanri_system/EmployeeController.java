package com.javaapppractice.ankenkanri_system;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/employees")
@CrossOrigin(origins = "*")
public class EmployeeController {

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping
    public String registerEmployee(@RequestBody EmployeeRequest request) {
        Employee employee = new Employee();
        employee.setName(request.getName());
        employee.setAge(request.getAge());
        employee.setDepartment(request.getDepartment());

        Employee savedEmployee = employeeRepository.save(employee);
        System.out.println("保存結果: " + savedEmployee.getId());

        return "社員登録成功！";
    }
}
