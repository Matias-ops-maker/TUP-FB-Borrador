import PDFDocument from "pdfkit";
import ExcelJS from "exceljs";
import { Order, OrderItem, Product } from "../models/index.js";

export async function salesPdf(req, res) {
    const orders = await Order.findAll({ include: [OrderItem] });
    const doc = new PDFDocument();
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=ventas.pdf");
    doc.text("Reporte de Ventas");
    orders.forEach(o => {
        doc.moveDown().text(`Orden ${o.id} - Usuario ${o.userId} - Total: ${o.total} - Estado: ${o.estado}`);
    });
    doc.pipe(res);
    doc.end();
    }

    export async function salesXlsx(req, res) {
    const orders = await Order.findAll({ include: [OrderItem] });
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Ventas");
    ws.addRow(["OrdenID", "UsuarioID", "Total", "Estado"]);
    orders.forEach(o => ws.addRow([o.id, o.userId, o.total, o.estado]));
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", "attachment; filename=ventas.xlsx");
    await wb.xlsx.write(res);
    res.end();
}