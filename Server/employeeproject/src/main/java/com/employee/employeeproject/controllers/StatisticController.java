package com.employee.employeeproject.controllers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.RequestStatic;
import com.employee.employeeproject.entity.ResponseObject;
import com.employee.employeeproject.service.AdvanceService;
import com.employee.employeeproject.service.EmployeeService;
import com.employee.employeeproject.service.WorkService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@RestController
@RequestMapping("statitic/")
public class StatisticController {
    @Autowired
    private EmployeeService employeeService;
    @Autowired
    private WorkService workService;
    @Autowired
    private AdvanceService advanceService;

    @PostMapping("Getdata")
    public ResponseEntity<ResponseObject> getStatistic(@RequestBody RequestStatic requestStatic) {
        try {
            HashMap<String, Double> data = new HashMap<>();
            // DateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
            // String Date1 = dateFormat.format(requestStatic.getDateStart());
            // String Date2= dateFormat.format(requestStatic.getDateEnd());
            // SimpleDateFormat sdf1 = new SimpleDateFormat();
            // sdf1.applyPattern("YYYY-MM-dd HH:mm:ss");
            // Date DateStart=sdf1.parse(Date1);
            // Date DateEnd=sdf1.parse(Date2);
            Double totalHour, totalDatecv, totalSalary, totalAdvance, totalReceive;
            Integer totalDate;
            Employee employee = employeeService.getEmployeeById(requestStatic.getIdEL());
            if (workService.getTotalHourWorkEL(requestStatic.getIdEL(), requestStatic.getDateStart(),
                    requestStatic.getDateEnd()) == null) {
                totalHour = 0.0;
            } else {
                totalHour = workService.getTotalHourWorkEL(requestStatic.getIdEL(), requestStatic.getDateStart(),
                        requestStatic.getDateEnd());
            }
            if (workService.getDateWork(requestStatic.getIdEL(), requestStatic.getDateStart(),
                    requestStatic.getDateEnd()) == null) {
                totalDate = 0;

            } else {
                totalDate = workService.getDateWork(requestStatic.getIdEL(), requestStatic.getDateStart(),
                        requestStatic.getDateEnd());

            }

            if (advanceService.getTotalAdvance(requestStatic.getIdEL(), requestStatic.getDateStart(),
                    requestStatic.getDateEnd()) == null) {
                        totalAdvance=0.0;
            }
            else{
                totalAdvance = advanceService.getTotalAdvance(requestStatic.getIdEL(), requestStatic.getDateStart(),
                    requestStatic.getDateEnd());
            }

            totalDatecv = Double.valueOf(totalDate);
            totalSalary = totalHour * employee.getSalaryPerHour();
            totalReceive = totalSalary - totalAdvance;

            data.put("workingDay", totalDatecv);
            data.put("totalGet", totalReceive);
            data.put("totalAdvance", totalAdvance);
            data.put("TotalIncome", totalSalary);

            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ResponseObject("success", "get statistic success!", data));

        } catch (Exception e) {
            // TODO: handle exception
            return ResponseEntity.badRequest()
                    .body(new ResponseObject("fail", "get statistic failed!", e.getMessage()));

        }

    }

}
