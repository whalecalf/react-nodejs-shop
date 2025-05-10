import express, {Response,Request,NextFunction} from 'express'
import { User } from '../model';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../constant';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, name, status, role} = req.query

  const data = await User.find({
                  ...(name && {name}),
                  ...(status && {status}),
                  ...(role && {role}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))

  const total = await User.countDocuments({
    ...(name && {name}),
    ...(status && {status}),
  }); 
  // console.log("goodsdata",data);
  return res.status(200).json({data,total});
});

router.post('/', async (req: Request, res: Response)=>{
  const {name}=req.body;
  const oldUser = await User.findOne({name})
  
  if (oldUser) {
    return res.status(500).json({ message: '同名用户已存在' });
  } else {
    const userModel=new User({...req.body}); 
    userModel.save();
  return res.json({success: true, code: 200});
  }
  
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await User.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const user=await User.findById(id)
  // console.log(goods);
  if (user) {
    res.status(200).json({ data: user, success: true})
  } else {
    res.status(500).json({message: '该用户不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await User.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

router.post('/login', async (req:Request, res: Response) => {
  const { name, password } = req.body;  
  const user = await User.findOne({ name, password });
  // console.log(user);
  
  if (user) {
    const token = jwt.sign({id: user._id}, SECRET_KEY, {expiresIn:'24h'})
    res.status(200).json({ status:200, data: user, success: true, token});
  } else {
    res.status(500).json({ message: '用户名或密码错误' })
  }
});

export default router;
