import React, { useEffect, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePlus, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { api } from "../API/index";
import Swal from "sweetalert2";
import "../sass/TabAdvance.sass";
import DataTable from "react-data-table-component";
import { convertDate } from "../Store/functions";
import "react-toastify/dist/ReactToastify.css";

function TabAdvance() {
  const employeeId = useParams().id;
  console.log("idadad:" + employeeId);
  const [arrAdvance, setArrAdvance] = useState([]);
  const [addAdvance, setAddAdvance] = useState(false);
  const [deleteAdvance, setDeleteAdvance] = useState(false);
  const [advanceID, setAdvanceID] = useState();


  function deleteAdvanceAPI(id) {
    try {
      api.delete(`advance/delete/${id}`).then((res) => {
        console.log(res);
        fetchAdvance();
      });
    } catch (error) {
      console.log(error);
    }
  }

  function handleDeleteAdvance(id) {
    console.log("id xoa :" + id);
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want delete This Advance!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDeleteAdvance(true);
        setAdvanceID(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  }
  useEffect(() => {
    const isDeleteing = deleteAdvance;
    if (isDeleteing) {
      deleteAdvanceAPI(advanceID);
      setDeleteAdvance(false);
    }
  }, [deleteAdvance]);
  useEffect(() => {
    const addAdvanceNew = async (advanceNew) => {
      const advanceJSON = await JSON.stringify(advanceNew);
      console.log("data", advanceNew);
      try {
        api({
          method: "post",
          url: "advance/add",
          data: advanceJSON,
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then(function (response) {
            //handle success
            console.log("add thanh cong advance");
            setAddAdvance(false);
            fetchAdvance();
          })
          .catch((error) => {
            //handle error
            console.log("loi:", error);
          });
      } catch (error) {
        console.log(error);
      }
    };

    const checkAdd = async () => {
      let res = addAdvance;
      if (res) {
        let { value: formValues } = await Swal.fire({
          title: "Add Advance",
          confirmButtonText: "submit",
          confirmButtonColor: "#3085d6",
          showCloseButton: true,
          html:
            '<label>Date: </label><input type="date"  style="width:60px" id="swal-input1" class="swal2-input">' +
            '<br/><label>Money:</label><input type="number" defaultValue="0" min="1" max="" style="width:60px;margin-left: 5% !important;" id="swal-input2" class="swal2-input ">',
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
            } else {
              Swal.showValidationMessage("Money is missing");
            }
          },
          didClose: () => {
            setAddAdvance(false);
          },
        });

        if (formValues) {
          console.log("formvalue:", formValues);
          const advanceNew = {
            date: formValues[0],
            money: formValues[1],
            idEL: employeeId,
          };
          addAdvanceNew(advanceNew);

          return Swal.fire({
            position: "center",
            icon: "success",
            title: "Advance has been saved",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            setAddAdvance(false);
          });
        }
      }
    };
    checkAdd();
  }, [addAdvance]);

  const fetchAdvance = async () => {
    try {
      const response = await api.get(`advance/advanceList/${employeeId}`);
      if (response && response.data) {
        setArrAdvance(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchAdvance();
  }, []);

  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
    },
    {
      name: "Date",
      selector: (row) => convertDate(row.date),
    },
    {
      name: "Money",
      selector: (row) => `${row.money}$`,
    },
    {
      name: "Option",
      selector: (row) => (
        <FontAwesomeIcon
          style={{ width: "20px", height: "20px" }}
          className="icon-delete-hover"
          icon={faTrashCan}
          onClick={() => {
            handleDeleteAdvance(row.id);
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
    <div className="container">
      <div className="header__employee">
        <h2 className="header__employee--title">ADVANCES</h2>
        <nav
          className="header__employee-title-icon-Group"
          style={{ marginRight: "0" }}
        >
          <FontAwesomeIcon
            onClick={() => {
              setAddAdvance(true);
            }}
            style={{ width: "40px", height: "40px" }}
            className="header__employee-title-icon"
            icon={faCirclePlus}
          />
        </nav>
      </div>
      <hr />
      <DataTable
        style={{ marginBottom: "3%" }}
        data={arrAdvance}
        columns={columns}
        highlightOnHover
        pagination
        fixedHeader
        fixedHeaderScrollHeight="450px"
        customStyles={customStyles}
      />
    </div>
  );
}

export default TabAdvance;
