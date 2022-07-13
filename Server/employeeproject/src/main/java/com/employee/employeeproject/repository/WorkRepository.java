package com.employee.employeeproject.repository;

import java.util.Date;
import java.util.List;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.Work;


public interface WorkRepository extends JpaRepository<Work,Integer>{
    Boolean existsByDate(Date date);
    Boolean existsByEmployee(Employee employee);
    List<Work> findByDate(Date date);
    

    void deleteById(Integer id);
    
    @Query(value = "SELECT SUM(hour) as total_hours FROM employeemanage.work_tbl where employee_id= ?1 and date between  ?2 and ?3",nativeQuery = true)
    Double getTotalHourWork( Integer idEL, Date date1, Date date2);
    

    @Query(value = "SELECT Count(date) as total_hours FROM employeemanage.work_tbl where employee_id= ?1 and date between  ?2 and  ?3",nativeQuery = true)
    Integer getTotalDateWork(Integer idEL, Date date1,Date date2);
}
