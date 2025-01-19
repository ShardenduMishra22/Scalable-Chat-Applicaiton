import express from "express";
import { SearchGroupChat, CreateChatGroup } from "../controllers/chatGroupController.js";

const router = express.Router();

router.get("/search", SearchGroupChat);
router.post("/create", CreateChatGroup);

export default router;
