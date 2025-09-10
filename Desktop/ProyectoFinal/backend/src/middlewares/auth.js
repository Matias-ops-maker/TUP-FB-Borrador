import jwt from "jsonwebtoken";
import { User } from "../models/index.js";

export async function authMiddleware(req, res, next) {
    const header = req.header("authorization");
    if (!header) return res.status(401).json({ error: "No token" });
    const token = header.replace("Bearer ", "");
    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findByPk(payload.id);
        if (!user) return res.status(401).json({ error: "Usuario no encontrado" });
        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({ error: "Token inválido" });
    }
}