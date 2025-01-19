import { CreateChat, DeleteChat, ShowAllChats, ShowChatById, UpdateChat } from "../controller/chat_group.controller.js";

import express from "express";
const router = express.Router();

router.get("/chats", ShowAllChats);
router.get("/chat/:id", ShowChatById);
router.post("/chat", CreateChat);
router.put("/chat/:id", UpdateChat);
router.delete("/chat/:id", DeleteChat);

export default router;