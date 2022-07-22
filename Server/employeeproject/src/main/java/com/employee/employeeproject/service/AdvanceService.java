package com.employee.employeeproject.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.employeeproject.DTO.AdvanceDTO;
import com.employee.employeeproject.entity.Advance;
import com.employee.employeeproject.repository.AdvanceRepository;


@Service
public class AdvanceService {
    @Autowired
    private AdvanceRepository repository;

    public List<AdvanceDTO> getAllAdvanceByID(Integer EmployeeID)
    {
        List<Advance> advances= repository.findAll();
        List<AdvanceDTO> advanceDTOs=new ArrayList() ;
        AdvanceDTO advanceDTO;
        for(int i=0;i<advances.size();i++)
        {
            advanceDTO=new AdvanceDTO();
            BeanUtils.copyProperties(advances.get(i),advanceDTO);
            advanceDTO.setIdEL(advances.get(i).getEmployee().getId());
            if(EmployeeID.equals(advances.get(i).getEmployee().getId()))
            advanceDTOs.add(advanceDTO);
        }
        return advanceDTOs;
    }
    
    public Advance saveAdvance(Advance advance)
    {
        return repository.save(advance);

    }
    public long count() {
        return repository.count();
    }
    public String deleteAdvance(Integer id)
    {
        repository.deleteById(id);
        return "delete success";
    }

    public Double getTotalAdvance(Integer idEL,Date date1,Date date2){
        return  repository.getTotalAdvance(idEL, date1, date2);
    }
    
}
