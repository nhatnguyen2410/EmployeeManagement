package com.employee.employeeproject.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.employee.employeeproject.entity.Employee;

public interface EmployeeRepository extends JpaRepository<Employee,Integer> {

    Employee findByFullname(String fullname);
    Boolean existsByPhone(String phone);
    List<Employee> findByfullnameContaining(String fullname);
}
