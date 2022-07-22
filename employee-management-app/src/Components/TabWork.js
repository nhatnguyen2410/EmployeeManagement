import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { api } from "../API/index";
import { functionEL } from "../Store";
import DataTable from "react-data-table-component";
import "../sass/Tabwork.sass";
import Swal from "sweetalert2";
import { convertDate } from "../Store/functions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactPaginate from "react-paginate";

function TabWork() {
  const employeeId = useParams().id;
  console.log("idadad:" + employeeId);
  const [arrWork, setArrWork] = useState([]);
  const [addWork, setAddWork] = useState(false);
  const [deleteWork, setDeleteWork] = useState(false);
  const [workID, setWorkID] = useState();
  const [result, setResult] = useState("");
  const [totalWork, setTotalWork] = useState();
  const [workListPaginate, setWorkListPaginate] = useState([]);
  function deleteWorkAPI(id) {
    try {
      api.delete(`work/delete/${id}`).then((res) => {
        console.log(res);

        fetchWork();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleWorkPaginate(Arr, pageNumber) {
    const arr = arrWork.filter(
      (el, i) => i >= pageNumber * 5 && i < pageNumber * 5 + 5
    );
    setWorkListPaginate(arr);
  }

  useEffect(() => {
    if (arrWork) {
      handleWorkPaginate(arrWork, 0);
    }
  }, [arrWork]);

  const fetchWork = async () => {
    try {
      const response = await api.get(`work/workList/${employeeId}`);
      if (response && response.data) {
        setArrWork(response.data.data);
        setTotalWork(response.data.message);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  function handleDeleteWork(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want delete This work!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteWork(true);
        setWorkID(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }

  useEffect(() => {
    const isDeleteing = deleteWork;
    if (isDeleteing) {
      deleteWorkAPI(workID);
      setDeleteWork(false);
    }
  }, [deleteWork]);

  useEffect(() => {
    const checkAddResult = async () => {
      const resultAdd = await result;
      if (resultAdd !== "" && resultAdd !== "success") {
        return Swal.fire({
          position: "center",
          icon: "error",
          title: `${resultAdd}`,
          showConfirmButton: true,
        }).then(() => {
          setResult("");
          setAddWork(false);
        });
      }
      if (resultAdd === "success") {
        return Swal.fire({
          position: "center",
          icon: "success",
          title: "Working has been saved",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setAddWork(false);
        });
      }
    };
    checkAddResult();
  }, [result]);
  useEffect(() => {
    const addWorkNew = async (workNew) => {
      const workJSON = await JSON.stringify(workNew);
      console.log("data", workNew);
      try {
        api({
          method: "post",
          url: "work/add",
          data: workJSON,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            //handle success
            console.log("add thanh cong work");
            setAddWork(false);
            setResult("success");
            fetchWork();
          })
          .catch((error) => {
            //handle error
            console.log("loi:", error.response.data.message);
            setResult(error.response.data.message);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const checkAdd = async () => {
      let res = addWork;
      if (res) {
        let { value: formValues } = await Swal.fire({
          title: "Add working",
          confirmButtonText: "submit",
          confirmButtonColor: "#3085d6",
          showCloseButton: true,
          html:
            '<label>Date: </label><input type="date" style="width:60px" id="swal-input1" class="swal2-input">' +
            '<br/><label>Hour:</label><input type="number" defaultValue="0" min="1" max="24" style="width:60px" id="swal-input2" class="swal2-input ">',
          focusConfirm: false,
          preConfirm: () => {
            if (
              document.getElementById("swal-input1").value &&
              document.getElementById("swal-input2").value
            ) {
              return [
                document.getElementById("swal-input1").value,
                document.getElementById("swal-input2").value,
              ];
            } else if (!document.getElementById("swal-input1").value) {
              Swal.showValidationMessage("Date is missing");
            } else if (!document.getElementById("swal-input2").value) {
              Swal.showValidationMessage("Hour is missing");
            }
          },
          didClose: () => {
            setAddWork(false);
          },
        });

        if (formValues) {
          console.log("formvalue:", formValues);
          const workNew = {
            date: formValues[0],
            hour: formValues[1],
            idEL: employeeId,
          };
          addWorkNew(workNew);
        }
      }
    };
    if (addWork === true) checkAdd();
  }, [addWork]);

  useEffect(() => {
    fetchWork();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row,index) => index,
    },
    {
      name: "Date",
      selector: (row) => convertDate(row.date),
    },
    {
      name: "Hour",
      selector: (row) => `${row.hour}h`,
    },
    {
      name: "Option",
      selector: (row) => (
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          className="icon-delete-hover"
          icon={faTrashCan}
          onClick={() => {
            handleDeleteWork(row.id);
          }}
          responsive
        />
      ),
    },
  ];
  const customStyles = {
    header: {
      style: {
        minHeight: "60px",
        marginTop: "5%",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderColor: "#ccc",
        border: "1px solid #ccc",
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderColor: "#ccc",
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderColor: "#ccc",
        },
      },
    },
  };

  return (
    <div className="container ">
      <div className="header__employee mb-10">
        <h2 className="header__employee--title">WORKING</h2>
        <nav
          className="header__employee-title-icon-Group"
          style={{ marginRight: "0" }}
        >
          <FontAwesomeIcon
            onClick={() => {
              setAddWork(true);
            }}
            style={{ width: "40px", height: "40px" }}
            className="header__employee-title-icon"
            icon={faCirclePlus}
          />
        </nav>
      </div>
      <hr />
      <DataTable
        style={{ marginBottom: "4%" }}
        data={workListPaginate}
        columns={columns}
        highlightOnHover
        fixedHeader
        fixedHeaderScrollHeight="450px"
        customStyles={customStyles}
      />
      {
        workListPaginate.length > 0  ?(
          <ReactPaginate
        breakLabel="..."
        nextLabel=" >>"
        pageRangeDisplayed={5}
        pageCount={totalWork / 5}
        onPageChange={(page) => {
          handleWorkPaginate(arrWork, page.selected);
        }}
        previousLabel="<<"
        renderOnZeroPageCount={null}
        containerClassName="pagination-page"
        pageClassName="li-page"
        disabledClassName="button-disable"
      />
        ) :(<>
        </>)
      }
    </div>
  );
}

export default TabWork;
