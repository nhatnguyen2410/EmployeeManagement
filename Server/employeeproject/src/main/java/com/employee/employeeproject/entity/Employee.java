package com.employee.employeeproject.entity;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;

@Data

@Entity
@Table(name="EMPLOYEE_TBL")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @NotBlank(message = "Name is not blank !")
    @NotNull
    private String fullname;
    private String phone;

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
    }
    private String email;
    private String image;
    private String sex;
    private Integer age;
    private Date startdate;
    private String address;
    private Double salaryPerHour;

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {

  
        this.age = age;
    }

    public Employee(Integer id, String fullname, String phone, String email, String image, String sex, Integer age, Date startdate, String address, Double salaryPerHour, Team team, List<Advance> advances, List<Work> works) {
        this.id = id;
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.image = image;
        this.sex = sex;
        this.age = age;
        this.startdate = startdate;
        this.address = address;
        this.salaryPerHour = salaryPerHour;
        this.team = team;
        this.advances = advances;
        this.works = works;
    }




    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getFullname() {
        return this.fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public String getPhone() {
        return this.phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return this.email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSex() {
        return this.sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public Date getStartdate() {
        return this.startdate;
    }

    public void setStartdate(Date startdate) {
        this.startdate = startdate;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getSalaryPerHour() {
        return this.salaryPerHour;
    }

    public void setSalaryPerHour(Double salaryPerHour) {
        this.salaryPerHour = salaryPerHour;
    }

    public Team getTeam() {
        return this.team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public List<Advance> getAdvances() {
        return this.advances;
    }

    public void setAdvances(List<Advance> advances) {
        this.advances = advances;
    }

    public List<Work> getWorks() {
        return this.works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }
    

    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "team_id",referencedColumnName = "id")
    private Team team;
    
    @JsonIgnore
    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
    private List<Advance> advances;


    @JsonIgnore
    @OneToMany(mappedBy = "employee",cascade = CascadeType.ALL)
    private List<Work> works;

    public Employee() {
    }

}
