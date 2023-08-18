import { gennerateKey, hashPassWord } from "../helper/authen";
import User from "../models/User";

export const createUser = async (req, res) => {
    const newUser = newUser.body;
    const checkUser = await User.find({ userName: newUser.userName,email:newUser.email });
    if (checkUser) {
        const password = hashPassWord(newUser.password)
        await User.create({
            userName: newUser.userName,
            password: password,
            email: newUser.email,
        })
            .then((response) => {
                const keyActive = gennerateKey();
                
            })
            .catch((err) => {
                console.log(err);
                return res.status(400).json({message:"create user faild",data:null});
            });
    }
    else{
        return res.status(400).json({message:"Username or email already exists",data:null});
    }
};
export const updateProfile = (req,res) =>{
    const user = req.body;
    User.updateOne({userName : user.userName,email: user.email,active:true},{
        $set:{
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: password,
            email: user.email,
            phone: user.phone,
        }
    })
}
