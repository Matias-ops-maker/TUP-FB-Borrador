import { User, Order } from "../models/index.js";
import { Op } from "sequelize";
import bcrypt from "bcrypt";

export async function listUsers(req, res) {
    try {
        // Solo admins pueden listar usuarios
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const { 
            page = 1, 
            pageSize = 20, 
            q, 
            rol 
        } = req.query;
        
        const offset = (page - 1) * pageSize;
        
        const where = {};
        if (q) {
            where[Op.or] = [
                { nombre: { [Op.like]: `%${q}%` } },
                { email: { [Op.like]: `%${q}%` } }
            ];
        }
        if (rol) where.rol = rol;

        const { rows, count } = await User.findAndCountAll({
            where,
            attributes: ['id', 'nombre', 'email', 'rol', 'creado_en'],
            order: [['creado_en', 'DESC']],
            offset: parseInt(offset),
            limit: parseInt(pageSize),
        });

        res.json({
            data: rows,
            pagination: {
                page: +page,
                pageSize: +pageSize,
                total: count,
                totalPages: Math.ceil(count / pageSize)
            }
        });

    } catch (error) {
        console.error('Error al listar usuarios:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getUser(req, res) {
    try {
        const { id } = req.params;

        // Solo admins pueden ver otros usuarios, o el propio usuario
        if (req.user.rol !== "admin" && req.user.id != id) {
            return res.status(403).json({ error: "No autorizado" });
        }

        const user = await User.findByPk(id, {
            attributes: ['id', 'nombre', 'email', 'rol', 'creado_en'],
            include: req.user.rol === "admin" ? [
                {
                    model: Order,
                    attributes: ['id', 'total', 'estado', 'creado_en'],
                    limit: 5,
                    order: [['creado_en', 'DESC']]
                }
            ] : []
        });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function createUser(req, res) {
    try {
        // Solo admins pueden crear usuarios
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const { nombre, email, password, rol = 'user' } = req.body;

        // Validación básica
        if (!nombre || !email || !password) {
            return res.status(400).json({ error: "Todos los campos son requeridos" });
        }

        // Verificar si el email ya existe
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        // Hash de la contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            nombre,
            email,
            password: hashedPassword,
            rol
        });

        res.status(201).json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            creado_en: user.creado_en
        });

    } catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const { nombre, email, rol } = req.body;

        // Solo admins pueden actualizar otros usuarios, o el propio usuario (limitado)
        if (req.user.rol !== "admin" && req.user.id != id) {
            return res.status(403).json({ error: "No autorizado" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar si el nuevo email ya existe (si se está cambiando)
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ where: { email } });
            if (existingUser) {
                return res.status(400).json({ error: "El email ya está en uso" });
            }
        }

        // Solo admins pueden cambiar el rol
        const updateData = { nombre, email };
        if (req.user.rol === "admin" && rol) {
            updateData.rol = rol;
        }

        await user.update(updateData);

        res.json({
            id: user.id,
            nombre: user.nombre,
            email: user.email,
            rol: user.rol,
            creado_en: user.creado_en
        });

    } catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function deleteUser(req, res) {
    try {
        const { id } = req.params;

        // Solo admins pueden eliminar usuarios
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        // No permitir eliminar el propio usuario
        if (req.user.id == id) {
            return res.status(400).json({ error: "No puedes eliminar tu propio usuario" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Verificar si el usuario tiene órdenes
        const orderCount = await Order.count({ where: { user_id: id } });
        if (orderCount > 0) {
            return res.status(400).json({ 
                error: "No se puede eliminar el usuario porque tiene órdenes asociadas" 
            });
        }

        await user.destroy();
        res.json({ msg: "Usuario eliminado exitosamente" });

    } catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function resetUserPassword(req, res) {
    try {
        const { id } = req.params;
        const { newPassword } = req.body;

        // Solo admins pueden resetear contraseñas
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        if (!newPassword) {
            return res.status(400).json({ error: "Nueva contraseña es requerida" });
        }

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Hash de la nueva contraseña
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ msg: "Contraseña restablecida exitosamente" });

    } catch (error) {
        console.error('Error al restablecer contraseña:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}