package com.employee.employeeproject.service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.employee.employeeproject.DTO.WorkDTO;
import com.employee.employeeproject.entity.Work;
import com.employee.employeeproject.repository.WorkRepository;

@Service
public class WorkService {
    @Autowired
    private WorkRepository repository;

    public List<WorkDTO> getAllWorkByID(Integer id) {
        System.out.println("id nhan dc:"+id);
        List<Work> works = repository.findAll();
        List<WorkDTO> workDTOs = new ArrayList();
        WorkDTO workDTO;
        for (int i = 0; i < works.size(); i++) {
            System.out.println("data:"+works.get(i).getDate()+works.get(i).getHour());
            workDTO = new WorkDTO();
            BeanUtils.copyProperties(works.get(i), workDTO);

            workDTO.setIdEL(works.get(i).getEmployee().getId());
            System.out.println("data2:"+workDTO.getDate()+workDTO.getHour()+" "+workDTO.getIdEL());

            if(workDTO.getIdEL().equals(id))
            {

                workDTOs.add(workDTO);
            }
        }



        return workDTOs;
    }

    public Work saveWork(Work work) {

        return repository.save(work);

    }

    public Boolean checkEmployeeId(WorkDTO workDTO) {
        List<Work> works = repository.findByDate(workDTO.getDate());
        for (Work work : works) {
            if (work.getEmployee().getId() == workDTO.getIdEL()) {
                return false;
            }
        }
        return true;
    }

    public Boolean checkDate(Date date) {
        return repository.existsByDate(date);
    }

    public String deleteWork(Integer id) {
        repository.deleteById(id);
        return "delete success";
    }

    public Double getTotalHourWorkEL(Integer idEL, Date date1, Date date2) {

        

        return repository.getTotalHourWork(idEL, date1, date2);
    }

    public Integer getDateWork(Integer idEL, Date date1, Date date2) {
        return repository.getTotalDateWork(idEL, date1, date2);
    }
    public long count() {
        return repository.count();
    }
}
