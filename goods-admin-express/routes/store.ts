import express, {Response,Request,NextFunction} from 'express'
import { Store } from '../model';

var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, owner } = req.query

  const data = await Store.find({
                  ...(owner && {owner}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))

  const total = await Store.countDocuments({
    ...(owner && {owner}),
  }); 
  // console.log("goodsdata",data);
  return res.status(200).json({data,total});
});

router.post('/', (req: Request, res: Response)=>{
  const body=req.body;
  const storeModel=new Store({
    ...body
  }); 
  storeModel.save();
  return res.json({success: true, code: 200});
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Store.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const store=await Store.findById(id)
  // console.log(goods);
  if (store) {
    res.status(200).json({ data: store, success: true})
  } else {
    res.status(500).json({message: '该店铺不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Store.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

export default router;
