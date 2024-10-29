import jwt from "jsonwebtoken";

export const authorization = async (req, res, next) => {
    const token = req.cookies.access_token;
    console.log(req.cookies)
    if (!token) {
        return res.sendStatus(403).json("You are not logged in");
    } else {
        try {
            const data = jwt.verify(token, "YOUR_SECRET_KEY");
            req.user = data;

            return next()
          } catch {
            return res.sendStatus(403);
        }
    }
}