import express, {Response,Request,NextFunction} from 'express'
import { Category } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, name, level, parent} = req.query

  const data = await Category.find({
                  ...(name && {name}),
                  ...(level && {level}),
                  ...(parent && {parent}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate({path: 'parent'});

  const total = await Category.countDocuments({
    ...(name && {name}),
    ...(level && {level}),
  }); 
  console.log("goodsdata",data);
  return res.status(200).json({data:{data,total}});
});

router.post('/', async (req: Request, res: Response)=>{
  const {name}=req.body;
  const oldCategory = await Category.findOne({ name });
  if (oldCategory) {
    return res.status(500).json({ message: '该分类已存在' });
  } else {
     const categoryModel=new Category({...req.body}); 
      categoryModel.save();
     return res.json({success: true, code: 200});
  }

 
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Category.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const category=await Category.findById(id)
  // console.log(goods);
  if (category) {
    res.status(200).json({ data: category, success: true})
  } else {
    res.status(500).json({message: '该分类不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Category.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

export default router;
