import React from 'react'
import { Link, NavLink } from 'react-router-dom'
const tabs = [{name:"Infomation",path:"info"},{name:"Working",path:"work"},{name:"Advances",path:"advance"},{name:"Statistic",path:"statistic"}]
function DetailNav() {
    function myFunction(e) {
        const activeArr = document.getElementsByClassName("nav-link block");
    
        Array.prototype.forEach.call(activeArr, (child) => {
          console.log(child);
          child.classList.remove("active");
        });
        e.target.className = ` nav-link
        block
        font-medium
        text-xs
        leading-tight
        uppercase
        border-x-0 border-t-0 border-b-2 border-transparent
        px-6
        py-3
        my-2
        hover:border-transparent hover:bg-gray-100
        focus:border-transparent
        active`;
      }
      const classes = `nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      `
  return (
    <>
    <ul
        className="nav nav-tabs justify-content-lg-center flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 "
        id="tabs-tab"
        role="tablist"
      >
        {tabs.map((tab,index)=>{
          return <li className="nav-item" role="presentation" key={index}>
          <NavLink
            to={tab.path}
            onClick={myFunction}
            className={({ isActive }) =>
            isActive ? `${classes} active` : classes
          }
            id="tabs-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-home"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="false"
          >
            {tab.name}
          </NavLink>
        </li>
        })}
        {/* <li className="nav-item" role="presentation">
          <Link
            to="info"
            onClick={myFunction}
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
      active
    "
            id="tabs-home-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-home"
            role="tab"
            aria-controls="tabs-home"
            aria-selected="false"
          >
            INFORMATIONS
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            to="work"
            onClick={myFunction}
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-profile-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-profile"
            role="tab"
            aria-controls="tabs-profile"
            aria-selected="true"
          >
            WORKING
          </Link>
        </li>
        <li className="nav-item" role="presentation">
          <Link
            href="/tabs-messages"
            to="advance"
            onClick={myFunction}
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-messages-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-messages"
            role="tab"
            aria-controls="tabs-messages"
            aria-selected="true"
          >
            ADVANCES
          </Link>
        </li>

        <li className="nav-item" role="presentation">
          <Link
            to="statitic"
            onClick={myFunction}
            className="
      nav-link
      block
      font-medium
      text-xs
      leading-tight
      uppercase
      border-x-0 border-t-0 border-b-2 border-transparent
      px-6
      py-3
      my-2
      hover:border-transparent hover:bg-gray-100
      focus:border-transparent
    "
            id="tabs-statitics-tab"
            data-bs-toggle="pill"
            data-bs-target="#tabs-statitics"
            role="tab"
            aria-controls="tabs-statitics"
            aria-selected="true"
          >
            STATISTICS
          </Link>
        </li> */}
      </ul>
    </>
  )
}

export default DetailNav