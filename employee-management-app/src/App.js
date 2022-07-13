import { Route, Router, Routes } from "react-router-dom";
import Nav from "./Components/Nav";
import TeamPage from "./Page/TeamPage";
import EmployeesPage from "./Page/EmployeesPage";
import EmpleeDetailPage from "./Page/EmployeeDetailPage";
import { useState } from "react";
import EmployeeProvider from "./Store/EmployeeProvider";
import TabInfo from "./Components/TabInfo";
import TabWork from "./Components/TabWork";
import TabAdvance from "./Components/TabAdvance";
import TabStatitic from "./Components/TabStatitic";
function App() {
  return (
    <>
      <EmployeeProvider>
        <Nav />
        <Routes>
          <Route path="/" element={<EmployeesPage />} />
          <Route path="/detail/:id" element={<EmpleeDetailPage />}>
            <Route path="info" element={<TabInfo />} />
            <Route path="work" element={<TabWork />} />
            <Route path="advance" element={<TabAdvance />} />
            <Route path="statistic" element={<TabStatitic />} />
          </Route>
          <Route path="/team" element={<TeamPage />} />
        </Routes>
      </EmployeeProvider>
    </>
  );
}

export default App;
