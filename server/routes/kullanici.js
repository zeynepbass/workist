import express from "express"
import { signin,signup,users,Delete,duzenle,Detay,usersMessage,me } from "../controllers/kullanici.js"
import authMiddleware from "../middleware/auth.js"

const router=express.Router()
router.get('/me',authMiddleware,me);
router.get('/users/:id',users);
router.delete('/users/:email',Delete);
router.post('/signin',signin);
router.post('/uye-ol',signup);
router.put('/duzenle/:email',duzenle);
router.get('/duzenle/:email',Detay);
router.get('/users',usersMessage);
export default router;