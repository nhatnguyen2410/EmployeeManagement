package com.employee.employeeproject.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.employeeproject.DTO.WorkDTO;
import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.ResponseObject;
import com.employee.employeeproject.entity.Work;
import com.employee.employeeproject.service.EmployeeService;
import com.employee.employeeproject.service.WorkService;

@RestController
@RequestMapping("work/")
public class WorkController {
    @Autowired
    private WorkService workService;
    @Autowired
    private EmployeeService employeeService;

    @GetMapping("workList/{id}")
    public ResponseEntity<ResponseObject> getWork(@PathVariable Integer id) {
        List<WorkDTO> workDTOs=workService.getAllWorkByID(id);
        Integer total=workDTOs.size();
        return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("succcess", total.toString(), workDTOs));

    }

    @PostMapping("add")
    public ResponseEntity<ResponseObject> addWork(@RequestBody @Valid WorkDTO workDTO, BindingResult bindingResult) {
        try {
            if (bindingResult.hasErrors()) {
                return ResponseEntity.badRequest().body(
                        new ResponseObject("fail", bindingResult.getAllErrors().get(0).getDefaultMessage(), null));

            }
            System.out.println("id nhan vien:" + workDTO.getIdEL());
            Employee employee = employeeService.getEmployeeById(workDTO.getIdEL());
            if (workService.checkDate(workDTO.getDate()) == true) {
                if (workService.checkEmployeeId(workDTO) == false)
                    return ResponseEntity.badRequest().body(new ResponseObject("fail", "Date is existed !", null));
            }
            Work work = new Work();
            BeanUtils.copyProperties(workDTO, work);
            work.setEmployee(employee);
            workService.saveWork(work);

            return ResponseEntity.status(HttpStatus.OK).body(new ResponseObject("success", "add work success!", work));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("fail", "add work fail !" + e.getMessage(), null));

        }
    }

    @DeleteMapping("delete/{id}")
    public ResponseEntity<ResponseObject> deleteWork(@PathVariable Integer id) {
        try {
            workService.deleteWork(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "delete work success!", "work id:" + id));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("fail", "delete work fail !" + e.getMessage(), null));

        }
    }

}
