import { Order, OrderItem, Cart, CartItem, Product } from "../models/index.js";
import { sequelize } from "../models/index.js";

export async function placeOrder(req, res) {
    const t = await sequelize.transaction();
    try {
        const cart = await Cart.findOne({ where: { userId: req.user.id }, include: { model: CartItem, include: Product } });
        if (!cart || cart.CartItems.length === 0) return res.status(400).json({ error: "Carrito vacío" });

        const total = cart.CartItems.reduce((s, it) => s + parseFloat(it.Product.precio) * it.cantidad, 0);
        const order = await Order.create({ userId: req.user.id, total, estado: "Pagado" }, { transaction: t });

        for (const it of cart.CartItems) {
        await OrderItem.create({ orderId: order.id, productId: it.productId, cantidad: it.cantidad, precioUnit: it.Product.precio }, { transaction: t });
        // actualizar stock
        it.Product.stock = it.Product.stock - it.cantidad;
        await it.Product.save({ transaction: t });
        }
        // vaciar carrito
        await CartItem.destroy({ where: { cartId: cart.id }, transaction: t });

        await t.commit();
        res.json({ msg: "Orden realizada", orderId: order.id });
    } catch (err) {
        await t.rollback();
        console.error(err);
        res.status(500).json({ error: "Error procesando orden" });
    }
    }

    export async function listOrders(req, res) {
    if (req.user.rol === "admin") {
        const orders = await Order.findAll({ include: [OrderItem] });
        return res.json(orders);
    } else {
        const orders = await Order.findAll({ where: { userId: req.user.id }, include: [OrderItem] });
        return res.json(orders);
    }
    }

    export async function getOrder(req, res) {
    const order = await Order.findByPk(req.params.id, { include: [OrderItem] });
    if (!order) return res.status(404).json({ error: "No encontrado" });
    // check owner or admin
    if (req.user.rol !== "admin" && order.userId !== req.user.id) return res.status(403).json({ error: "No autorizado" });
    res.json(order);
}