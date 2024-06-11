import React from "react";
import { Route, BrowserRouter, Redirect } from "react-router-dom";
import Login from "./public/Login/Login";
import Settings from "./private/Settings/Settings";
import Dashboard from "./private/DashBoard/Dashboard";
import Clients from "./private/ClientsPage/Clients";
import Products from "./private/ProductsPage/Products";
import Sales from "./private/SalesPage/Sales";


function Routes(){

    function PrivateRoute({children, ...rest}){
        return(
            <Route {...rest} render={()=> {
                return localStorage.getItem('token')
                ? children
                : <Redirect to="/" />
            }} />

           
        )
    }

    return(
        <BrowserRouter>
            <Route path="/" exact>
                <Login/>
            </Route>
            <PrivateRoute path="/settings">
                <Settings/>
            </PrivateRoute>
            <PrivateRoute path="/dashboard">
                <Dashboard/>
            </PrivateRoute>
            <PrivateRoute path="/clients">
                <Clients/>
            </PrivateRoute>
            <PrivateRoute path="/products">
                <Products/>
            </PrivateRoute>
            <PrivateRoute path="/sales">
                <Sales/>
            </PrivateRoute>
        </BrowserRouter>
    );
}

export default Routes;