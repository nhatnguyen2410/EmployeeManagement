package com.employee.employeeproject.service;

import java.util.HashMap;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.employeeproject.DTO.EmployeeDTO;
import com.employee.employeeproject.entity.*;
import com.employee.employeeproject.repository.EmployeeRepository;
import com.employee.employeeproject.repository.TeamRepository;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository repository;
    @Autowired
    private TeamRepository teamRepository;
    public Employee saveEmployee(Employee employee){
      return  repository.save(employee);
    }
    public List<Employee> saveEmployees(List<Employee> employees){
        return  repository.saveAll(employees);
      }
    
    public List<Employee> getEmployees(){
        return repository.findAll();
    }

    public long count() {
        return repository.count();
    }

    public Employee getEmployeeById(Integer id){
        return repository.findById(id).orElse(null);
    }

    public Employee getEmployeeByName(String fullname){
        return repository.findByFullname(fullname);
    }

    public String deleteEmployee(int id){
        repository.deleteById(id);
        return "delete employee success"+id;
    }
    public String deleteSomeEmployee(List<Integer> listID)
    {
        for(int i=0;i<listID.size();i++)
        {
            repository.deleteById(listID.get(i));
        }
        return "detete some employee success";
    }

    public String deleteAllEmployee()
    {
        repository.deleteAll();
        return "detete some employee success";
    }
    public String updateImgEmployee(HashMap<String,String> data)
    {
        Integer id=Integer.valueOf(data.get("id"));
        String image=data.get("img");
        System.out.println("id "+id+" "+image );
        Employee existingEmployee=repository.findById(id).orElse(null);
        existingEmployee.setImage(image);
        repository.save(existingEmployee);
        return "update img employee success";
    }
    public Employee updateEmployee(EmployeeDTO employeeDTO)
    {   
        
        Employee existingEmployee=repository.findById(employeeDTO.getId()).orElse(null);
        Optional<Team> team=teamRepository.findById(employeeDTO.getTeamID());
        Team teamNew=team.get();
        existingEmployee.setFullname(employeeDTO.getFullname());
        existingEmployee.setAddress(employeeDTO.getAddress());
        existingEmployee.setAge(employeeDTO.getAge());
        existingEmployee.setEmail(employeeDTO.getEmail());
        existingEmployee.setPhone(employeeDTO.getPhone());
        existingEmployee.setSalaryPerHour(employeeDTO.getSalaryPerHour());
        existingEmployee.setSex(employeeDTO.getSex());
        existingEmployee.setStartdate(employeeDTO.getStartdate());
        existingEmployee.setTeam(teamNew);
        return repository.save(existingEmployee);

    }
    public Boolean checkPhone(String phone)
    {
        return repository.existsByPhone(phone);
    }
    public List<Employee> findAllEmployeeByFullName(String fullname)
    {
        return repository.findByfullnameContaining(fullname);
    }
}
