import { Category } from "../models/index.js";
export async function listCategories(req, res) {
    const cats = await Category.findAll();
    res.json(cats);
    }
    export async function createCategory(req, res) {
    const { nombre } = req.body;
    const c = await Category.create({ nombre });
    res.json(c);
    }
    export async function updateCategory(req, res) {
    const c = await Category.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "No encontrado" });
    await c.update(req.body);
    res.json(c);
    }
    export async function deleteCategory(req, res) {
    const c = await Category.findByPk(req.params.id);
    if (!c) return res.status(404).json({ error: "No encontrado" });
    await c.destroy();
    res.json({ msg: "Eliminada" });
}