import "../../styles/usuario.css";
export default function Catalogo() {
  return (
    <div className="page">
      <h1>📦 Catálogo de Repuestos</h1>
      <p>Aquí podrás filtrar y ver todas las partes disponibles.</p>

      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Buscar por nombre o marca"
          style={{
            flex: 1,
            padding: "0.5rem 1rem",
            borderRadius: "0.5rem",
            border: "1px solid #e5e7eb",
            outline: "none",
          }}
        />
        <select style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}>
          <option value="">Estado</option>
          <option value="nuevo">Nuevo</option>
          <option value="usado">Usado</option>
        </select>
        <select style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #e5e7eb" }}>
          <option value="">Categoría</option>
          <option value="motor">Motor</option>
          <option value="frenos">Frenos</option>
          <option value="suspension">Suspensión</option>
        </select>
      </div>

      {/* Grid de productos */}
      <div className=" ">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((p) => (
          <div key={p} className="card">
            <div className=" "></div>
            <h3>Parte {p}</h3>
            <p>Marca / Modelo</p>
            <span>$120</span>
          </div>
        ))}
      </div>
    </div>
  )
}
