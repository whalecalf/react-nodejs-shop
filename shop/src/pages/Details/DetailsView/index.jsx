import React, { useState, useEffect } from "react";
import DetailsHeader from "../../../components/PubHeader";
import Swiper from "../../../components/Swiper";
import Tabs from "../../../components/Tabs";
import "./style.less"
import BuyAndStore from "../BuyAndStore";
import CommentList from "../CommentList";

const DetailsView = (props) => {


    const detailsData = props.detailsData
    const pics=detailsData.pics.map((element,index)=>{return element.url})

    return (
        <div>
            <DetailsHeader title={'详情页'} />
            <div>
                <Swiper banners={pics} />
                <Tabs>
                    <div label='详情'>
                        <div className="detail-info">
                            <h3>{detailsData.title}</h3>
                            <div className="box">
                                <ul>
                                    <li>
                                        <p>价格</p>
                                        <span>¥{detailsData.price} 元</span>
                                    </li>
                                    <li>
                                        <p>分类</p>
                                        <span>{detailsData.category.name}</span>
                                    </li>
                                    <li>
                                        <p>库存</p>
                                        <span>{detailsData.stock}件</span>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className="info">
                                <div className="info-list">
                                    <p>类型：{detailsData.info.type}</p>
                                    <p>朝向：{detailsData.info.orientation}</p>
                                </div>
                                <div className="info-list">
                                    <p>楼层：{detailsData.info.level}</p>
                                    <p>装修：{detailsData.info.style}</p>
                                </div>
                                <div className="info-list">
                                    <p>年代：{detailsData.info.years}</p>
                                </div>
                            </div>                             */}
                        </div>
                        
                    </div>

                    <div label='评价'>
                        <CommentList id={props.id}/>
                    </div>
                </Tabs>

                <BuyAndStore id={props.id} />
            </div>
            {/* 详情：{props.id} */}
        </div>
    )
}

export default DetailsView