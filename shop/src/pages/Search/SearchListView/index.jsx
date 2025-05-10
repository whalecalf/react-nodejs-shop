import React from "react";
import Item from "./Item";


const SearchListView=(props)=>{
    console.log(props.search);
    return(
        <div>
            {
                props.search.map((ele,index)=>{
                    return(
                        <Item data={ele} index={index}/>
                    )
                })
            }
            
        </div>
    )
}

export default SearchListView