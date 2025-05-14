package com.javaapppractice.ankenkanri_system;

import java.util.List;

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

    // 社員一覧取得
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // 社員1件取得
    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return employeeRepository.findById(id).orElse(null);
    }

    // 社員削除
    @DeleteMapping("/{id}")
    public String deleteEmployee(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return "削除成功！";
    }

}
