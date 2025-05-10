import React, { useEffect, useState } from "react";
import SearchListView from "../SearchListView";
import api from "../../../api"
import LoadMore from "../../../components/LoadMore";

const SearchList=(props)=>{

    const [searchData,setSearchData] = useState([])
    const [hasMore,setHashMore]=useState(false)


    useEffect(()=>{
        http();

        return()=>{
            setSearchData([])
            setHashMore(false)
        }

    },[props.search])

    function LoadMoreHandler(){
        http();
    }

    function http(){
        // console.log(props.search);
        api.search(props.search).then(res=>{
            console.log(res);
            if (res.status===200) {
               setSearchData(res.data.data)
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    return(
        <div>
            {
                searchData.length>0?
                <SearchListView search={searchData}/>:
                <div>等待数据加载</div>
            }
            
            {
                hasMore?
                <LoadMore onLoadMore={LoadMoreHandler}/>:
                <div>无了</div>
            }
        </div>
    )
}

export default SearchList