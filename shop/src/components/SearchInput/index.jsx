import React, {useState,useRef, useEffect} from "react";
import "./style.less"
import { useNavigate, useParams } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux"
import * as SearchAction from "../../redux/actions/search"

const SearchInput=(props)=>{

    const navigate=useNavigate();
    const [keywords,setkeywords]=useState("")
    const searchKey = useRef()
    const dispatch = useDispatch()
    const params = useParams()
    const reduxKeywords = useSelector(state => state.search)

    function KeyUpHandler(e) {
        // console.log(e);
        if (keywords.length > 0) {
            if (e.keyCode === 13) {
                navigate("/search/"+keywords)
                dispatch(SearchAction.updateSearch(keywords))
            }
        }        
    }

    useEffect(()=>{
        // console.log(params.keywords);
        if (params.keywords) {
            dispatch(SearchAction.updateSearch(params.keywords))
        }else{
            dispatch(SearchAction.updateSearch(""))
        }
        setkeywords(reduxKeywords.search)
    },[reduxKeywords.search,params.keywords])

    function ChangeHandler(e) {
        setkeywords(e.target.value)
    }

    return(
        <input 
        className="search-input"
        type="text"
        onKeyUp={KeyUpHandler}
        value={keywords}
        onChange={ChangeHandler}
        ref={searchKey}
        placeholder="请输入你想要查找的商品" />
    )
}

export default SearchInput