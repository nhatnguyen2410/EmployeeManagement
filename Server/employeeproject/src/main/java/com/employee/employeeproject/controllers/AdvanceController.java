package com.employee.employeeproject.controllers;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.employeeproject.DTO.AdvanceDTO;
import com.employee.employeeproject.entity.Advance;
import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.ResponseObject;
import com.employee.employeeproject.service.AdvanceService;
import com.employee.employeeproject.service.EmployeeService;

@RestController
@RequestMapping("advance/")
public class AdvanceController {
    @Autowired
    private AdvanceService AdvanceService;
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("advanceList/{id}")
    public ResponseEntity<ResponseObject> getAdvanceByID(@PathVariable Integer id)
    {
        List<AdvanceDTO> advances=AdvanceService.getAllAdvanceByID(id);
        Integer total=advances.size();

        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("succcess", total.toString(), advances));
    }


    @PostMapping("add")
    public ResponseEntity<ResponseObject>  addAdvance(@RequestBody AdvanceDTO advanceDTO)
    {
        try {
            System.out.println("loi:"+advanceDTO.getMoney());
            Employee employee=employeeService.getEmployeeById(advanceDTO.getIdEL());
            
            Advance advance=new Advance();
            BeanUtils.copyProperties(advanceDTO, advance);
            advance.setEmployee(employee);
            AdvanceService.saveAdvance(advance);
        
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "add advance success!",advanceDTO));
        
        
        } catch (Exception e) {
            //TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "add advance fail !"+e.getMessage(),null));

        }
    }
    
    @DeleteMapping("delete/{id}")
    public ResponseEntity<ResponseObject> deleteAdvance(@PathVariable Integer id)
    {
        try {
            AdvanceService.deleteAdvance(id);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "delete advance success!","Employee id:"+id));
        
        
        } catch (Exception e) {
            //TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "delete advance fail !"+e.getMessage(),null));

        }
    }

}