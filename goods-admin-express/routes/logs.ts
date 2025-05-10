import express, {Response,Request,NextFunction} from 'express'
import { Log } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, name, type, user} = req.query

  const data = await Log.find({
                  ...(name && {name}),
                  ...(type && {type}),
                  ...(user && {user}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate('user')

  const total = await Log.countDocuments({
    ...(name && {name}),
    ...(type && {type}),
    ...(user && {user}),
  }); 
  // console.log("logsdata",data);
  return res.status(200).json({data,total});
});

router.post('/', async (req: Request, res: Response)=>{
     const logModel=new Log({...req.body}); 
     logModel.save();
     return res.json({success: true, code: 200});
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Log.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const log=await Log.findById(id)
  // console.log(goods);
  if (log) {
    res.status(200).json({ data: log, success: true})
  } else {
    res.status(500).json({message: '该日志不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Log.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

export default router;
