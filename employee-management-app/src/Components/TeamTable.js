import { faIdCard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { api } from "../API";
import "../sass/TeamTable.sass";
import DataTable from "react-data-table-component";
import { EmployeePageStore } from "../Store";
import { actions } from "../Store";
import Swal from "sweetalert2";
import { setAddTeam } from "../Store/action";

function TeamTable() {
  const [teamList, setTeamList] = useState([]);
  const [memberList, setMemberList] = useState([]);
  const [teamCurrent, SetTeamCurrent] = useState("");
  const [totalTeam, setTotalTeam] = useState();
  const [totalEL, setTotalEL] = useState(0);
  const [state, dispatch] = EmployeePageStore();
  const { addTeam } = state;

  async function fetchTeam() {
    try {
      const res = await api.get("team/TeamList");
      if (res.data) console.log("team", res.data.data);
      setTeamList(res.data.data);
      setTotalTeam(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleAddTeam(teamNew) {
    const res = await teamNew;
    const teamNewJSON = JSON.stringify(teamNew);
    console.log(teamNewJSON);
    if (res !== "") {
      api({
        method: "post",
        url: "team/add",
        data: teamNewJSON,
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          return Swal.fire({
            position: "center",
            icon: "success",
            title: `${response.data.message}`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            fetchTeam()
            dispatch(setAddTeam(false))
          });
        })
        .catch((error) => {
          return Swal.fire({
            position: "center",
            icon: "error",
            title: `${error.response.data.message}`,
            showConfirmButton: true,
          }).then(dispatch(setAddTeam(false)));
        });
    }
  }

  useEffect(() => {
    const checkAddTeam = async () => {
      const res = await addTeam;
      if (res) {
        const { value: formValues } = await Swal.fire({
          title: "Add team",
          confirmButtonText: "ADD",
          confirmButtonColor: "#3085d6",
          showCloseButton: true,
          html: '<label>Name:</label><input id="swal-input1" class="swal2-input">',
          focusConfirm: false,
          preConfirm: () => {
            if (!document.getElementById("swal-input1").value) {
              Swal.showValidationMessage("Team name is missing");
            } else {
              return document.getElementById("swal-input1").value;
            }
          },
          didClose: () => {
            dispatch(actions.setAddTeam(false));
          },
        });

        if (formValues) {
          const teamNew = {
            name: formValues,
          };
          handleAddTeam(teamNew);
        }
      }
    };
    checkAddTeam();
  }, [addTeam]);

  async function fetchMember(name) {
    try {
      const res = await api.get("team/employees", {
        params: { name: teamCurrent },
      });
      if (res.data) console.log(res.data.data);
      setMemberList(res.data.data);
      setTotalEL(res.data.message);
    } catch (error) {
      console.log(error);
    }
  }
  async function getFirstTeam() {
    try {
      const res = await api.get(`team/firstTeam`);
      if (res.data) SetTeamCurrent(res.data.data);
      if (teamCurrent !== "") fetchMember(teamCurrent);
    } catch (error) {}
  }
  useEffect(() => {
    getFirstTeam();
    fetchTeam();
  }, []);

  useEffect(() => {
    if (teamCurrent !== "") {
      fetchMember(teamCurrent);
    }
  }, [teamCurrent]);

  const customStyles = {
    table: {
      style: {
        Height: "290px",
      },
    },
    header: {
      style: {
        minHeight: "60px",
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

  const columnTeam = [
    {
      name: "No",
      selector: (row) => row.id,
    },
    {
      name: "Name Team",
      selector: (row) => row.name,
    },

    {
      name: "Option",
      selector: (row) => (
        <FontAwesomeIcon
          onClick={() => {
            SetTeamCurrent(row.name);
          }}
          icon={faIdCard}
          className="icon-detailTeam__hover"
        />
      ),
    },
  ];

  const columnEL = [
    {
      name: "No",
      selector: (row) => row.id,
    },
    {
      name: "Full Name ",
      selector: (row) => row.fullname,
    },
    {
      name: "Phone ",
      selector: (row) => row.phone,
    },
    {
      name: "Address ",
      selector: (row) => row.address,
    },
    {
      name: "Sex ",
      selector: (row) => row.sex,
    },
  ];

  return (
    <>
      <div className="container-fluid d-flex">
        <div className="table-Team  col-sm-4">
          <label>Total {totalTeam} teams</label>
          <DataTable
            data={teamList}
            columns={columnTeam}
            customStyles={customStyles}
            highlightOnHover
            striped
            pagination
          />
        </div>

        <div className="table-data col-sm-8">
          <label>
            Result all teams {teamCurrent}-Total {totalEL} employees
          </label>

          <DataTable
            data={memberList}
            pagination
            columns={columnEL}
            customStyles={customStyles}
            highlightOnHover
            striped
          />
        </div>
      </div>
    </>
  );
}

export default TeamTable;
