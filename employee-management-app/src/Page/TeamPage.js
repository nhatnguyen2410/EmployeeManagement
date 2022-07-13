import React, { useEffect } from 'react'
import { setMainPage } from '../Store/action';
import { EmployeePageStore } from '../Store';
import TeamTable from '../Components/TeamTable';

function TeamPage() {
  const [state,dispatch]=EmployeePageStore();
  useEffect(()=>{
  
    dispatch(setMainPage("Team"))
    return  ()=>{
      dispatch(setMainPage("Employee"))
    }
    
  },[])
  return (
    <TeamTable/>
  )
}

export default TeamPage