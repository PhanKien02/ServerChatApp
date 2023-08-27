import Room from "../models/Room";
import participants from "../models/Participants";
import user from "../models/User";

// * tạo phòng chat
export const createRoom = async (req,res) =>{
    const newroom = req.body;
    const leader = await user.findById(newroom.leader)
    // * kiểm tra xem leader có tồn tại không
    if(leader){
        // * nếu có tạo phòng chat mới
        Room.create({
            nameRoom: newroom.nameRoom,
            leader :    newroom.leader ,
            active : true,
        }).then(response =>{
            // * nếu tạo phòng thành công thêm danh sách thành viên trong phòng
            participants.create({
                idUser : newroom.leader,
                idRoom : response.id
            }).then(response =>{
                console.log(response);
                return res.status(200).json({message : "create room success", data : response})
            })
            .catch(error =>{
                console.log(error);
                return res.status(400).json({message : "create rooms faild", data : {}})
            })
        }).catch(error =>{
            console.log(error);
            return res.status(400).json({message : "create rooms faild", data : {}})
        })
    }
    else{
        return res.status(400).json({message : "user not found", data : {}})
    }
}
// * thêm thành viên vào phòng chat
export const addMembertoRoom = async (req,res)=>{
    const newMember = req.body;
    // * kiểm tra user có tồn tại không
    const checkUser = await  user.findOne({_id: newMember.idUser, active : true});
    if(!checkUser)
        return res.status(400).json({message : "user not found", data : {}})
    // * kiểm tra phòng có tồn tại không
    const checkRoom = await Room.findOne({_id: newMember.idRoom, active : true})
    if(!checkRoom)
        return res.status(400).json({message : "Can't add members to this group", data : {}})
    // * kiểm tra user đã tham gia phòng chat chưa
    const checkUserInRoom = await participants.findOne({idRoom : newMember.idRoom});
    console.log(checkUserInRoom.idUser);
    if(checkUserInRoom.idUser.includes(checkUser._id))
        return res.status(400).json({message : "This user has joined the room", data : {}})
    // * thêm user vào phòng 
    participants.updateOne({idRoom : newMember.idRoom},{
        $push:{
            idUser : checkUser._id
        }
    })
    .then(response =>{
        return res.status(200).json({message : "add member success", data : response})
    }).catch(error =>{
        console.log(error);
        return res.status(200).json({message : "add member faild", data : {}})
    })
}
export const deleteRoom = async(req,res)=>{
    const roomDelete = req.body;
    const checkRoom= await Room.findOne({_id : roomDelete.idroom});
    if(!checkRoom)
        return res.status(400).json({message : "room not found", data : {}});
    if(checkRoom.leader != roomDelete.user)
        return res.status(400).json({message : "you can't delete this room", data : {}});
    await Room.deleteOne({_id : checkRoom._id}).then(() =>{
        return res.status(200).json({message : "delete this room success", data : {}});
    }).catch(error =>{
        console.log(error);
        return res.status(400).json({message : "delete this room faild", data : {}});
    })
}
export const blockRoom = async (req,res)=>{
    const roomblock = req.body;
    const checkRoom = await Room.findOne({_id : roomblock.idroom});
    if(!checkRoom)
        return res.status(400).json({message : "room not found", data : {}});
    if(checkRoom.leader != roomblock.user)
        return res.status(400).json({message : "you are not the leader of this group", data : {}});
    if(checkRoom.active == false)
        return res.status(400).json({message : "This room is locked", data : {}});
    await  Room.updateOne({_id : checkRoom._id},{
        $set:{
            active : false
        }
    }).then(() =>{
        return res.status(200).json({message : "block this room success", data : {}});
    }).catch(error =>{
        console.log(error);
        return res.status(400).json({message : "block this room faild", data : {}});
    })
}
export const unblockRoom = async (req,res)=>{
    const roomblock = req.body;
    const checkRoom = await Room.findOne({_id : roomblock.idroom});
    if(!checkRoom)
        return res.status(400).json({message : "room not found", data : {}});
    if(checkRoom.leader != roomblock.user)
        return res.status(400).json({message : "you are not the leader of this group", data : {}});
    if(checkRoom.active == true )
        return res.status(400).json({message : "This room has been activated", data : {}});

    await  Room.updateOne({_id : checkRoom._id},{
        $set:{
            active : true
        }
    }).then(() =>{
        return res.status(200).json({message : "block this room success", data : {}});
    }).catch(error =>{
        console.log(error);
        return res.status(400).json({message : "block this room faild", data : {}});
    })
}
export const getAllRoombyUser = (req,res)=>{
    
}

