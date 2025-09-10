import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Cart } from "../models/index.js";

export async function register(req, res) {
    const { nombre, email, password } = req.body;
    const exist = await User.findOne({ where: { email } });
    if (exist) return res.status(400).json({ error: "Email ya registrado" });
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ nombre, email, password: hash });
    // crear carrito
    await Cart.create({ userId: user.id });
    res.json({ msg: "Registrado", user: { id: user.id, nombre: user.nombre, email: user.email } });
    }

    export async function login(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "8h" });
    res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
}