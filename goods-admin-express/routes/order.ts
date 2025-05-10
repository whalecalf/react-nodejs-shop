import express, {Response,Request,NextFunction} from 'express'
import { Order } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, buyer, seller, status} = req.query

  const data = await Order.find({
                  ...(buyer && {buyer}),
                  ...(status && {status}),
                  ...(seller && {seller})
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate('buyer')
                .populate('comment')
                .populate('goods')
                

  const total = await Order.countDocuments({
    ...(status && {status}),
    ...(seller && {seller})
  }); 
  // console.log("orderdata",data);
  return res.status(200).json({data,total});
});

router.post('/', async (req: Request, res: Response)=>{
     const orderModel=new Order({...req.body}); 
     var id;
     await orderModel.save().then(res=>{
      id=res._id
     });
     return res.json({success: true, code: 200, id:id});
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Order.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const category=await Order.findById(id).populate('goods').populate('buyer').populate('comment')
  // console.log(goods);
  if (category) {
    res.status(200).json({ data: category, success: true})
  } else {
    res.status(500).json({message: '该订单不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Order.findOneAndUpdate({_id:id},{$set:{...body}})
  return res.status(200).json({success: 'true'})
})

export default router;
