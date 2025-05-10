import express, {Response,Request,NextFunction} from 'express'
import { Cart } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {user} = req.query

  const data = await Cart.find({
                  ...(user && {user})
                })
                // .skip((Number(current)-1)*Number(pageSize))
                // .limit(Number(pageSize))
                .populate({path: 'goods'});
  // console.log("goodsdata",data);
  return res.status(200).json({data});
});

router.post('/', async (req: Request, res: Response)=>{
    const {user,goods} = req.body;
    const oldcart=await Cart.findOne({user,goods})
    if (oldcart) {
        let newnum=oldcart.num?oldcart.num:0
        await Cart.updateOne({goods,user},{num:newnum+1})
        return res.json({success: true, code: 200});
    } else {
        const addressModel=new Cart({...req.body}); 
        addressModel.save();
        return res.json({success: true, code: 200});
    }
     
 
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Cart.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const category=await Cart.findById(id)
  // console.log(goods);
  if (category) {
    res.status(200).json({ data: category, success: true})
  } else {
    res.status(500).json({message: '该购物车不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Cart.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

router.put('/buy/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Cart.findOneAndUpdate({_id:id},{$set:{isBuy:body.isBuy}})
  return res.status(200).json({success: 'true'})
})

export default router;
