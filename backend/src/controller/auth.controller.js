const User = require('../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory"
            })
        }
        const normalizedEmail = email.trim().toLowerCase();
        const existingUser = await User.findOne({ email: normalizedEmail });
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            name,
            email: normalizedEmail,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'User registered successfully',
            user: { id: user._id, name: user.name, email: user.email },
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error Occurred" });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are mandatory"
            })
        }
        const normalizedEmail = email.trim().toLowerCase();
        const findUser = await User.findOne({ email: normalizedEmail });
        if (!findUser) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        };
        const isPasswordValid = await bcrypt.compare(password, findUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }
        const token = jwt.sign(
            { id: findUser._id, email: findUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '7d' }
        )
        const isProd = process.env.NODE_ENV === 'production';
        res.cookie('token', token, {
            httpOnly: true,                        // JS can't read it
            secure: isProd,                        // HTTPS only in production
            sameSite: isProd ? 'none' : 'lax',     // see note below
            maxAge: 7 * 24 * 60 * 60 * 1000,       // 7 days, in milliseconds
        });
        res.status(200).json({
            message: "Login Successfull",
            user: {
                id: findUser._id,
                name: findUser.name,
                email: findUser.email
            }
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: "Error occurred.. try again later" });
    }
}

const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  });
  res.status(200).json({ message: 'Logged out' });
};

const getUserInfo = async (req, res) => {
    try{
        const userId = req.userId;
        const user= await User.findById(userId).select('-password');
        if(!user){
            return res.status(404).json({
                message:"User not found"
            })
        }
        res.status(200).json({
            user
        })
    }catch(error){
        console.log(error.message);
        return res.status(500).json({
            message:"Error occurred.. try again later"
        })
    }
}
module.exports = { register, login ,logout, getUserInfo};