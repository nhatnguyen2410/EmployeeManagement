package com.employee.employeeproject.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.employee.employeeproject.entity.Advance;

public interface AdvanceRepository extends JpaRepository<Advance,Integer>{

    void deleteById(Integer id);
    

    @Query(value = "SELECT sum(money) as total_hours FROM employeemanage.advance_tbl where employee_id= ?1 and date between  ?2 and ?3",nativeQuery = true)
    Double getTotalAdvance(Integer idEL, Date date1, Date date2);
}
