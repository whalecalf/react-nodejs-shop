import React,{useState} from "react";
import CityHeader from "../../components/PubHeader";
// import CityList from "./CityList";
import CurrentCity from "./CityCurrent"
import { useSelector,useDispatch } from "react-redux";
import {initCity,changeCity} from "../../redux/actions/city"
import CityLists from "./CityLists";
import {useNavigate} from "react-router-dom"


const City=()=>{

    // const [city,setCity]=useState("成都")
    const dispatch=useDispatch();
    const city=useSelector(state=>state.city)
    // console.log(city);
    const navigate = useNavigate()

    function OnCityEventClick(city) {
        // setCity(city);
        dispatch(changeCity(city))
        navigate("/")
    }

    return(
        <div>
            <CityHeader title={"城市选择"}/>
            <CurrentCity city={city}/>
            {/* <CityList onEvent={OnCityEventClick}/> */}
            <CityLists onEvent={OnCityEventClick}/>
        </div>
    )
}

export default City