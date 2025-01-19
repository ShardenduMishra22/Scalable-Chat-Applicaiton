import prisma from "../database/database.connect.js";

const SearchGroupChat = async (req,res) => {
    try{
        const { groupId } = req.params;
        const chats = await prisma.chats.findMany({
            where: {
                group_id: groupId
            }
        })

        return res.status(200).json({data: chats});
    }catch(error){
        console.log(error);
        res.status(500).json({message: "Internal Server Error"});
    }
}

export {
    SearchGroupChat
}