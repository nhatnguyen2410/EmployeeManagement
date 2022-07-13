import React, { useEffect, useState, useRef } from "react";
import { createTheme } from "react-data-table-component";
import { api } from "../API/index";
import DataTable from "react-data-table-component";
import queryString from "query-string";
import { setAddSuccess, setDeleteAll, setDeleteItemSelected, setMainPage } from "../Store/action";
import Swal from "sweetalert2";
import { Link  } from "react-router-dom";
import {  } from "../Store";
import {
  faSearch,
  faInfo,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { EmployeePageStore } from "../Store/Hooks";

var arrayCheck = [];
const EmployeeTable = () => {
  const [employeeList, setEmployeeList] = useState([]);
  const [SingleDelete, SetSingleDelete] = useState(false);
  const [search, setSearch] = useState("");
  const [filterEmployees, setFilterEmployees] = useState([]);
  const [totalRowsPerPage, setTotalRowsPerPage] = useState(5);
  const [totalRows, setTotalRows] = useState(0)
  const [pageNumber, setpageNumber] = useState(1);
  const [name, setName] = useState();
  const [key, setKey] = useState();
  const checkboxRef = useRef();
  const [state, dispatch] = EmployeePageStore();
  const { acceptDelete, addSuccess } = state;
  const [pending, setPending] = useState(true);

  useEffect(() => {
    function checkAdd() {
      if (addSuccess) {
        fetchEmployees();
        dispatch(setAddSuccess(false));
      }
    }
    function checkDelete() {
      const checkAcceptDelete = acceptDelete;
      let isChecking = checkboxRef.current;
      if (checkAcceptDelete) {
        if (isChecking.checked === true) {
          handleDeleteAllEL();
          setFilterEmployees([]);
        } else {
          try {
            api
              .delete(
                `employee/delete?${queryString.stringify({ id: arrayCheck })}`
              )
              .then(() => fetchEmployees());

            const checkBoxaArr = document.getElementsByClassName("CheckEL");
            for (let i = 1; i < checkBoxaArr.length; i++) {
              checkBoxaArr[i].checked = false;
            }
            dispatch(setDeleteAll(false));
            dispatch(setDeleteItemSelected(false))
          } catch (error) {}
          dispatch(setDeleteAll(false));
          dispatch(setDeleteItemSelected(false))
        }
      }
    }
    checkDelete();
    checkAdd();
  }, [acceptDelete, addSuccess]);

  const customStyles = {
    table:{style:{
      minHeight: "450px",
    }},
    rows: {
      style: {
        minHeight: "72px", // override the row height
      },
    },
    headCells: {
      style: {
        paddingLeft: "8px", // override the cell padding for head cells
        paddingRight: "8px",
      },
    },
    cells: {
      style: {
        paddingLeft: "8px", // override the cell padding for data cells
        paddingRight: "8px",
      },
    },
     headRow: {
          style: {
            borderTopStyle: 'solid',
            borderTopWidth: '1px',
            borderColor: "#ccc",
            border: "1px solid #ccc"
            
          },
        }
  };

  useEffect(() => {
    // bật tb lúc xóa nv bat kỳ
    function deleteSingleEL() {
      const checkDelete = SingleDelete;
      if (checkDelete) {
        return Swal.fire({
          title: "Are you sure?",
          text: `You will delete ${name}!`,
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            // xu ly xoa nv bang id
            handleDeleteEL(key);

            Swal.fire("Deleted!", `${name} is deleted.`, "success");
            SetSingleDelete(false);
            dispatch(setDeleteAll(false));
          } else {
            SetSingleDelete(false);
          }
        });
      }
    }

    deleteSingleEL();
  }, [SingleDelete, key, name]);
  //gán các ô checked khi select all
  const checkFC = () => {
    const checkBoxaArr = document.getElementsByClassName("CheckEL");
    if (checkboxRef.current.checked === true) {
      dispatch(setDeleteAll(true));
      for (let i = 1; i < checkBoxaArr.length; i++) {
        checkBoxaArr[i].checked = true;
      }
    } else {
      dispatch(setDeleteAll(false));
      for (let i = 1; i < checkBoxaArr.length; i++) {
        checkBoxaArr[i].checked = false;
      }
    }
  };
  function addDiffrenceEL(arr, x) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === x) {
        return false;
      }
    }
    return true;
  }

  //  // kiem tra xem checkbox tat ca nv
  function addArraydelete() {
    const checkBoxArr = document.getElementsByClassName("CheckEL");
    console.log("data", checkBoxArr);
    for (let i = 1; i < checkBoxArr.length; i++) {
      if (checkBoxArr[i].checked) {
        if (addDiffrenceEL(arrayCheck, checkBoxArr[i].id)) {
          arrayCheck.push(checkBoxArr[i].id);
        }
      } else {
        if (arrayCheck.includes(checkBoxArr[i].id)) {
          let index = arrayCheck.indexOf(checkBoxArr[i].id);
          arrayCheck.splice(index, 1);
        }
      }
    }
  }
  addArraydelete();
  function checkSingleOrSome() {
    const checkBoxaArr = document.getElementsByClassName("CheckEL");
    for (let i = 1; i < checkBoxaArr.length; i++) {
      if (checkBoxaArr[i].checked) {
        return dispatch(setDeleteAll(true));
      }
    }
    return dispatch(setDeleteAll(false));
  }

  async function handleSearchAPI(){
    try {
      const response = await api.get("employee/search", {
        params: {
          pageLength: totalRowsPerPage,
          pageNumber: pageNumber,
          fullname:search
        },
      })
      if(response) setFilterEmployees(response.data.data) 
      setTotalRows(response.data.message)


    } catch (error) {
      console.log(error.response)
    }
  }

  useEffect(() => {
    if(search!=="")
    {
      handleSearchAPI()
    }
    else{
      const timeout = setTimeout(() => {
        fetchEmployees();
        setPending(false);
        },500)
    }
  }, [search,totalRowsPerPage, pageNumber,totalRows]);
  const handleDeleteEL = async (id) => {
    try {

      await api.delete(`employee/delete/${id}`);
      fetchEmployees();
      const checkBoxaArr = document.getElementsByClassName("CheckEL");
      for (let i = 1; i < checkBoxaArr.length; i++) {
        if (checkBoxaArr[i].checked) {
          checkBoxaArr[i].checked = false;
        }
      }
      dispatch(setDeleteAll(false));
    } catch (error) {
      ;
    }
  };

  function handleDeleteAllEL() {
    try {
      api.delete(`employee/delete/deleteAll`);
    } catch (error) {
      ;
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await api.get("employee/employees", {
        params: {
          pageLength: totalRowsPerPage,
          pageNumber: pageNumber,
        },
      });
      if (response && response.data) setEmployeeList(response.data.data);
      setFilterEmployees(response.data.data);
      setTotalRows(response.data.message)
      console.log(response.data.message)

    } catch (error) {
      if (error.response) {
        alert(`error:${error.response.data.message}`);
      } else {
        ;
      }
    }
  };
 

  ;
  ;

  const columns = [
    {
      name: (
        <input
          ref={checkboxRef}
          style={{ bottom: "20px" }}
          type="checkbox"
          className="CheckEL"
          onClick={() => {
            checkFC();
          }}
        />
      ),
      selector: (row) => {
        return (
          <input
            id={row.id}
            type="checkbox"
            onClick={checkSingleOrSome}
            className="CheckEL"
          />
        );
      },
    },
    { name: "No", selector: (row) => row.id },
    { name: "Fullname", selector: (row) => row.fullname },
    { name: "Phone", selector: (row) => row.phone },
    { name: "Team", selector: (row) => row.team!=null ?  row.team.name : "No Team"},
    {
      name: "Option",
      cell: (row) => {
        return (
          <span className=" d-flex justify-content-around w-50">
            <Link style={{ width: "24px" }} to={`detail/${row.id}/info`}>
              <FontAwesomeIcon
                className="button_info--table  btn-hover"
                style={{ marginRight: "40px", padding: "none" }}
                icon={faInfo}
                onClick={() => {
                  dispatch(setMainPage(row.fullname));
                }}
              />
            </Link>
            <FontAwesomeIcon
              className="button_delete--table btn-hover"
              icon={faTrashCan}
              onClick={() => {
                SetSingleDelete(true);
                setName(row.fullname);
                setKey(row.id);
              }}
            />
          </span>
        );
      },
    },
  ];

  return (
    <>
      <div
        className="container-fluid "
        style={{
          width:"99%",
          boxShadow: "rgba(100, 100, 111, 0.3) 0px 7px 29px 0px",
        }}
      >
        <DataTable
          columns={columns}
          title={`Total ${totalRows} Employees`}
          data={filterEmployees}
          pagination
          fixedHeaderScrollHeight="450px"
          highlightOnHover
          subHeader
          subHeaderComponent={
            <input
              type="text"
              placeholder="Search here"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-25 form-control"
              style={{ marginRight: "-16px" }}
            />
          }
          paginationPerPage={5}
          paginationRowsPerPageOptions={[5, 10, 15, 25]}
          paginationServer
          paginationTotalRows={totalRows}
          customStyles={customStyles}
          subHeaderAlign="right"
          subHeaderWrap
          direction="auto"
          responsive
          progressPending={pending}
          striped="yes"
          onChangeRowsPerPage={(totalRow, page) => {
            setpageNumber(page);
            setTotalRowsPerPage(totalRow);
          }}
          onChangePage={(page)=>{setpageNumber(page)}}
        />
      </div>
    </>
  );
};

export default EmployeeTable;
