import React from "react";
import "./style.less"
import { NavLink } from "react-router-dom";

const BottomNav=()=>{
    return(
        <div className="nav-footer">
            <ul className="clear-fix">
                <li>
                    <NavLink exact to="/">
                      <i className="iconfont icon-shouye"></i>
                        首页  
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/cart">
                      <i className="iconfont icon-gouwuche"></i>
                        购物车  
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/orderList">
                      <i className="iconfont icon-dingdan-"></i>
                        订单列表  
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/user">
                      <i className="iconfont icon-gerenzhongxin"></i>
                        我的  
                    </NavLink>
                </li>
            </ul>
        </div>
    )
};

export default BottomNav;