import { Product, Category } from "../models/index.js";
import { Op } from "sequelize";

export async function listProducts(req, res) {
    const { page = 1, pageSize = 12, q, categoryId, inStock } = req.query;
    const offset = (page - 1) * pageSize;

    const filtros = {};
    if (q) filtros.nombre = { [Op.like]: `%${q}%` };
    if (categoryId) filtros.categoryId = categoryId;
    if (inStock === "true") filtros.stock = { [Op.gt]: 0 };

    const { rows, count } = await Product.findAndCountAll({
        where: filtros,
        include: Category,
        offset: parseInt(offset),
        limit: parseInt(pageSize),
    });

    res.json({ data: rows, pagination: { page: +page, pageSize: +pageSize, total: count } });
    }

    export async function getProduct(req, res) {
    const prod = await Product.findByPk(req.params.id, { include: Category });
    if (!prod) return res.status(404).json({ error: "No encontrado" });
    res.json(prod);
    }

    export async function createProduct(req, res) {
    const { nombre, descripcion, precio, stock, categoryId, imageUrl } = req.body;
    const prod = await Product.create({ nombre, descripcion, precio, stock, categoryId, imageUrl });
    res.json(prod);
    }

    export async function updateProduct(req, res) {
    const prod = await Product.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ error: "No encontrado" });
    await prod.update(req.body);
    res.json(prod);
    }

    export async function deleteProduct(req, res) {
    const prod = await Product.findByPk(req.params.id);
    if (!prod) return res.status(404).json({ error: "No encontrado" });
    await prod.destroy();
    res.json({ msg: "Eliminado" });
}