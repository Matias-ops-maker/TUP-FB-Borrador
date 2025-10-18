// Versión de diagnóstico extremadamente simple
export default function HomeFinalSimple() {
    return (
        <div>
            <h1>PAGINA DE INICIO FUNCIONANDO</h1>
            <p>Si ves esto, React está funcionando correctamente</p>
            <p>Fecha: {new Date().toString()}</p>
            <div style={{backgroundColor: 'red', color: 'white', padding: '10px'}}>
                ESTE TEXTO DEBE SER VISIBLE
            </div>
        </div>
    )
}
