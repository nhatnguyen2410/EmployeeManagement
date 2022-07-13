package com.employee.employeeproject.entity;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.Date;

@Data

@Entity
@Table(name="WORK_TBL")
public class Work {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Integer id;
    private Date date;
    private Double hour;

    public Work() {
    }

    public Work(Integer id, Date date, Double hour, Employee employee) {
        this.id = id;
        this.date = date;
        this.hour = hour;
        this.employee = employee;
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

    public Employee getEmployee() {
        return this.employee;
    }

    public void setEmployee(Employee employee) {
        this.employee = employee;
    }
    

    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Employee employee;
}
