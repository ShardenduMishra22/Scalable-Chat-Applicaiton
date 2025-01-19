import express from "express";
import { SearchGroupChat } from "../controller/chat.controller.js";

const router = express.Router();

router.get("/search/:groupId", SearchGroupChat);

export default router;