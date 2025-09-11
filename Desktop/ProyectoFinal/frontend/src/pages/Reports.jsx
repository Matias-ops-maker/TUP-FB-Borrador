import React from "react";

export default function Reports() {
    const API_KEY = "mi_api_key_super_secreta"; // reemplazá por tu API_KEY real

    const downloadFile = async (type) => {
        try {
        const res = await fetch(`http://localhost:4000/api/reports/sales/${type}`, {
            headers: { "x-api-key": API_KEY },
        });

        if (!res.ok) {
            console.error("Error en la descarga:", res.status, res.statusText);
            alert("Error al descargar archivo");
            return;
        }

        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `ventas.${type === "pdf" ? "pdf" : "xlsx"}`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        } catch (error) {
        console.error("Error en fetch:", error);
        alert("No se pudo descargar el archivo");
        }
    };

    return (
        <div>
        <h1>Reportes de Ventas</h1>
        <p>Aquí vas a poder descargar los reportes:</p>
        <button onClick={() => downloadFile("pdf")}>Descargar PDF</button>
        <button onClick={() => downloadFile("xlsx")}>Descargar Excel</button>
        </div>
    );
}