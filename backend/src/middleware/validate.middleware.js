const emailRegex = /^\S+@\S+\.\S+$/;

const validateRegister = (req,res,next)=>{
    const {name,email,password}= req.body;
    if(!name || !email || !password){
        return res.status(400).json({
            message:"All fields are mandatory"
        })
    }
    if(!emailRegex.test(email.trim().toLowerCase())){
        return res.status(400).json({
            message:"Enter a valid email Address"
        })
    }
    if(password.length<6){
        return res.status(400).json({
            message:"Password must be at least 6 characters long"
        })
    }
    next();
}

const validateLogin = (req,res,next)=>{
    const {email,password}= req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"All fields are mandatory"
        })
    }
    next();
}

module.exports={validateRegister,validateLogin};