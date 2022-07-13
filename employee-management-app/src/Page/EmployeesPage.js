import React, { useEffect } from "react";

import "../sass/EmployeesPage.sass";
import Add from "../Components/Add";
import EmployeeTable from "../Components/EmployeeTable";
import { EmployeePageStore } from "../Store/Hooks";
import { setMainPage } from "../Store/action";

function EmployeesPage() {
  const [state, dispatch] = EmployeePageStore();
  const { add } = state;
  useEffect(() => {
    dispatch(setMainPage("Employee"));
  }, []);

  return (
    <>
      <EmployeeTable />
      <Add />
    </>
  );
}

export default EmployeesPage;
