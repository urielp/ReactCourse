import React from "react";

const PageComp = (props) => {
    return (
        <a href="javascript:void(0);" onClick={props.changePage}><span>{props.page} </span> | </a>
    )
}

export default PageComp;