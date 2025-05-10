import React from "react";

import BottomNav from "../../components/BottomNav";
import { Outlet } from "react-router-dom";


const Layout=()=>{
    return(
        <div>
            <BottomNav/>
            <Outlet/>
        </div>
    )
}

export default Layout