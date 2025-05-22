package com.javaapppractice.ankenkanri_system;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/customers")
@CrossOrigin
public class CustomerController {

  @Autowired private CustomerRepository repo;

  @GetMapping
  public List<Customer> getAll() {
    return repo.findAll();
  }

  @PostMapping
  public String register(@RequestBody Customer customer) {
    repo.save(customer);
    return "顧客登録成功";
  }

  @GetMapping("/{id}")
  public Customer getOne(@PathVariable Long id) {
    return repo.findById(id).orElse(null);
  }

  @PutMapping("/{id}")
  public String update(@PathVariable Long id, @RequestBody Customer c) {
    c.setId(id);
    repo.save(c);
    return "更新成功";
  }

  @DeleteMapping("/{id}")
  public String delete(@PathVariable Long id) {
    repo.deleteById(id);
    return "削除成功";
  }

  @GetMapping("/names")
  public List<String> getCustomerNames() {
    return repo.findAll().stream()
            .map(Customer::getName)
            .collect(Collectors.toList());
  }
}

