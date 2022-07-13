package com.employee.employeeproject.DTO;

import java.util.Date;

import javax.validation.constraints.NotNull;

public class AdvanceDTO {
    private Integer id;
    private Date date;

    
    @NotNull(message="money is not blank !")
    private Double money;
    @NotNull(message = "id employee is not null !")
    private Integer idEL;

    public AdvanceDTO(Date date, Double money, Integer idEL) {
        this.date = date;
        this.money = money;
        this.idEL = idEL;
    }

    public AdvanceDTO(Integer id, Date date, Double money, Integer idEL) {
        this.id = id;
        this.date = date;
        this.money = money;
        this.idEL = idEL;
    }
    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
    public AdvanceDTO() {
    }

    public Date getDate() {
        return this.date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Double getMoney() {
        return this.money;
    }

    public void setMoney(Double money) {
        this.money = money;
    }

    public Integer getIdEL() {
        return this.idEL;
    }

    public void setIdEL(Integer idEL) {
        this.idEL = idEL;
    }
    
}
