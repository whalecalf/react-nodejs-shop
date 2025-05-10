import React from "react";
import "./style.less"

const CityCurrent=(props)=>{
    return(
        <div className="current-city">
            <h2>当前城市:{props.city.cityName}</h2>
        </div>
    )
}

export default CityCurrent