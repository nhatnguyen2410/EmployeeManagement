package com.employee.employeeproject.repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.employee.employeeproject.entity.Team;
public interface TeamRepository extends JpaRepository<Team,Integer>{

    Team findByName(String name);
    Boolean existsByName(String name);


    @Query(value = "SELECT name FROM team_tbl LIMIT 1",nativeQuery = true)
    String getFirstTeam();
    
}
