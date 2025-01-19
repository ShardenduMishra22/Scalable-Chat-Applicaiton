import prisma from "../database/database.connect.js";

const ShowAllChats = async (req, res) => {
    try {
        const { user_id } = req.body;
        const chats = await prisma.chatGroup.findMany({
            where: {
                user_id: user_id
            },
            orderBy: {
                created_at: "desc"
            }
        });
        if (chats.length === 0) {
            return res.status(404).send("No Chats Found");
        }
        res.status(200).send(chats);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error While Showing All Chats");
    }
};

const ShowChatById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Chat Id Is Required");
        }

        const chat = await prisma.chatGroup.findUnique({
            where: {
                id: id
            }
        });
        if (!chat) {
            return res.status(404).send("Chat Not Found");
        }
        res.status(200).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error While Showing Chat By Id");
    }
};

const CreateChat = async (req, res) => {
    try {
        const { user_id, title, passcode } = req.body;

        const chat = await prisma.chatGroup.create({
            data: {
                user_id: user_id,
                title: title,
                passcode: passcode
            }
        });

        res.status(201).send(chat);
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error While Creating Chat");
    }
};

const UpdateChat = async (req, res) => {
    try {
        const { id } = req.params;
        const body = req.body;
        if (!id) {
            return res.status(400).send("Chat Id Is Required");
        }
        const chat = await prisma.chatGroup.update({
            data: body,
            where: {
                id: id,
            },
        });
        return res.json({ message: "Group updated successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error While Updating Chat");
    }
};

const DeleteChat = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("Chat Id Is Required");
        }
        await prisma.chatGroup.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({ message: "Group deleted successfully!" });
    } catch (error) {
        console.log(error);
        return res.status(500).send("Internal Server Error While Deleting Chat");
    }
};

export {
    ShowAllChats,
    ShowChatById,
    CreateChat,
    UpdateChat,
    DeleteChat
}