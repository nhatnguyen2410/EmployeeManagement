import { faPen } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { upload } from "@testing-library/user-event/dist/upload";
import React, { useEffect, useRef, useState } from "react";
import "../sass/imgEmployee.sass";
import { api } from "../API";
function ImgEmployee({ data }) {
  const [imgSelected, setImgSelected] = useState("");
  const [loading, setLoading] = useState();
  const ImgRef = useRef();
  function handleChooseIMG() {
    const ImgChoosseButton = ImgRef.current;
    ImgChoosseButton.click();
  }
  function saveImg() {
    try {
      if (data) {
        const dataImg = { id: data.id, img: imgSelected };
        const dataImgJSON = JSON.stringify(dataImg);
        console.log(dataImgJSON);
        api({
        method: "put",
        url: "employee/update/img",
        data: dataImgJSON,
        headers: {
          "Content-Type": "application/json",
        },
        }).then(res=>console.log(res))
      
      }

       
    } catch (error) {
      console.log(error);
    }
  }
  async function uploadImage(e) {
    let imgCurrent = e.target.files[0];
    console.log("anh", imgSelected);
    const data = new FormData();
    data.append("file", imgCurrent);
    data.append("upload_preset", "darwin");
    setLoading(true);
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/tmasolution/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImgSelected(file.secure_url);
    setLoading(false);
  }

  useEffect(() => {
    saveImg()

  }, [imgSelected]);
  return (
    <>
      <div className="tab-content" id="tabs-tabContent">
        <input
          id="input-image"
          style={{ display: "none" }}
          type="file"
          name="myImage"
          accept="image/png, image/gif, image/jpeg"
          ref={ImgRef}
          onChange={(e) => {
            uploadImage(e);
          }}
        />
        <div
          style={{ left: "36px", width: "fit-content" }}
          className="align-items-center position-absolute container-sm d-flex flex-column  justify-content-center"
        >
          <div className="icon-edit_background" onClick={handleChooseIMG}>
            <FontAwesomeIcon icon={faPen} className="icon-editImg" />
          </div>

          {loading ? (
            <div
              style={{
                width: "200px",
                height: "300px",
                maxHeight: "100%",
                maxWidth: "100%",
              }}
              className="border border-light rounded d-flex"
            >
              <div class="spinner-border text-primary" style={{    margin: "auto",width:" 50px",height: "50px"}} role="status">
              <span class="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <img
              alt="IMG employee"
              className="border border-light rounded"
              src={imgSelected === "" ? data.image : imgSelected}
              style={{
                width: "200px",
                height: "300px",
                maxHeight: "100%",
                maxWidth: "100%",
                objectFit:"contain"
              }}
            />
          )}
          <span className="mt-3 mb-2">
            <b
              className="text-border-css"
              style={{ marginRight: "10px", background: "#77ba41" }}
            >
              No: {data.id}
            </b>
            <b className="text-border-css" style={{ background: "#e73e33" }}>
              Age: {data.age}
            </b>
          </span>
          <b className="text-border-css" style={{ background: "#048dc9" }}>
            Sex: {data.sex}
          </b>
        </div>
      </div>
    </>
  );
}

export default ImgEmployee;
