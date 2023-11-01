import {
    comparePassword,
    gennerateKey,
    gennerateToken,
    hashPassWord,
} from "../helper/authen";
import User from "../models/User";
import mailService from "../mail/mailService";
export const createUser = async (req, res) => {
    let register = req.body;
    const checkUser = await User.findOne({
        email: register.email,
    });
    if (checkUser == null) {
        const password = await hashPassWord(register.password);
        const keyActive = gennerateKey();
        await User.create({
            firstName: register.firstName,
            lastName: register.lastName,
            password: password,
            email: register.email,
            active_key: keyActive,
            active: false,
        })
            .then(async (newUser) => {
                try {
                    await mailService(
                        newUser.email,
                        `${newUser.firstName} ${newUser.lastName}`,
                        "active accout chatApp",
                        keyActive
                    );
                    return res.status(200).json({
                        message: "create user success",
                        data: newUser,
                    });
                } catch (error) {
                    console.log(error);
                    User.deleteOne({ email: req.email });
                    return res
                        .status(400)
                        .json({ message: "create user faild", data: {} });
                }
            })
            .catch((err) => {
                console.log(err);
                return res
                    .status(400)
                    .json({ message: "create user faild", data: {} });
            });
    } else {
        return res
            .status(400)
            .json({ message: "email already exists", data: {} });
    }
};
export const updateProfile = (req, res) => {
    const user = req.body;
    User.updateOne(
        { userName: user.userName, email: user.email, active: true },
        {
            $set: {
                firstName: user.firstName,
                lastName: user.lastName,
                userName: user.userName,
                password: password,
                email: user.email,
                phone: user.phone,
                active: true,
            },
        }
    )
        .then((response) => {
            return res
                .status(200)
                .json({ message: "update profile success", data: response });
        })
        .catch((error) => {
            console.log(error);
            return res
                .status(400)
                .json({ message: "update profile faild", data: {} });
        });
};
export const activeUser = async (req, res) => {
    const userActive = req.body;
    const user = await User.findOne({active_key : userActive.active_key})
    if(user!= null){
        User.updateOne(
            { active_key: userActive.active_key, active: false },
            {
                $set: {
                    active: true,
                },
            }
        )
            .then((response) => {
                return res
                    .status(200)
                    .json({ message: "active user success", data: {} });
            })
            .catch((error) => {
                console.log(error);
                return res
                    .status(400)
                    .json({ message: "active user faild", data: {} });
            });
    }
    else{
        return res
                    .status(400)
                    .json({ message: "key is incorrect", data: {} });
    }
};
export const login = async (req, res) => {
    const login = req.body;
    const userLogin = await User.findOne({ email: login.email });
    if (userLogin != null) {
        const checkpass = await comparePassword(
            login.password,
            userLogin.password
        );
        if (checkpass) {
            try {
                const token = gennerateToken(
                    { user: userLogin.email },
                    process.env.PRIVATE_KEY,
                    "30s"
                );
                const resettoken = gennerateToken(
                    { user: userLogin.email },
                    process.env.PRIVATE_RESET_KEY,
                    "1d"
                );
                return res
                    .cookie("refreshtoken", resettoken, {
                        secure: true,
                        httpOnly: true,
                        expires: new Date(Date.now() + 8 * 3600000),
                    })
                    .status(200)
                    .json({
                        message: "login success",
                        data: { user: userLogin, token: token }
                    });
            } catch (error) {
                console.log(error);
                return res
                .status(400)
                .json({ message: "generate token faild", data: {} });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Incorrect email or password", data: {} });
        }
    } else {
        return res
            .status(400)
            .json({ message: "Incorrect email or password", data: {} });
    }
};
export const resetActiveKey = async(req,res)=>{
    const userReset = req.body;
    const keyActive = gennerateKey();
    try {
        const checkuser= await User.findOne({email : userReset.email,active:false});
        if(checkuser){
            checkuser.updateOne({email : userReset.email}, { $set :{active : keyActive}}).then( async(reseponse)=>{
                await mailService(
                    checkuser.email,
                    `${checkuser.firstName} ${checkuser.lastName}`,
                    "reset key chatApp",
                    keyActive
                );
                return res.status(200).json({
                    message: "reset active key success",
                    data: {},
                });
            }).catch((error)=>{
                console.log("error reset active key",error);
                return res
                .status(400)
                .json({ message: "reset active key faild", data: {} });
            })
        }
        else{
            return res
        .status(400)
        .json({ message: "user not found", data: {} });
        }
    } catch (error) {
        return res
            .status(400)
            .json({ message: "reset active key faild", data: {} });
    }
}
