import express, {Response,Request,NextFunction} from 'express'
import { Address } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, user} = req.query

  const data = await Address.find({
                  ...(user && {user})
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate({path: 'user'});
  // console.log("goodsdata",data);
  return res.status(200).json({data});
});

router.post('/', async (req: Request, res: Response)=>{
     const addressModel=new Address({...req.body}); 
     addressModel.save();
     return res.json({success: true, code: 200});

 
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Address.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const category=await Address.findById(id)
  // console.log(goods);
  if (category) {
    res.status(200).json({ data: category, success: true})
  } else {
    res.status(500).json({message: '该地址不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Address.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

router.put('/',async (req: Request, res: Response)=>{
  await Address.updateMany({},{$set:{isDefault:false}})
  return res.status(200).json({success: 'true'})
} )

export default router;
