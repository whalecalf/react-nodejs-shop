import express, {Response,Request,NextFunction} from 'express'
import { Comment } from '../model';
var router = express.Router();

/* GET users listing. */
router.get('/', async (req: Request, res: Response)=>{
  const {current=1, pageSize=20, user, goods} = req.query

  const data = await Comment.find({
                  ...(user && {user}),
                  ...(goods && {goods}),
                })
                .skip((Number(current)-1)*Number(pageSize))
                .limit(Number(pageSize))
                .populate('user')
                .populate('response')

  const total = await Comment.countDocuments({
    ...(user && {user}),
  }); 
  // console.comment("commentsdata",data);
  return res.status(200).json({data,total});
});

router.post('/', async (req: Request, res: Response)=>{
     const {body} = req
     const commentModel=new Comment({
        ...body
     });
     let comId; 
    await commentModel.save().then((res)=>[
        console.log(res._id),
        comId=res._id,
         
     ]);
    //  console.log('id',comId);
     return res.json({data:{id:comId},success: true, code: 200})
   
});

router.delete('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  await Comment.findByIdAndDelete(id)
  return res.status(200).json({success: true});
})

router.get('/:id',async (req: Request, res: Response)=>{
  const {id}=req.params;
  const comment=await Comment.findById(id).populate('user').populate('response')
  // console.comment(goods);
  if (comment) {
    res.status(200).json({ data: comment, success: true})
  } else {
    res.status(500).json({message: '该评论不存在' })
  }
})

router.put('/:id',async (req: Request, res: Response)=>{
  const body=req.body;
  const {id}=req.params;
  await Comment.findOneAndUpdate({_id:id},body)
  return res.status(200).json({success: 'true'})
})

export default router;
