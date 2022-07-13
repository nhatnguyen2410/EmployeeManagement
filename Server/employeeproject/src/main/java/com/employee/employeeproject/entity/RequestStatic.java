package com.employee.employeeproject.entity;

import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

public class RequestStatic {
    private Integer idEL;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
    private Date dateStart;
    @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) 
    private Date dateEnd;

    public RequestStatic(Integer idEL, Date dateStart, Date dateEnd) {
        this.idEL = idEL;
        this.dateStart = dateStart;
        this.dateEnd = dateEnd;
    }

    public RequestStatic() {
    }

    public Integer getIdEL() {
        return this.idEL;
    }

    public void setIdEL(Integer idEL) {
        this.idEL = idEL;
    }

    public Date getDateStart() {
        return this.dateStart;
    }

    public void setDateStart(Date dateStart) {
        this.dateStart = dateStart;
    }

    public Date getDateEnd() {
        return this.dateEnd;
    }

    public void setDateEnd(Date dateEnd) {
        this.dateEnd = dateEnd;
    }



}
