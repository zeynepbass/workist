import express from "express"
import { getPosts,getPost,CreatePost,Delete,Details,Updated} from "../controllers/ilanlarim.js"

const router=express.Router()
router.get('/ilanlar',getPost);
router.get('/ilanlarim/:userId',getPosts);
router.post('/ilanlarim',CreatePost);
router.delete('/ilanlarim/:id',Delete);
router.get('/ilanlarim/:id',Details);
router.put('/ilanlarim/:id',Updated);

export default router;