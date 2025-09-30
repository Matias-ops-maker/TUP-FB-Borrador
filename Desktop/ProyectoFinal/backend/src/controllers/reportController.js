import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import { Order, OrderItem, Product, User, Category, Brand } from "../models/index.js";
import { sequelize } from "../models/index.js";
import { Op } from "sequelize";

export async function salesPdf(req, res) {
    try {
        const { dateFrom, dateTo, status } = req.query;
        
        // Solo admins pueden generar reportes
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const where = {};
        if (dateFrom) where.creado_en = { ...where.creado_en, [Op.gte]: new Date(dateFrom) };
        if (dateTo) where.creado_en = { ...where.creado_en, [Op.lte]: new Date(dateTo) };
        if (status) where.estado = status;

        const orders = await Order.findAll({
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
                        attributes: ['id', 'sku', 'nombre', 'precio']
                    }
                }
            ],
            order: [['creado_en', 'DESC']]
        });

        const doc = new PDFDocument({ margin: 50 });
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=reporte-ventas.pdf");
        
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Reporte de Ventas", { align: 'center' });
        doc.moveDown();

        // Información del reporte
        doc.fontSize(12);
        if (dateFrom || dateTo) {
            const fromDate = dateFrom ? new Date(dateFrom).toLocaleDateString() : 'Inicio';
            const toDate = dateTo ? new Date(dateTo).toLocaleDateString() : 'Ahora';
            doc.text(`Período: ${fromDate} - ${toDate}`);
        }
        if (status) {
            doc.text(`Estado: ${status}`);
        }
        doc.text(`Fecha de generación: ${new Date().toLocaleString()}`);
        doc.moveDown();

        // Resumen
        const totalOrders = orders.length;
        const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
        
        doc.fontSize(14).text("Resumen:", { underline: true });
        doc.fontSize(12);
        doc.text(`Total de órdenes: ${totalOrders}`);
        doc.text(`Ingresos totales: $${totalRevenue.toFixed(2)}`);
        doc.moveDown();

        // Detalles de órdenes
        doc.fontSize(14).text("Detalle de Órdenes:", { underline: true });
        doc.fontSize(10);

        orders.forEach((order, index) => {
            if (index > 0) doc.moveDown(0.5);
            
            doc.text(`Orden #${order.id} - ${new Date(order.creado_en).toLocaleDateString()}`);
            doc.text(`Cliente: ${order.User.nombre} (${order.User.email})`);
            doc.text(`Estado: ${order.estado} | Total: $${order.total}`);
            
            // Items de la orden
            if (order.OrderItems && order.OrderItems.length > 0) {
                doc.text("Items:");
                order.OrderItems.forEach(item => {
                    doc.text(`  - ${item.Product.nombre} x${item.cantidad} @ $${item.precio_unitario} = $${(item.cantidad * parseFloat(item.precio_unitario)).toFixed(2)}`);
                });
            }
        });

        doc.end();

    } catch (error) {
        console.error('Error al generar PDF de ventas:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function salesXlsx(req, res) {
    try {
        const { dateFrom, dateTo, status } = req.query;
        
        // Solo admins pueden generar reportes
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const where = {};
        if (dateFrom) where.creado_en = { ...where.creado_en, [Op.gte]: new Date(dateFrom) };
        if (dateTo) where.creado_en = { ...where.creado_en, [Op.lte]: new Date(dateTo) };
        if (status) where.estado = status;

        const orders = await Order.findAll({
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
                        attributes: ['id', 'sku', 'nombre', 'precio']
                    }
                }
            ],
            order: [['creado_en', 'DESC']]
        });

        const workbook = new ExcelJS.Workbook();
        
        // Hoja de resumen
        const summarySheet = workbook.addWorksheet("Resumen");
        summarySheet.addRow(["Reporte de Ventas"]);
        summarySheet.addRow([]);
        summarySheet.addRow(["Período", dateFrom ? `${dateFrom} - ${dateTo || 'Ahora'}` : "Todos los períodos"]);
        summarySheet.addRow(["Estado", status || "Todos"]);
        summarySheet.addRow(["Fecha de generación", new Date().toLocaleDateString()]);
        summarySheet.addRow([]);
        summarySheet.addRow(["Total de órdenes", orders.length]);
        summarySheet.addRow(["Ingresos totales", orders.reduce((sum, order) => sum + parseFloat(order.total), 0)]);

        // Hoja de órdenes
        const ordersSheet = workbook.addWorksheet("Órdenes");
        ordersSheet.addRow([
            "ID Orden", 
            "Fecha", 
            "Cliente", 
            "Email", 
            "Estado", 
            "Total"
        ]);

        orders.forEach(order => {
            ordersSheet.addRow([
                order.id,
                new Date(order.creado_en).toLocaleDateString(),
                order.User.nombre,
                order.User.email,
                order.estado,
                parseFloat(order.total)
            ]);
        });

        // Hoja de items detallados
        const itemsSheet = workbook.addWorksheet("Items Detallados");
        itemsSheet.addRow([
            "ID Orden",
            "Fecha Orden",
            "Cliente",
            "SKU Producto",
            "Nombre Producto", 
            "Cantidad",
            "Precio Unitario",
            "Subtotal"
        ]);

        orders.forEach(order => {
            if (order.OrderItems) {
                order.OrderItems.forEach(item => {
                    itemsSheet.addRow([
                        order.id,
                        new Date(order.creado_en).toLocaleDateString(),
                        order.User.nombre,
                        item.Product.sku,
                        item.Product.nombre,
                        item.cantidad,
                        parseFloat(item.precio_unitario),
                        item.cantidad * parseFloat(item.precio_unitario)
                    ]);
                });
            }
        });

        // Configurar headers de respuesta
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=reporte-ventas.xlsx");

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error al generar Excel de ventas:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function inventoryPdf(req, res) {
    try {
        // Solo admins pueden generar reportes
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const { lowStock = false } = req.query;
        const where = lowStock === 'true' ? { stock: { [Op.lte]: 10 } } : {};

        const products = await Product.findAll({
            where,
            include: [
                { model: Category, attributes: ['nombre'] },
                { model: Brand, attributes: ['nombre'] }
            ],
            order: [['nombre', 'ASC']]
        });

        const doc = new PDFDocument({ margin: 50 });
        
        res.setHeader("Content-Type", "application/pdf");
        res.setHeader("Content-Disposition", "attachment; filename=reporte-inventario.pdf");
        
        doc.pipe(res);

        // Título
        doc.fontSize(20).text("Reporte de Inventario", { align: 'center' });
        doc.moveDown();

        // Información del reporte
        doc.fontSize(12);
        doc.text(`Tipo: ${lowStock === 'true' ? 'Productos con stock bajo' : 'Inventario completo'}`);
        doc.text(`Fecha de generación: ${new Date().toLocaleString()}`);
        doc.text(`Total de productos: ${products.length}`);
        doc.moveDown();

        // Productos
        doc.fontSize(10);
        products.forEach((product, index) => {
            if (index > 0) doc.moveDown(0.3);
            
            doc.text(`${product.sku} - ${product.nombre}`);
            doc.text(`  Categoría: ${product.Category?.nombre || 'Sin categoría'}`);
            doc.text(`  Marca: ${product.Brand?.nombre || 'Sin marca'}`);
            doc.text(`  Stock: ${product.stock} | Precio: $${product.precio} | Estado: ${product.estado}`);
        });

        doc.end();

    } catch (error) {
        console.error('Error al generar PDF de inventario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function inventoryXlsx(req, res) {
    try {
        // Solo admins pueden generar reportes
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        const { lowStock = false } = req.query;
        const where = lowStock === 'true' ? { stock: { [Op.lte]: 10 } } : {};

        const products = await Product.findAll({
            where,
            include: [
                { model: Category, attributes: ['nombre'] },
                { model: Brand, attributes: ['nombre'] }
            ],
            order: [['nombre', 'ASC']]
        });

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Inventario");

        // Headers
        worksheet.addRow([
            "SKU",
            "Nombre",
            "Descripción",
            "Categoría",
            "Marca",
            "Precio",
            "Costo",
            "Stock",
            "Estado",
            "Fecha Creación"
        ]);

        // Datos
        products.forEach(product => {
            worksheet.addRow([
                product.sku,
                product.nombre,
                product.descripcion,
                product.Category?.nombre || '',
                product.Brand?.nombre || '',
                parseFloat(product.precio),
                parseFloat(product.costo || 0),
                product.stock,
                product.estado,
                new Date(product.creado_en).toLocaleDateString()
            ]);
        });

        // Configurar headers de respuesta
        res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
        res.setHeader("Content-Disposition", "attachment; filename=reporte-inventario.xlsx");

        await workbook.xlsx.write(res);
        res.end();

    } catch (error) {
        console.error('Error al generar Excel de inventario:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export async function dashboardStats(req, res) {
    try {
        // Solo admins pueden ver estadísticas
        if (req.user.rol !== "admin") {
            return res.status(403).json({ error: "No autorizado" });
        }

        // Estadísticas de órdenes
        const totalOrders = await Order.count();
        const totalRevenue = await Order.sum('total') || 0;
        const pendingOrders = await Order.count({ where: { estado: 'pendiente' } });

        // Estadísticas de productos
        const totalProducts = await Product.count();
        const lowStockProducts = await Product.count({ where: { stock: { [Op.lte]: 10 } } });
        const outOfStockProducts = await Product.count({ where: { stock: 0 } });

        // Estadísticas de usuarios
        const totalUsers = await User.count();
        const newUsersThisMonth = await User.count({
            where: {
                creado_en: {
                    [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
                }
            }
        });

        // Ventas por estado
        const ordersByStatus = await Order.findAll({
            attributes: [
                'estado',
                [sequelize.fn('COUNT', sequelize.col('id')), 'count'],
                [sequelize.fn('SUM', sequelize.col('total')), 'total']
            ],
            group: ['estado']
        });

        // Top productos más vendidos
        const topProducts = await OrderItem.findAll({
            attributes: [
                'product_id',
                [sequelize.fn('SUM', sequelize.col('cantidad')), 'total_sold'],
                [sequelize.fn('SUM', sequelize.literal('cantidad * precio_unitario')), 'total_revenue']
            ],
            include: [{
                model: Product,
                attributes: ['sku', 'nombre']
            }],
            group: ['product_id'],
            order: [[sequelize.literal('total_sold'), 'DESC']],
            limit: 10
        });

        res.json({
            orders: {
                total: totalOrders,
                pending: pendingOrders,
                revenue: totalRevenue,
                byStatus: ordersByStatus
            },
            products: {
                total: totalProducts,
                lowStock: lowStockProducts,
                outOfStock: outOfStockProducts,
                topSelling: topProducts
            },
            users: {
                total: totalUsers,
                newThisMonth: newUsersThisMonth
            }
        });

    } catch (error) {
        console.error('Error al obtener estadísticas del dashboard:', error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}