package com.employee.employeeproject.DTO;

import javax.validation.constraints.NotBlank;

public class TeamDTO {
    private Integer id;
    @NotBlank(message = "name is not blank !")
    private String name;

    public Integer getId() {
        return this.id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public TeamDTO(Integer id, String name) {
        this.id = id;
        this.name = name;
    }

    public TeamDTO() {
    }

    public TeamDTO(String name) {
        this.name = name;
    }

    public String getName() {
        return this.name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
