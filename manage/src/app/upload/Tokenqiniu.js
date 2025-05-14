const qiniu = require('qiniu')
const Qiniu = {
    AK:'oF1fdJOoGr36XlVyLH70kAbxRlu3d3C76ceDwSS6',
    SK:'t0OdQGbjHw6_H8yVX2qCEcpmDTN32-GCrKcvtpRk'
}

qiniu.conf.ACCESS_KEY = Qiniu.AK;
qiniu.conf.SECRET_KEY = Qiniu.SK;

// 七牛那边的对应的bucket名称
const bucket = 'shop-database';


 
export const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket
    })
    const token = putPolicy.uploadToken();
    console.log(token);
    return token
}


