import express, {Response,Request,NextFunction} from 'express'
import qiniu from 'qiniu'

var router = express.Router();


const Qiniu = {
    AK:'',
    SK:''
}

qiniu.conf.ACCESS_KEY = Qiniu.AK;
qiniu.conf.SECRET_KEY = Qiniu.SK;

// 七牛那边的对应的bucket名称
const bucket = ' ';


const getToken = () => {
    const putPolicy = new qiniu.rs.PutPolicy({
        scope: bucket
    })
    const token = putPolicy.uploadToken();
    console.log(token);
    return token
}


router.post('/',async (req: Request, res: Response)=>{

    const token = getToken()
    console.log(token);
    return res.status(200).json({token:token});
})

export default router;
