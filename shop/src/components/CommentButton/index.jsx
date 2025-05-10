import React from 'react'
import { Link } from "react-router-dom";
import "./style.less"

function CommentButton() {
  return (
    <div>
      <Link to={'/order'}>
        <button className='cbtn'>去评价</button>
      </Link>
    </div>
  )
}

export default CommentButton
