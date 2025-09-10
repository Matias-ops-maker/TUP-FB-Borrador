import { Cart, CartItem, Product } from "../models/index.js";

export async function getCart(req, res) {
    const cart = await Cart.findOne({
        where: { userId: req.user.id },
        include: { model: CartItem, include: Product }
    });
    if (!cart) return res.json({ items: [] });
    res.json(cart);
    }

    export async function addToCart(req, res) {
    const { productId, cantidad = 1 } = req.body;
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const prod = await Product.findByPk(productId);
    if (!prod) return res.status(404).json({ error: "Producto no existe" });
    let item = await CartItem.findOne({ where: { cartId: cart.id, productId } });
    if (item) {
        item.cantidad += cantidad;
        await item.save();
    } else {
        item = await CartItem.create({ cartId: cart.id, productId, cantidad });
    }
    res.json(item);
    }

    export async function updateCartItem(req, res) {
    const { id } = req.params; // cartItem id
    const { cantidad } = req.body;
    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item no existe" });
    item.cantidad = cantidad;
    await item.save();
    res.json(item);
    }

    export async function removeCartItem(req, res) {
    const { id } = req.params;
    const item = await CartItem.findByPk(id);
    if (!item) return res.status(404).json({ error: "Item no existe" });
    await item.destroy();
    res.json({ msg: "Eliminado" });
}