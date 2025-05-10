import React from "react";
import "./style.less"

const PubHeader=(props)=>{

    function backHandler() {
        window.history.back()
    }

    return(
        <div id="common-header">
            <span hidden={props.ishidden} className="back-icon" onClick={backHandler}>
                <i className="icon-chevron-left"></i>
            </span>
            <h1>{props.title}</h1>
        </div>
    )
}

export default PubHeader