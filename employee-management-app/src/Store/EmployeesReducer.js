import React from "react";
import { contants } from ".";
const initState = {
  add: false,
  edit: false,
  deleteAll: false,
  pageName: "Employee",
  acceptDelete: false,
  addSuccess: false,
  addTeam:false,
  idDelete:undefined
};



export default function EmployeesReducer(state = initState, action) {
  switch (action.type) {
    case contants.SET_OPEN_ADD:
      return {
        ...state,
        add: action.payload,
      };

    case contants.SET_OPEN_EDIT:
      return {
        ...state,
        edit: action.payload,
      };

    case contants.SET_DELETE_ALL:
      return {
        ...state,
        deleteAll: action.payload,
      };

    case contants.SET_MAIN_PAGE:
      return {
        ...state,
        pageName: action.payload,
      };
    case contants.SET_DELETE_ITEM_SELECTED:
      return {
        ...state,
        acceptDelete: action.payload,
      };
    case contants.ADD_SUCCESS:
      return {
        ...state,
        addSuccess: action.payload,
      };
    
    case contants.SET_ID_DELETE:
      return{
        ...state,
        idDelete:action.payload,
      };

      case contants.SET_ADD_TEAM:
        return{
          ...state,
          addTeam:action.payload,
        };
    default:
      throw new Error("invalid action");
  }
}

export { initState };
