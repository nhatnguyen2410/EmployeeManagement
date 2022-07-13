package com.employee.employeeproject.DTO;

import java.util.Date;

import javax.validation.constraints.Min;

import javax.validation.constraints.NotNull;

public class WorkDTO {
    private Integer id;
    private Date date;

    @NotNull(message ="Hour is not blank !" )
    @Min(value =0,message="hour must be bigger than 0 !")
    private Double hour;
    @NotNull(message = "id employee is not null !")
    private Integer idEL;

    public WorkDTO() {
    }

    public WorkDTO(Integer id,Date date, Double hour, Integer idEL) {
        this.id=id;
        this.date = date;
        this.hour = hour;
        this.idEL = idEL;
    }

    
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getHour() {
        return this.hour;
    }

    public void setHour(Double hour) {
        this.hour = hour;
    }

    public Integer getIdEL() {
        return this.idEL;
    }

    public void setIdEL(Integer idEL) {
        this.idEL = idEL;
    }

}
