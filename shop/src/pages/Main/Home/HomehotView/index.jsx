import React from "react";
import "./style.less"
import { Link } from "react-router-dom";

const HomehotView=(props)=>{
    return(
        <div className="hotproduct">
            <span><h3>{props.title}</h3>
            <Link className="more" to={props.title==="分类"?"/category":"/newlist"}>查看更多{">"}{">"}</Link></span>
            
            <div className="hot-container">
                <ul className="clear-fix">
                    {
                        props.data.map((element,index)=>{
                            return(<li key={index}>
                                <a href={element.link}>
                                    <img src={element.img} alt="" />
                                    <span>{element.title}</span>
                                </a>
                            </li>)
                            
                        })
                    }
                </ul>
            </div>
        </div>
    )
}

export default HomehotView