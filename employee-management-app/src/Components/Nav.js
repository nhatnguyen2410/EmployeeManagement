import React, { useEffect, useMemo, useRef } from "react";
import { Link, NavLink} from "react-router-dom";
import "../sass/Nav.sass";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faTrashCan,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { actions } from "../Store";
import { EmployeePageStore } from "../Store/Hooks";
import Swal from "sweetalert2";
import { setDeleteAll, setOpenEdit } from "../Store/action";
import { api } from "../API";
import { useNavigate } from "react-router-dom";
function Nav() {
  const navigate=useNavigate();
  function myFunction(e) {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function (el) {
      el.classList.remove("active");
    });
    e.target.className = "linkPage nav-link active";
  }

  const [state, dispatch] = EmployeePageStore();
  const { add, deleteAll, pageName ,idDelete} = state;
  
  const [deleteSelected, setDeleteSelected] = useState(false); //mo form delete
const [checkDelete,setCheckDelete]=useState(false)
  function handleturnAddEL(add) {
    dispatch(
      add === true ? actions.setOpenAdd(false) : actions.setOpenAdd(true)
    );
  }
  function handleDeleteEmployeeCurrent(){
    if (checkDelete) {
      return Swal.fire({
        title: "Are you sure?",
        text: `You will delete this employee!`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          // xu ly xoa nv bang id
          handleDeleteAPI(idDelete);
          Swal.fire("Deleted!", `The employee has been deleted.`, "success");
          setCheckDelete(false);
          dispatch(setDeleteAll(false));
          navigate("/",{replace:true})
        } else {
          setCheckDelete(false);
        }
      });
    }

  }

  function handleDeleteAPI(id)
  {
    try {
          api.delete(`employee/delete/${id}`).then(res=>{
            console.log("ket qua:",res.data)
          })
          
    } catch (error) {
      
    }
  }
  useEffect(()=>{
    if(checkDelete) handleDeleteEmployeeCurrent()
  },[checkDelete])

  function TurnButtonHeaderGroup(pageName) {
    if (pageName === "Employee") {
      return (
        <>
          <FontAwesomeIcon
            className="header__employee-title-icon"
            icon={faCirclePlus}
            onClick={() => {
              handleturnAddEL(add);
            }}
          />
          <FontAwesomeIcon
            id="iconDelete"
            className={
              deleteAll
                ? "header__employee-title-icon "
                : "header__employee-title-icon header__employee-title-icon-disable"
            }
            onClick={() => {
              deleteSelected && deleteAll
                ? setDeleteSelected(false)
                : setDeleteSelected(true);
            }}
            icon={faTrashCan}
          />
        </>
      );
    } else if (pageName === "Team") {
      return (
        <>
          <FontAwesomeIcon
            className="header__employee-title-icon w-20 "
            icon={faCirclePlus}
            onClick={()=>{dispatch(actions.setAddTeam(true))}}
          />
        </>
      );
    } else {  
      return (
        <>
          <FontAwesomeIcon
            className="header__employee-title-icon"
            icon={faPenToSquare}
            onClick={()=>dispatch(setOpenEdit(true))}
          />
          <FontAwesomeIcon
            id="iconDelete"
            className="header__employee-title-icon "
            onClick={()=>{
              setCheckDelete(true)
            }}
            icon={faTrashCan}
          />
        </>
      );
    }
  }

  useEffect( () => {
     function DeleteSeletedItem() {
      const response =  deleteSelected;
      if (response === true && deleteAll) {
        return Swal.fire({
          title: "Are you sure?",
          text: "You will delete the Employees selected!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(actions.setDeleteItemSelected(true));
            Swal.fire("Deleted!", "The selected Employees deleted.", "success");
            setDeleteSelected(false);
            
          } else {
            setDeleteSelected(false);
          }
        });
      }
      // ...
    }
    DeleteSeletedItem();
  }, [deleteSelected]);

  return (
    <>
      <div className="container-fluid">
        <hr />
        <nav className="navbar px-3">
          <div className="navbar-brand"> Employee Manager</div>
          <ul className="nav nav-pills">
            <li className="nav-item">
              <NavLink
                className={({isActive})=>isActive ||(pageName!=="Employee" && pageName!=="Team")?"linkPage nav-link active":"linkPage nav-link"}
                to=""
                    >
                Employees
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                className={({isActive})=>isActive?"linkPage nav-link active":"linkPage nav-link"}
                to="team"
              >
                Team
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__employee">
          <h3 className="header__employee--title">{pageName}</h3>
          <nav className="header__employee-title-icon-Group">
          {
            TurnButtonHeaderGroup(pageName)
          }
          </nav>
        </div>
        <hr />
      </div>
    </>
  );
}

export default Nav;
