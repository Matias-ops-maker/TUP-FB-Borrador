import { Order, OrderItem, Cart, CartItem, Product, User, Category, Brand, Payment } from "../models/index.js";
import { sequelize } from "../models/index.js";
import { Op } from "sequelize";

export async function placeOrder(req, res) {
    const t = await sequelize.transaction();
    try {
        const { shipping_address, payment_method = 'tarjeta' } = req.body;

        // Obtener carrito con items
        const cart = await Cart.findOne({ 
            where: { user_id: req.user.id }, 
            include: { 
                model: CartItem, 
                include: Product 
            } 
        });

        if (!cart || !cart.CartItems || cart.CartItems.length === 0) {
            await t.rollback();
            return res.status(400).json({ error: "Carrito vacío" });
        }

        // Verificar stock disponible
        for (const item of cart.CartItems) {
            if (item.Product.stock < item.cantidad) {
                await t.rollback();
                return res.status(400).json({ 
                    error: `Stock insuficiente para ${item.Product.nombre}. Stock disponible: ${item.Product.stock}` 
                });
            }
        }

        // Calcular total
        const total = cart.CartItems.reduce((sum, item) => {
            return sum + (parseFloat(item.Product.precio) * item.cantidad);
        }, 0);

        // Crear orden
        const order = await Order.create({ 
            user_id: req.user.id, 
            total: total.toFixed(2), 
            estado: "pendiente"
        }, { transaction: t });

        // Crear items de la orden y actualizar stock
        for (const item of cart.CartItems) {
            await OrderItem.create({ 
                order_id: order.id, 
                product_id: item.product_id, 
                cantidad: item.cantidad, 
                precio_unitario: item.Product.precio 
            }, { transaction: t });

            // Actualizar stock del producto
            item.Product.stock -= item.cantidad;
            await item.Product.save({ transaction: t });
        }

        // Crear registro de pago
        await Payment.create({
            order_id: order.id,
            medio: payment_method,
            status: 'pendiente'
        }, { transaction: t });

        // Vaciar carrito
        await CartItem.destroy({ where: { cart_id: cart.id }, transaction: t });

        await t.commit();

        // Obtener orden completa para respuesta
        const completeOrder = await Order.findByPk(order.id, {
            include: [
                {
                    model: OrderItem,
                    include: {
                        model: Product,
                        attributes: ['id', 'sku', 'nombre', 'precio']
                    }
                },
                {
                    model: Payment
                }
            ]
        });

        res.status(201).json({ 
            msg: "Orden creada exitosamente", 
            order: completeOrder 
        });

    } catch (error) {
        await t.rollback();
        console.error('Error al procesar orden:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function listOrders(req, res) {
    try {
        const { 
            page = 1, 
            pageSize = 20, 
            estado, 
            userId,
            dateFrom,
            dateTo 
        } = req.query;
        
        const offset = (page - 1) * pageSize;
        
        const where = {};
        
        // Filtros admin vs usuario
        if (req.user.rol === "admin") {
            if (userId) where.user_id = userId;
        } else {
            where.user_id = req.user.id;
        }
        
        if (estado) where.estado = estado;
        if (dateFrom) where.creado_en = { ...where.creado_en, [Op.gte]: new Date(dateFrom) };
        if (dateTo) where.creado_en = { ...where.creado_en, [Op.lte]: new Date(dateTo) };

        const { rows, count } = await Order.findAndCountAll({
            where,
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: OrderItem,
                    include: {
                        model: Product,
                        attributes: ['id', 'sku', 'nombre']
                    }
                },
                {
                    model: Payment,
                    attributes: ['medio', 'status']
                }
            ],
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
        console.error('Error al listar órdenes:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getOrder(req, res) {
    try {
        const order = await Order.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['id', 'nombre', 'email']
                },
                {
                    model: OrderItem,
                    include: {
                        model: Product,
                        include: [
                            { model: Category, attributes: ['id', 'nombre'] },
                            { model: Brand, attributes: ['id', 'nombre'] }
                        ]
                    }
                },
                {
                    model: Payment
                }
            ]
        });

        if (!order) return res.status(404).json({ error: "Orden no encontrada" });

        // Verificar permisos
        if (req.user.rol !== "admin" && order.user_id !== req.user.id) {
            return res.status(403).json({ error: "No autorizado" });
        }

        res.json(order);
    } catch (error) {
        console.error('Error al obtener orden:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function updateOrderStatus(req, res) {
    try {
        const { estado } = req.body;
        const validStates = ['pendiente', 'procesando', 'enviado', 'entregado', 'cancelado'];

        if (!estado || !validStates.includes(estado)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        const order = await Order.findByPk(req.params.id);
        if (!order) return res.status(404).json({ error: "Orden no encontrada" });

        // Solo admins pueden cambiar estado
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const oldStatus = order.estado;
        order.estado = estado;
        await order.save();

        // Si se cancela la orden, restaurar stock
        if (estado === 'cancelado' && oldStatus !== 'cancelado') {
            const orderItems = await OrderItem.findAll({
                where: { order_id: order.id },
                include: Product
            });

            for (const item of orderItems) {
                item.Product.stock += item.cantidad;
                await item.Product.save();
            }
        }

        res.json({ msg: "Estado de orden actualizado", order });
    } catch (error) {
        console.error('Error al actualizar estado de orden:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function getOrderStats(req, res) {
    try {
        // Solo para admins
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const stats = await Order.findAll({
            attributes: [
                'estado',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            group: ['estado']
        });

        const totalOrders = await Order.count();
        const totalRevenue = await Order.sum('total');

        res.json({
            byStatus: stats,
            totalOrders,
            totalRevenue: totalRevenue || 0
        });
    } catch (error) {
        console.error('Error al obtener estadísticas de órdenes:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}