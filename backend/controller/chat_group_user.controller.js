import prisma from "../database/database.connect";

const SearchGroupChat = async (req, res) => {
    try{
        const { group_id } = req.query;
        const users = await prisma.groupUsers.findMany({
            where: {
                group_id: group_id
            }
        });

        return res.status(200).json({data: users});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

const CreateChatGroup = async (req, res) => {
    try{
        const body = req.body;
        const group = await prisma.groupUsers.create({
            data: body
        });
        return res.status(200).json({data: group});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {
    SearchGroupChat,
    CreateChatGroup
}