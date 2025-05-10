import React from "react";
import HeadNav from "../../../components/HeadNav"
import Swiper from "../../../components/Swiper";
import banner1 from "../../../assets/images/banner1.jpg";
import banner2 from "../../../assets/images/banner2.jpg";
import banner3 from "../../../assets/images/banner3.jpg";
import banner4 from "../../../assets/images/banner4.jpg";
import banner5 from "../../../assets/images/banner5.jpg";
import HomehotList from "../Home/HomehotList";
import { useSelector } from "react-redux";

const Home=()=>{
    const city=useSelector(state=>state.city)
    return(
        <div style={{paddingBottom:'60px'}}>
            <HeadNav cityName={city.cityName}/>
            <Swiper banners={[banner1,banner2,banner3,banner4,banner5]}/>
            <HomehotList cityName={city.cityName}/>
        </div>
    )
}

export default Home;