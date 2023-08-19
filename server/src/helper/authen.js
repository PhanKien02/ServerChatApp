const JWT = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
export const gennerateToken = (payload,secretKey,exp)=>{
    return JWT.sign(payload,secretKey,{expiresIn : exp})
}
export const hashPassWord = async (password)=>{
    const saltRounds = 10;
    try {
        const pass=  await bcryptjs.hash(password, saltRounds);
        return pass
    } catch (error) {
        console.log("hash password eror",error);
    }
}
export const comparePassword = (password,hashedPassword)=>{
    try {
        const checkpass=  bcryptjs.compare(password, hashedPassword)
        return checkpass;
    } catch (error) {
        console.log(error);
    }

}
export const gennerateKey = ()=>{
    return  Math.random().toString().substr(2,4)
}