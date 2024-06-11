import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Menu from "../../components/Menu/Menu";


function Dashboard() {
  const history = useHistory();


  return (
    <React.Fragment>
      <Menu />
      <main className="content">
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center py-4">
          <div className="d-block mb-4 mb-md-0">
            <h1 className="h4">Dashboard</h1>
          </div>
          <div className="btn-toolbar mb-md-0">
            <div className="d-inline-flex align-items-center">

            </div>
            <div className="ms-2 ms-lg-3">

            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-12">

          </div>
        </div>
        <div className="row">

        </div>

      </main>

    </React.Fragment>
  );
}

export default Dashboard;
