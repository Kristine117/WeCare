import React from "react";
import { useRouteError } from "react-router-dom";

const Error = ()=>{
    let error = useRouteError();
    console.error(error);
    return (
        <React>
            <h1>There's an error here</h1>
        </React>
    )
}

export default Error;