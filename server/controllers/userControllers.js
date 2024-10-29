import jwt from "jsonwebtoken"

export const getInfo = async (req, res) => {
    const token = req.cookies.access_token
    if(!token) return res.status(401).json("Access Denied")

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET)
        if(!verified) return res.status(401).json("Access Denied")

        res.send(verified)
    } catch(err) {
        res.status(409).json({message: err.message})
    }
}