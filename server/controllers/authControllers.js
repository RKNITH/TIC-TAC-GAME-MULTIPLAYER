import User from '../models/userModel.js'

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { registerValidation } from '../middlewares/registerValidator.js'
import { loginValidation } from '../middlewares/loginValidator.js'

import dotenv from 'dotenv'
dotenv.config()

export const registerUser = async (req, res) => {
    // Validation
    const { error } = registerValidation(req.body)
    if (error) return res.json(error.details[0].message)

    const emailExist = await User.find({ email: req.body.email })
    if(emailExist.length > 0) return res.status(400).json({message: "Email Already Exist"})

    const usernameExist = await User.find({ username: req.body.username })
    if(usernameExist.length > 0) return res.status(400).json({message: "Username Already Exist"})

    // Hash the password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Saving the new User
    try {
        const newUser = new User({
            password: hashedPassword,
            email: req.body.email,
            username: req.body.username,
            name: req.body.name,
        })

        const user = await newUser.save()
        res.status(200).json(user)
    } catch (err) {
        // Check For Duplictaes
        if (err.keyPattern.email) res.send("Email Already Exist")
        if (err.keyPattern.username) res.send("Username Already Exist")
        res.status(500).json(error)
    }
}

export const loginUser = async (req, res) => {
    // Validation
    const { error } = loginValidation(req.body)
    if (error) return res.status(400).json(error.details[0].message)

    try {
        // If User with entered Email exists
        const user = await User.findOne({ email: req.body.email })
        if (!user) return res.status(400).json({ message: "Incorrect Email" })

        // If exists , the password is checked
        const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).json({ message: "Incorrect Password" })

        // JWT Token
        const token = jwt.sign({
            id: user._id,
            email: user.email,
            username: user.username,
        }, process.env.TOKEN_SECRET)

        return res.cookie('access_token', token, {
            expiry: new Date(Date.now() + 32 * 3600000),
            sameSite: 'none',
            secure: true,
            httpOnly: true
        }) && res.status(200).json({
            message: "Logged in Successfully"
        })
    } catch (err) {
        res.status(500).json(err)
    }
}

export const logoutUser = async (req, res) => {
    try {
        return res
            .clearCookie("access_token")
            .status(200)
            .json({ message: "Successfully logged out 😏 🍀" });
    } catch (err) {
        res.status(500).json(err)
    }
}