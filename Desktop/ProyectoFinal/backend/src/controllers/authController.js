import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User, Cart } from "../models/index.js";

export async function register(req, res) {
    try {
        const { nombre, email, password, rol = 'user' } = req.body;
        
        // Validación básica
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }
        
        // Verificar si el email ya existe
        const exist = await User.findOne({ where: { email } });
        if (exist) return res.status(400).json({ error: "Email ya registrado" });
        
        // Hash de la contraseña
        const hash = await bcrypt.hash(password, 10);
        
        // Crear usuario
        const user = await User.create({ nombre, email, password: hash, rol });
        
        // Crear carrito para el usuario
        await Cart.create({ user_id: user.id });
        
        res.status(201).json({ 
            msg: "Usuario registrado exitosamente", 
            user: { 
                id: user.id, 
                nombre: user.nombre, 
                email: user.email, 
                rol: user.rol 
            } 
        });
    } catch (error) {
        console.error('Error en registro:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        
        // Validación básica
        if (!email || !password) {
            return res.status(400).json({ error: "Email y contraseña son requeridos" });
        }
        
        // Buscar usuario
        const user = await User.findOne({ where: { email } });
        if (!user) return res.status(401).json({ error: "Credenciales inválidas" });
        
        // Verificar contraseña
        const ok = await bcrypt.compare(password, user.password);
        if (!ok) return res.status(401).json({ error: "Credenciales inválidas" });
        
        // Generar token
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol }, 
            process.env.JWT_SECRET, 
            { expiresIn: "8h" }
        );
        
        res.json({ 
            token, 
            user: { 
                id: user.id, 
                nombre: user.nombre, 
                email: user.email, 
                rol: user.rol 
            } 
        });
    } catch (error) {
        console.error('Error en login:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getProfile(req, res) {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: ['id', 'nombre', 'email', 'rol', 'creado_en']
        });
        
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        res.json({ user });
    } catch (error) {
        console.error('Error al obtener perfil:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function updateProfile(req, res) {
    try {
        const { nombre, email } = req.body;
        const userId = req.user.id;
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        // Verificar si el nuevo email ya existe (si se está cambiando)
        if (email && email !== user.email) {
            const emailExists = await User.findOne({ where: { email } });
            if (emailExists) {
                return res.status(400).json({ error: "El email ya está en uso" });
            }
        }
        
        // Actualizar campos
        if (nombre) user.nombre = nombre;
        if (email) user.email = email;
        
        await user.save();
        
        res.json({ 
            msg: "Perfil actualizado exitosamente",
            user: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });
    } catch (error) {
        console.error('Error al actualizar perfil:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function changePassword(req, res) {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;
        
        if (!currentPassword || !newPassword) {
            return res.status(400).json({ error: "Contraseña actual y nueva son requeridas" });
        }
        
        const user = await User.findByPk(userId);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }
        
        // Verificar contraseña actual
        const isValidPassword = await bcrypt.compare(currentPassword, user.password);
        if (!isValidPassword) {
            return res.status(400).json({ error: "Contraseña actual incorrecta" });
        }
        
        // Hash de la nueva contraseña
        const hash = await bcrypt.hash(newPassword, 10);
        user.password = hash;
        await user.save();
        
        res.json({ msg: "Contraseña actualizada exitosamente" });
    } catch (error) {
        console.error('Error al cambiar contraseña:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}