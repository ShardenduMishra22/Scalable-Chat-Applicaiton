import express from "express";
import { SearchGroupChat } from "../controller/chat.controller";

const router = express.Router();

router.get("/search/:groupId", SearchGroupChat);

export default router;