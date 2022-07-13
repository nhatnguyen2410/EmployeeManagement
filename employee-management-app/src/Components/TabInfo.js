import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Employees } from "../Page/EmployeesPage";
import { api } from "../API/index";
import { functionEL } from '../Store';
import { actions } from "../Store";
import { EmployeePageStore } from "../Store/Hooks";
import { useOutletContext } from "react-router-dom";
import Add from "./Add";
import { setMainPage } from "../Store/action";
function TabInfo() {
  const [team, SetTeam] = useState({});
  const [state, dispatch] = EmployeePageStore();
  const {EmployeeInfo}=useOutletContext();
  console.log("data day nha",EmployeeInfo)
  const employeeId = useParams().id;
  useEffect(() => {
    dispatch(setMainPage(EmployeeInfo.fullname))
  }, [EmployeeInfo]);

  return (
    <div className="container">
      {EmployeeInfo ? (
        <>
          <h2 className="ml-4 mb-4">INFORMATIONS</h2>
          <div className="container px-4">
            <div
              className=""
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2,1fr)",
                gridGap: "25px",
              }}
            >
              <input
                style={{ height: "50px" }}
                className="form-control"
                type="text"
                placeholder="Salary/hour here…"
                value={"Salary/hour: " + EmployeeInfo.salaryPerHour}
                readOnly
              />
              <input
                style={{ height: "50px" }}
                className="form-control"
                type="text"
                placeholder="Salary/hour here…"
                value={`Team:  ${
                  EmployeeInfo && EmployeeInfo.team
                    ? EmployeeInfo.team.name
                    : ""
                }`}
                readOnly
              />

              <input
                style={{ height: "50px" }}
                className="form-control  "
                type="text"
                placeholder="Start date here...."
                value={"Start Date: " + functionEL.convertDate(EmployeeInfo.startdate)}
                readOnly
              />
              <input
                style={{ height: "50px" }}
                className="form-control"
                type="text"
                placeholder="Address here…"
                value={"Address: " + EmployeeInfo.address}
                readOnly
              />
            </div>
          </div>
        </>
      ) : (
        <></>
      )}
   

    </div>
  );
}

export default TabInfo;
