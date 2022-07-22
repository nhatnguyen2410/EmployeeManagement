package com.employee.employeeproject.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.employeeproject.DTO.TeamDTO;
import com.employee.employeeproject.entity.Employee;
import com.employee.employeeproject.entity.Team;
import com.employee.employeeproject.repository.TeamRepository;



@Service
public class TeamService {
    @Autowired
    private TeamRepository repository;


    public Team saveTeam(TeamDTO teamDTO)
    {
        Team team=new Team();
        BeanUtils.copyProperties(teamDTO, team);
        team.setEmployees(null);
        return repository.save(team);
    }

    public List<TeamDTO> getTeams(){
        List<Team> teams= repository.findAll();
        List<TeamDTO> teamDTOs=new ArrayList() ;
        TeamDTO teamDTO;
        for(int i=0;i<teams.size();i++)
        {
            teamDTO=new TeamDTO();
            BeanUtils.copyProperties(teams.get(i),teamDTO);
            teamDTOs.add(teamDTO);
        }
        return teamDTOs;

    }

    public Team getTeamByID(Integer id)
    {
        return repository.findById(id).orElse(null);
    }
    public List<Employee> getEmployeesInTeam(String name)
    {
            Team teams=repository.findByName(name);
            List<Employee> employees=teams.getEmployees();
            return employees;
    }

    public String getFirstTeamName()
    {
        return repository.getFirstTeam();
    }

    public Boolean checkNameTeam(String name)
    {
        return repository.existsByName(name);
    }
    
}
