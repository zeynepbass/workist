import express from "express"
import {   getMessage,
    deleteMessagesBetweenUsers,
    getConversations} from "../controllers/message.js"

const router=express.Router()
router.get('/mesajlar/:gonderenId/:aliciId',getMessage);

router.get('/konusmalar/:userId', getConversations); 

router.delete('/:gonderenId/:aliciId', deleteMessagesBetweenUsers);


export default router;