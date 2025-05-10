import React from "react";
import "./style.less"
import {useNavigate} from "react-router-dom"

const CityList=(props)=>{

    const navigate = useNavigate()

    function OnCityClickhandler(city) {
        props.onEvent(city)
        navigate("/")
    }

    return(
        <div className="city-list-container">
            <h3>热门城市</h3>
            <ul className="clear-fix">
                <li onClick={()=>OnCityClickhandler('广州')}><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li><span>广州</span></li>
                <li onClick={()=>OnCityClickhandler('大阪')}><span>大阪</span></li>
            </ul>
        </div>
    )
}

export default CityList