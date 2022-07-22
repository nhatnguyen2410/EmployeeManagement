package com.employee.employeeproject.controllers;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.employeeproject.DTO.EmployeeDTO;
import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.ResponseObject;
import com.employee.employeeproject.entity.Team;
import com.employee.employeeproject.service.*;;

@RestController
@RequestMapping("/employee")
public class EmployeeController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private TeamService teamService;
    @Autowired
    private final static Logger logger = LoggerFactory.getLogger(EmployeeController.class);

    @PostMapping("/addEmployee")
    public ResponseEntity<Object> addEmployee(@RequestBody @Valid EmployeeDTO employeeDTO,
            BindingResult bindingResult) {

        try {
            if (employeeService.checkPhone(employeeDTO.getPhone())) {
                return ResponseEntity.badRequest()
                        .body(new ResponseObject("fail", "The phone employee is existed!", null));

            }
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("fail", bindingResult.getAllErrors().get(0).getDefaultMessage(), null));

            }
            Employee employee = new Employee();
            Team team = teamService.getTeamByID(employeeDTO.getTeamID());
            BeanUtils.copyProperties(employeeDTO, employee);
            employee.setTeam(team);
            employeeService.saveEmployee(employee);
            employeeDTO.setId(employee.getId());
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "add employee success!", employeeDTO));

        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "add employee fail!", null));

        }
    }

    @PostMapping("/addEmployees")
    public ResponseEntity<Object> addEmployees(@RequestBody List<Employee> employees) {
        try {

            employeeService.saveEmployees(employees);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "add employeeList success!", employees));

        } catch (Exception e) {

            return ResponseEntity.badRequest().body(new ResponseObject("fail", "add employees fail!", null));

        }
    }

    @GetMapping("/employees")
    public ResponseEntity<Object> getEmployees(@RequestParam Integer pageLength, Integer pageNumber) {
        List<Employee> employees = employeeService.getEmployees();
        List<Employee> employeesNew = new ArrayList<>();
        Long totalRows=employeeService.count();
       
        pageNumber = pageNumber - 1;
        Integer dem = 0;
        int startPosition = pageLength * pageNumber;
        for (int i = startPosition; i < employees.size(); i++) {
            if (dem >= pageLength) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseObject("success", totalRows.toString(), employeesNew));
            } else {
                dem++;
                employeesNew.add(employees.get(i));
            }
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("success",  totalRows.toString(), employeesNew));

    }

    
    @GetMapping("/search")
    public ResponseEntity<Object> searchEmployee(@RequestParam Integer pageLength,Integer pageNumber,String fullname)
    {
        List<Employee> employees=employeeService.findAllEmployeeByFullName(fullname);
        List<Employee> employeesNew = new ArrayList<>();

        Integer employeeNumber=employees.size();

        pageNumber = pageNumber - 1;
        Integer dem = 0;
        int startPosition = pageLength * pageNumber;
        for (int i = startPosition; i < employees.size(); i++) {
            if (dem >= pageLength) {
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseObject("success", employeeNumber.toString(), employeesNew));
            } else {
                dem++;
                employeesNew.add(employees.get(i));
            }
        }
        return ResponseEntity.status(HttpStatus.OK)
                .body(new ResponseObject("success",  employeeNumber.toString(), employeesNew));
        

    }
    

    @GetMapping("/{id}")
    public Employee findEmployeeByID(@PathVariable("id") Integer id) {

        return employeeService.getEmployeeById(id);
    }

    @GetMapping("name/{name}")
    public Employee findEmployeeByName(@PathVariable String name) {
        return employeeService.getEmployeeByName(name);
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateEmployee(@RequestBody EmployeeDTO employeeDTO) {
        try {
            Employee existEmployee=employeeService.getEmployeeById(employeeDTO.getId());
            if(existEmployee.getPhone().trim().equals(employeeDTO.getPhone().trim())==true)
            {
                employeeService.updateEmployee(employeeDTO);
                return ResponseEntity.status(HttpStatus.OK)
                        .body(new ResponseObject("success", "update employee success!", employeeDTO));
            }
             if (employeeService.checkPhone(employeeDTO.getPhone())) {
                return ResponseEntity.badRequest()
                        .body(new ResponseObject("fail", "The phone employee is existed!", null));

            }
            employeeService.updateEmployee(employeeDTO);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "update employee success!", employeeDTO));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "update employee fail!", null));

        }
    }

    @PutMapping("/update/img")
    public ResponseEntity<Object> updateImgEmployee(@RequestBody HashMap<String, String> data) {
        try {

            employeeService.updateImgEmployee(data);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "update employee img success!", data));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "update employee fail!", null));
        }
    }

    @DeleteMapping("/delete/{id}")
    public Object deleteEmployee(@PathVariable int id) {
        HashMap<String, String> response = new HashMap<>();

        try {
            employeeService.deleteEmployee(id);
            response.put("result", "delete success!");
            return response;
        } catch (Exception e) {
            // TODO: handle exception
            response.put("result", "delete failed!");
            return response;
        }
    }

    @DeleteMapping("/delete")
    public Object deleteSomeEmployee(@RequestParam List<Integer> id) {
        HashMap<String, String> response = new HashMap<>();
        try {
            employeeService.deleteSomeEmployee(id);
            response.put("result", "delete some employees success!");
            return response;
        } catch (Exception e) {
            // TODO: handle exception
            response.put("result", "delete some employees failed!" + e.getMessage());
            return response;
        }
    }

    @DeleteMapping("/deleteAll")
    public String delete_AllEmployee() {
        try {
            employeeService.deleteAllEmployee();
            return "delete All employee success!";
        } catch (Exception e) {
            // TODO: handle exception
            return "delete all employee failed !:" + e.getMessage();
        }
    }
}
