import { faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Select from "react-select";
import React, { useEffect, useState } from "react";
import "../sass/Tabstatitic.sass";
import "react-widgets/styles.css";
import "react-datepicker/dist/react-datepicker.css";
import { api } from "../API";
import ReactDatePicker from "react-datepicker";
import { convertDate, convertDate2 } from "../Store/functions";
import { useParams } from "react-router-dom";
function TabStatitic() {

  
  const [startDate, setStartDate] = useState();
  const [statistic, setStatistic] = useState({})
  const employeeId = useParams().id;

  function handleDateEnd(startDate)
  {
   if(startDate!==undefined)
   {
    
    const date=convertDate2(startDate).toString().split('-')
    const dateEnd=date[0]+'-'+date[1]+'-'+30
    return  dateEnd
  }
}

  useEffect(()=>{
    setStartDate(new Date(2022,6,1,0,0 ))

  },[])
  useEffect(() => {
    const data= {
      idEL:employeeId,
      dateStart:convertDate2(startDate),
      dateEnd:handleDateEnd(startDate)
    }
    const dataJSON=JSON.stringify(data)
    const fetchSatitstic = async () => {
        if(dataJSON)
        {
          try {
            api({
              method: "post",
              url: "statitic/Getdata",
              data: dataJSON,
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then(function (response) {
                //handle success
                console.log(response.data.data);
                setStatistic(response.data.data)
               
              })
              .catch((error) => {
                //handle error
                console.log("loi:", error.response);
              });
          } catch (error) {
            
          }
        }
    };
    fetchSatitstic()
  }, [startDate]);
  console.log(convertDate2(startDate))
  return (
    <>
      <div className="container">
        <div className="header__employee ">
          <h2 className="header__employee--title">STATITICS</h2>
          
         <ReactDatePicker
         selected={startDate}
         onChange={(date) => setStartDate(date)}
         dateFormat="MM/yyyy"
         showMonthYearPicker
         showFullMonthYearPicker
         
         
       />
        
      
        </div>

        <hr />
        <div className="col-12 ">
          <div
            className="box-detail d-flex"
            style={{ backgroundColor: "#3b76ef" }}
          >
            <div
              className=" "
              style={{
                margin: "auto",
                paddingRight: "130px",
                paddingBottom: "10px",
              }}
            >
              <h5 className="">Working Days:</h5>
              <h3>{statistic.workingDay} days</h3>
            </div>
          </div>

          <div
            className="box-detail d-flex"
            style={{ backgroundColor: "#63c7ff" }}
          >
            <div
              className=" "
              style={{
                margin: "auto",
                paddingRight: "130px",
                paddingBottom: "10px",
              }}
            >
              <h5 className="">Total GET:</h5>
              <h3>{statistic.totalGet} $</h3>
            </div>
          </div>
          <div
            className="box-detail d-flex"
            style={{ backgroundColor: "#a66dd4" }}
          >
            <div
              className=" "
              style={{
                margin: "auto",
                paddingRight: "130px",
                paddingBottom: "10px",
              }}
            >
              <h5 className="">Total Advances:</h5>
              <h3>{statistic.totalAdvance} $</h3>
            </div>
          </div>

          <div
            className="box-detail d-flex"
            style={{ backgroundColor: "#6dd4b1" }}
          >
            <div
              className=" "
              style={{
                margin: "auto",
                paddingRight: "130px",
                paddingBottom: "10px",
              }}
            >
              <h5 className="">Total Income:</h5>
              <h3>{statistic.TotalIncome} $</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TabStatitic;
