
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        console.log("AUTH HEADER:", authHeader);

        if (!authHeader) {
            return res.status(401).json({
                message: "Yetkilendirme tokenı bulunamadı.",
            });
        }

        const token = authHeader.split(" ")[1];

        console.log("TOKEN:", token);

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        console.log("DECODED TOKEN:", decoded);

        req.user = decoded;

        next();
    } catch (error) {
        console.error("JWT ERROR:", error);

        return res.status(401).json({
            message: "Geçersiz veya süresi dolmuş token.",
        });
    }
};

export default authMiddleware;

