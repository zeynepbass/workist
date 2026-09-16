import express from "express"
import {updatePortfolioStatus, getPosts,CreatePost,Delete,Details,Updated} from "../controllers/portfolyo.js"
import authMiddleware from "../middleware/auth.js";

const router=express.Router()

router.get('/portfolyo/:userId',getPosts);
router.post('/portfolyo', authMiddleware,
    CreatePost);
router.delete('/portfolyo/:id',Delete);
router.get('/portfolyo/:id',Details);
router.put('/portfolyo/:id',Updated);
router.patch("/portfolyo/:id", updatePortfolioStatus);
export default router;