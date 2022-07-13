import { EmployeesContext } from "./EmployeesContext";
import { useReducer } from "react";
import EmployeesReducer,{ initState } from "./EmployeesReducer";

function  EmployeeProvider({children}){
    const [state,dispatch]=useReducer(EmployeesReducer,initState)

    return(
        <EmployeesContext.Provider value={[state,dispatch]}>
            {children}
        </EmployeesContext.Provider>
    )
}

export default EmployeeProvider