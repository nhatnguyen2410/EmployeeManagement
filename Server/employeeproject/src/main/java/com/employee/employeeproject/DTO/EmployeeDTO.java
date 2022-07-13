package com.employee.employeeproject.DTO;

import java.util.Date;

import javax.validation.constraints.Email;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class EmployeeDTO {
    
    private Integer id;
    @NotBlank(message = "Name is not blank !")
    private String fullname;
    @NotBlank(message = "phone is not blank !")
    
    private String phone;

    @Email(message = "Email is not correct !")
    private String email;
    private String image;

    @NotBlank(message = "sex is not null !")
    private String sex;
    @Min(value = 18,message = "Age is bigger than 17 !")
    @NotNull(message = "Age is not blank !")
    private Integer age;

    @NotNull(message = "Date is not blank !")
    private Date startdate;

    @NotBlank(message = "Addrress is not blank !")
    private String address;

    @NotNull(message = "salary/hour is not empty !")
    private Double salaryPerHour;

    @NotNull(message = "team ID is not empty")
    private Integer teamID;

    public EmployeeDTO() {
    }
    

    public EmployeeDTO(Integer id, String fullname, String phone, String email, String image, String sex, Integer age, Date startdate, String address, Double salaryPerHour, Integer teamID) {
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
        this.teamID = teamID;
    }

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public EmployeeDTO(String fullname, String phone, String email, String image, String sex, Integer age, Date startdate, String address, Double salaryPerHour, Integer teamID) {
        this.fullname = fullname;
        this.phone = phone;
        this.email = email;
        this.image = image;
        this.sex = sex;
        this.age = age;
        this.startdate = startdate;
        this.address = address;
        this.salaryPerHour = salaryPerHour;
        this.teamID = teamID;
    }

    public String getImage() {
        return this.image;
    }

    public void setImage(String image) {
        this.image = image;
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

    public Integer getAge() {
        return this.age;
    }

    public void setAge(Integer age) {
        this.age = age;
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

    public Integer getTeamID() {
        return this.teamID;
    }

    public void setTeamID(Integer teamID) {
        this.teamID = teamID;
    }
    

}
