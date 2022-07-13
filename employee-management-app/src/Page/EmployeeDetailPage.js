import React, { useEffect, useState } from "react";
import { Outlet, useParams } from "react-router-dom";
import { EmployeePageStore } from "../Store";
import { api } from "../API/index";
import { setIdDelete, setMainPage } from "../Store/action";
import Add from "../Components/Add";
import DetailNav from "../Components/DetailNav";
import ImgEmployee from "../Components/ImgEmployee";

function EmployeeDetailPage() {
  

  const [state, dispatch] = EmployeePageStore();
  const [updateEmployee, setUpdateEmployee] = useState(false);
  const employeeId = useParams().id;
  const [EmployeeInfo, setEmployeeInfo] = useState({});
  console.log("kiem tra", updateEmployee);
  

  const fetchEmployeeInfo = async () => {
    try {
      const response = await api.get(`employee/${employeeId}`);
      if (response && response.data) 
      setEmployeeInfo(response.data);
    dispatch(setMainPage(response.data.fullname));

      console.log("info here", EmployeeInfo);
    } catch (error) {
      if (error.response) {
        console.log(error.response);
      } else {
        console.log(`Error:${error.message}`);
      }
    }
  };
  useEffect(() => {
    return () => {
      dispatch(setMainPage("Employee"));
    };
  }, []);

  useEffect(()=>{
    dispatch(setIdDelete(employeeId))
    fetchEmployeeInfo()
    setUpdateEmployee(false)
  }
  ,[updateEmployee])
  useEffect(() => {
  
    fetchEmployeeInfo();
  }, []);
const setUpdateEL=()=>{
    setUpdateEmployee(true )
}
  return (
    <div className="container">
      <DetailNav/>
      <ImgEmployee data={EmployeeInfo}/>
      <Outlet  context={{EmployeeInfo} } />
      <Add data={EmployeeInfo} update={setUpdateEL} />
    </div>
  );
}

export default EmployeeDetailPage;
