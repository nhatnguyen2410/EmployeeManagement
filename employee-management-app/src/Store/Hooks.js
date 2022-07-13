import { EmployeesContext } from "./EmployeesContext";
import { useContext } from "react";

export const EmployeePageStore=()=>{
    const [state,dispatch]=useContext(EmployeesContext);
    return [state,dispatch]
}