import React, { useState, useEffect, useContext } from "react";
import { Navigate } from "react-router-dom";


// Context
import { AuthContext } from "../Context/aurh";

const Private = ({children}: any) => {
    const { user, loading, getUser}: any = useContext(AuthContext);

    if(loading){
        getUser();
        return <div></div>
    }
    
    return children;
}

export default Private;