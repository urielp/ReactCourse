import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    CardTitle,
    CardFooter,
    Table,
    Row,
    Col
  } from "reactstrap";
  
import axios from "axios";


const MyFuncView =(props)=>{

    const sayHello = ()=>{
        console.log(props.buildNumber);
    }
    return (
        <div className="content">
            <h1>
                Hello From Functional Component! {props.buildNumber} 
            </h1>
            <button onClick={props.test}>Click!</button>
        </div>
    )
}

export default MyFuncView;