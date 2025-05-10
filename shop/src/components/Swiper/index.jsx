import React, { useState } from "react";
import { Carousel, ConfigProvider } from "antd";

import "./style.less";



const Swiper = (props) => {
    const [index, setIndex] = useState(0)

    function HandleChangeIndex(index) {
        setIndex(index)
    }

    return (
        <div className="swiper">
            <ConfigProvider
                theme={{
                    components: {
                        Carousel: {
                            /* 这里是你的组件 token */
                            dotWidth: 5,
                            dotHeight: 5,
                            dotActiveWidth: 5
                        },
                    },
                }}
            >
                <Carousel autoplay autoplaySpeed={2000}>
                    {
                        props.banners.map((ele, index) => {
                            return (
                                <div key={index} className="swiper-view">
                                    <img src={ele} alt="" />
                                </div>
                            )
                        })
                    }
                </Carousel >
            </ConfigProvider>

        </div>
    )
}

export default Swiper;