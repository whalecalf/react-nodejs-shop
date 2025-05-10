import React,{useState,useEffect} from 'react'
import CommentView from '../CommentView'
import api from '../../../api'
import LoadMore from "../../../components/LoadMore/index"

const CommentList=(props)=>{

    const [comment,setComment]=useState([])
    const [hasMore,setHasMore]=useState(false)

    useEffect(()=>{
      http()
    },[])


    function http() {
        api.getComment({
            goods:props.id
        }).then(res=>{
          console.log(res);
            if (res.status===200) {
                setComment(comment.concat(res.data.data))
                setHasMore(false)
            }
        }).catch(error=>{
            console.log(error);
        })
    }

    function LoadmoreHandle() {
        http()
    }


  return (
    <div>
      {
        comment.length>0?
        <CommentView data={comment}/>:
        <div>等待数据加载</div>
      }
      {/* {
        hasMore?
        <LoadMore onLoadMore={LoadmoreHandle}/>:
        <div>没有数据了</div>
      } */}
    </div>
  )
}

export default CommentList
