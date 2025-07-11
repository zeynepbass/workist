import express from "express"
import { getPosts,CreatePost,Delete,Details,Updated} from "../controllers/portfolyo.js"

const router=express.Router()

router.get('/portfolyo/:userId',getPosts);
router.post('/portfolyo',CreatePost);
router.delete('/portfolyo/:id',Delete);
router.get('/portfolyo/:id',Details);
router.put('/portfolyo/:id',Updated);

export default router;