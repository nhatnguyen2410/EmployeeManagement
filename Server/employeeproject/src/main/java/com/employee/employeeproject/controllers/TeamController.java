package com.employee.employeeproject.controllers;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.employee.employeeproject.DTO.TeamDTO;
import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.ResponseObject;
import com.employee.employeeproject.service.TeamService;

@RestController
@RequestMapping("team/")
public class TeamController {
    @Autowired
    private TeamService teamService;

    @PostMapping("add")
    public ResponseEntity<ResponseObject> addTeam(@RequestBody @Valid TeamDTO teamDTO,BindingResult bindingResult) throws Exception 
    {
        if(bindingResult.hasErrors())
    {
        return ResponseEntity.badRequest().body(new ResponseObject("fail", bindingResult.getAllErrors().get(0).getDefaultMessage(), null));
        
    }
        if(teamService.checkNameTeam(teamDTO.getName()))
        {
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "Name was existed!", null));

        }
        try {
            teamService.saveTeam(teamDTO);
            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "add team success!", teamDTO));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "add team fail!", null));

        }
    }

    @GetMapping("TeamList")
    public ResponseEntity<ResponseObject> getTeams() {
        try {
            Long teamNumber=teamService.count();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", teamNumber.toString(), teamService.getTeams()));
            
        } catch (Exception e) {
            //TODO: handle exception
            return ResponseEntity.badRequest().body(new ResponseObject("fail", "get team fail!", null));
            
        }
        
       
    }

    @GetMapping("employees")
    public ResponseEntity<ResponseObject> gEmployees(@RequestParam String name) {
        List<Employee> data=teamService.getEmployeesInTeam(name);
        Integer employeeNumber=data.size();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", employeeNumber.toString(), data));
    }



    @GetMapping("/firstTeam")
    public ResponseEntity<ResponseObject> getFirtTeam() {
       try {
        List<Employee> employees=new ArrayList<>();
        String name=teamService.getFirstTeamName();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success","get name team success", name));
        
       } catch (Exception e) {
        return ResponseEntity.badRequest().body(new ResponseObject("fail", "get first team fail!"+e.getMessage(), null));
        
       }
    }
}
