import { gennerateKey, hashPassWord } from "../helper/authen";
import User from "../models/User";
import mailService from '../mail/mailService';
import { response } from "express";
export const createUser = async (req, res) => {
    const newUser = req.body;
    const checkUser = await User.find({ userName: newUser.userName,email:newUser.email,active:true });
    if (checkUser != null) {
        const password = await hashPassWord(newUser.password)
        const keyActive = gennerateKey();
        await User.create({
            userName: newUser.userName,
            password: password,
            email: newUser.email,
            active_key: keyActive,
            active : false
        })
            .then( async (newUser) => {
                try {
                    await mailService(newUser.email,newUser.userName,"active accout chatApp",keyActive)
                    return res.status(200).json({message:"create user success",data: newUser })
                } catch (error) {
                    console.log(error);
                    User.deleteOne({email : req.email})
                    return res.status(400).json({message:"create user faild",data: null })
                }
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
    User.updateOne({userName : user.userName,email: user.email,active : true},{
        $set:{
            firstName: user.firstName,
            lastName: user.lastName,
            userName: user.userName,
            password: password,
            email: user.email,
            phone: user.phone,
            active: true
        }
    }).then(response =>{
        return res.status(200).json({message: "update profile success", data : response})
    }).catch(error =>{
        console.log(error);
        return res.status(400).json({message: "update profile faild", data : null})
    })
}
export const activeUser = (req,res)=>{
    const useractive= req.body;
    User.updateOne({active_key : useractive.active_key,active:false},{
        $set:{
            active: true
        }
    }).then(response =>{
        return res.status(200).json({message: "active user success", data : response})
    })
    .catch(error =>{
        console.log(error);
        return res.status(400).json({message: "active user faild", data : null})
    })
}
