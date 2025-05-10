import React, { useState } from "react";
import CitySelect from 'react-city-select';
import data from "../../../data/data.json"
import "./style.less"

const CityLists=(props)=>{

    const [citysData,setCitysData] = useState(data.indexCitys)

    function handleSelectCity(citysData) {
        props.onEvent(citysData.name)
    }

    return(
        <div className="citylists">
            <h3>城市列表</h3>
            <CitySelect
        // 传入数据
        data={citysData}        
        // 传入回调
        onSelectItem={handleSelectCity}>
      </CitySelect>
        </div>
        
    )
}

export default CityLists