import React from "react";
import "../sass/Add.sass";
import { EmployeePageStore } from "../Store/Hooks";
import { setOpenAdd, setOpenEdit } from "../Store/action";
import { useState, useEffect } from "react";
import { api } from "../API";
import { setAddSuccess } from "../Store/action";
import moment from "moment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import isEmpty from "validator/lib/isEmpty";
import isEmail from "validator/lib/isEmail";
function Add({ data, ...rest }) {
  const [state, dispatch] = EmployeePageStore();
  const [title, setTitle] = useState();
  const [Team, setTeam] = useState([]);
  const [employeeNew, setEmployeeNew] = useState();
  const [validationMsg, setValidationMsg] = useState("");
  const result=""
console.log("result",result)
  const notifySucess = (titleToast) =>
    toast.success(titleToast, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = (titleToast) =>
    toast.error(titleToast, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const { add, edit } = state;
  function openForm(add, edit) {

    if (add || edit) {
      return {
        display: "block",
      };
    } else {
      return {
        display: "none",
      };
    }
  }
  useEffect(() => {
    if (add) {
      setTitle("ADD NEW EMPLOYEE");
      setEmployeeNew({
        fullname: "",
        phone: "",
        email: "",
        sex: "male",
        age: "",
        startdate: "",
        address: "",
        salaryPerHour: "",
        teamID: 1,
      });
    }

    if (edit) {
      setTitle("EDIT EMPLOYEE");
      setEmployeeNew({
        id: data.id,
        fullname: data.fullname,
        phone: data.phone,
        email: data.email,
        sex: data.sex,
        age: data.age,
        startdate: data.startdate,
        address: data.address,
        salaryPerHour: data.salaryPerHour,
        teamID: data.team.id,
      });
    }

    handleEditOrAddBody();
  }, [add, edit]);
  function handleChange(event) {
    const { name, value } = event.target;
    setEmployeeNew({ ...employeeNew, [name]: value });
  }

  function handleConvertDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  function handleAddClick(e) {
    const isValid = validateAll();
    if (!isValid) return;
    handleAddEL(e);
 
}


 
  function handleAddEL(e) {
    e.preventDefault();


    //sau khi check validate
    const employeeJSON = JSON.stringify(employeeNew);
    console.log(employeeJSON);
    if (add) {
      try {
        api({
          method: "post",
          url: "employee/addEmployee",
          data: employeeJSON,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            //handle success
            console.log(response);
            dispatch(setAddSuccess(true));
            dispatch(setOpenAdd(false));
            notifySucess("create employee success !")
          })
          .catch(function (error) {
            //handle error
            console.log(error.response.data.message);
            dispatch(setOpenAdd(false));
            notifyError(error.response.data.message)


          });
      } catch (error) {
        console.log(error);
      }
    }
    if (edit) {
      try {
        api({
          method: "put",
          url: "employee/update",
          data: employeeJSON,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            //handle success

            rest.update(); //cap nhat tren table
            dispatch(setOpenEdit(false));
            fetchTeam()
            notifySucess("update employee success !")
            
          })
          .catch(function (error) {
            //handle error
            console.log(error.response.data.message);
            notifyError(error.response.data.message)

            dispatch(setOpenEdit(false));
          });
      } catch (error) {
        console.log(error);
      }
    }
    // // mở form thông báo thành công
    // console.log(res.data)
  }

  const validateAll = () => {
    const msg = {};

    if (isEmpty(employeeNew.fullname)) {
      msg.fullname = "please input your name!";
    }

    if (isEmpty(employeeNew.address)) {
      msg.address = "please input your address !";
    }

    if (employeeNew.age.length === 0) {
      msg.age = "please input your age !";
    }

    if (isEmpty(employeeNew.email)) {
      msg.email = "please input your email !";
    }

    if (isEmpty(employeeNew.startdate.toString())) {
      msg.startdate = "please input your startdate !";
    }

    if (isEmpty(employeeNew.phone)) {
      msg.phone = "please input your phone !";
    }
    if (employeeNew.salaryPerHour.length === 0) {
      msg.salaryPerHour = "please input your salaryPerHour !";
    }
    if (isEmpty(employeeNew.startdate)) {
      msg.startdate = "please input your date !";
    }
    if (!isEmail(employeeNew.email)) {
      msg.email = "Please enter correct email format !";
    }
    if (employeeNew.age < 18 && employeeNew.age.length > 0) {
      msg.age = "age must be than 18 !";
    }
    if (employeeNew.salaryPerHour === 0) {
      msg.salaryPerHour = "salaryPerHour must be than 0 !";
    }
    if (employeeNew.phone.length !== 10) {
      msg.phone = "your phone must be 10 characters !";
    }

    setValidationMsg(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };
  
  const handleEditOrAddBody = () => {
    if (edit) {
      console.log("nhan dc data", data);

      return (
        <>
          {
            <div className="modal-body">
              <div className="md-form mb-5">
                <label>Full name employee</label>
                <input
                  defaultValue={data.fullname}
                  onChange={handleChange}
                  name="fullname"
                  type="text"
                  id="form3"
                  placeholder="fullname *"
                  className="form-control validate"
                />
                <p className="fst-italic text-danger fs-6">
                  {validationMsg.fullname}
                </p>
                <div className="invalid-feedback">
                  Please choose a username.
                </div>
              </div>

              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Address *</label>
                  <input
                    defaultValue={data.address}
                    onChange={handleChange}
                    name="address"
                    type="text"
                    id=""
                    placeholder="address"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.address}
                  </p>
                </div>
                <div className="col">
                  <label>Sex employee *</label>

                  <select
                    name="sex"
                    onChange={() => {
                      getSelectedValue("gender");
                    }}
                    defaultValue={data.sex}
                    id="gender"
                    className="form-select mt-1"
                    aria-label=".form-select-lg example"
                  >
                    <option value="male">Male</option>
                    <option value="female">FeMale</option>
                  </select>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Age employee*</label>
                  <input
                    defaultValue={data.age}
                    onChange={handleChange}
                    name="age"
                    type="number"
                    id=""
                    placeholder="Age"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {" "}
                    {validationMsg.age}
                  </p>
                </div>
                <div className="col">
                  <label>Start date *</label>
                  <input
                    defaultValue={handleConvertDate(data.startdate)}
                    onChange={handleChange}
                    name="startdate"
                    type="date"
                  
                    id=""
                    placeholder="start day *"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.startdate}
                  </p>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Money/hour*</label>
                  <input
                    defaultValue={data.salaryPerHour}
                    onChange={handleChange}
                    name="salaryPerHour"
                    type="number"
                    id=""
                    placeholder="money/hour *"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.salaryPerHour}
                  </p>
                </div>
                <div className="col">
                  <label>Phone number *</label>
                  <input
                    defaultValue={data.phone}
                    onChange={handleChange}
                    name="phone"
                    type="text"
                    id=""
                    placeholder="phone number "
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.phone}
                  </p>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Email *</label>
                  <input
                    defaultValue={data.email}
                    onChange={handleChange}
                    name="email"
                    type="text"
                    id=""
                    placeholder="email "
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.email}
                  </p>
                </div>
                <div className="col">
                  <label>Team *</label>
                  <select
                    id="teamGroup"
                    name="teamID"
                    onChange={() => {
                      getSelectedValue("teamGroup");
                    }}
                    className="form-select mt-1"
                    aria-label=".form-select-lg example"
                   
                  >
                    {Team.map((v, k) => {
                      console.log("id",v.id)
                      console.log("Teamid",data.team.id)

                      if(v.id===data.team.id)
                      {
                        return (
                          <option selected="selected" key={k} value={v.id}>
                            {v.name}
                          </option>
                        );
                      }
                      else{
                        return (
                        <option key={k} value={v.id}>
                          {v.name}
                        </option>
                      );
                      }
                      
                    })}
                  </select>
                </div>
              </div>
            </div>
          }
        </>
      );
    }
    if (add) {
      return (
        <>
          {
            <div className="modal-body">
              <div className="md-form mb-5">
                <label>Full name employee</label>
                <input
                  onChange={handleChange}
                  name="fullname"
                  type="text"
                  id="form3"
                  placeholder="fullname *"
                  className="form-control validate"
                />
                <p className="fst-italic text-danger fs-6">
                  {validationMsg.fullname}
                </p>
              </div>

              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Address *</label>
                  <input
                    onChange={handleChange}
                    name="address"
                    type="text"
                    id=""
                    placeholder="address"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.address}
                  </p>
                </div>
                <div className="col">
                  <label>Sex employee *</label>

                  <select
                    name="sex"
                    onChange={() => {
                      getSelectedValue("gender");
                    }}
                    defaultValue="male"
                    id="gender"
                    className="form-select mt-1"
                    aria-label=".form-select-lg example"
                  >
                    <option value="male">Male</option>
                    <option value="female">feMale</option>
                  </select>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Age employee*</label>
                  <input
                    onChange={handleChange}
                    name="age"
                    type="text"
                    id=""
                    placeholder="Age"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.age}
                  </p>
                </div>
                <div className="col">
                  <label>Start date *</label>
                  <input
                    onChange={handleChange}
                    name="startdate"
                    type="date"
                    id="startdate"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.startdate}
                  </p>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Money/hour*</label>
                  <input
                    onChange={handleChange}
                    name="salaryPerHour"
                    type="text"
                    id=""
                    placeholder="money/hour *"
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.salaryPerHour}
                  </p>
                </div>
                <div className="col">
                  <label>Phone number *</label>
                  <input
                    onChange={handleChange}
                    name="phone"
                    type="text"
                    id=""
                    placeholder="phone number "
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.phone}
                  </p>
                </div>
              </div>
              <div className="md-form mb-5 row  ">
                <div className="col">
                  <label>Email *</label>
                  <input
                    onChange={handleChange}
                    name="email"
                    type="text"
                    id=""
                    placeholder="email "
                    className="form-control validate "
                  />
                  <p className="fst-italic text-danger fs-6">
                    {validationMsg.email}
                  </p>
                </div>
                <div className="col">
                  <label>Team *</label>
                  <select
                    id="teamGroup"
                    name="teamID"
                    onChange={() => {
                      getSelectedValue("teamGroup");
                    }}
                    className="form-select mt-1"
                    aria-label=".form-select-lg example"
                    defaultValue={0}
                  >
                    {Team.map((v, k) => {
                      return (
                        <option key={k} value={v.id}>
                          {v.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          }
        </>
      );
    }
  };

  function getSelectedValue(id) {
    var select = document.getElementById(id);
    const name = select.getAttribute("name");
    var value = select.options[select.selectedIndex].value;
    id === "teamGroup"
      ? setEmployeeNew({ ...employeeNew, [name]: value })
      : setEmployeeNew({ ...employeeNew, [name]: value });
  }

  const fetchTeam = async () => {
    const response = await api.get("team/TeamList");
    if (response && response.data) setTeam(response.data.data);
    console.log("teamList", Team);
  };
  useEffect(() => {
  
    console.log("add mount!");
    fetchTeam();
    if(!add ||!edit)
    {
      
        setValidationMsg("")
      
    }
  }, [add,edit]);
  return (
    <>
      <div
        style={openForm(add, edit)}
        className="modal modal-add "
        id="orangeModalSubscription"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="myModalLabel"
        aria-hidden="true"
      >
        <div
          className="modal-dialog modal-notify modal-primary"
          role="document"
        >
          {/* <!--Content--> */}
          <div className="modal-content mt-50">
            {/* <!--Header--> */}
            <div className="modal-header text-left">
              <h4 className="modal-title white-text w-100 font-weight-bold py-2">
                {title}
              </h4>
           
            </div>

            {/* <!--Body--> */}
            {handleEditOrAddBody()}

            {/* <!--Footer--> */}
            <div className="modal-footer float-end">
              <button
                type="button"
                className="btn btn-light btn-rounded"
                onClick={() => {
                  add
                    ? dispatch(setOpenAdd(false))
                    : dispatch(setOpenEdit(false));
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-primary btn-rounded"
                onClick={handleAddClick}
              >
                Submit
              </button>
            </div>
          </div>
          {/* <!--/.Content--> */}
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default Add;
