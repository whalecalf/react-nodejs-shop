import express, {Response,Request,NextFunction} from 'express'
import { Goods } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, name, category} = req.query

  const data = await Goods.find({
                  ...(name && {name}),
                  ...(category && {category}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate('category')
                .populate('seller');

  const total = await Goods.countDocuments({
    ...(name && {name}),
    ...(category && {category}),
  }); 
  // console.log("goodsdata",data);
  return res.status(200).json({data,total});
});

router.post('/', (req: Request, res: Response)=>{
  const body=req.body;
  const goodsModel=new Goods({...body}); 
  goodsModel.save();
  return res.json({success: true, code: 200});
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Goods.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const goods=await Goods.findById(id).populate('category')
  // console.log(goods);
  if (goods) {
    res.status(200).json({ data: goods, success: true})
  } else {
    res.status(500).json({message: '该商品不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Goods.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

export default router;
