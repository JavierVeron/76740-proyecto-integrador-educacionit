import productos from "../assets/productos.json"

const CarritoDeCompras = () => {
    const producto1 = productos.find(item => item.id == 1);
    const producto2 = productos.find(item => item.id == 2);
    const carrito = [producto1, producto2];
    //const carrito = [];

    if (carrito.length == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="display-6 text-center mb-3 text-danger">Carrito vacío!</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <h2 className="display-6 text-center mb-3">Carrito de Compras</h2>
                <table className="table">
                    <tbody>
                    {
                        carrito.map(item => (
                            <tr key={item.id}>
                                <td><img src={item.foto} alt={item.nombre} width={64} /></td>
                                <td className="align-middle">{item.nombre}</td>
                                <td className="align-middle">${item.precio}</td>
                                <td className="align-middle">{item.marca}</td>
                                <td className="align-middle">{item.categoria}</td>
                                <td className="align-middle">1</td>
                                <td className="align-middle text-end"><button className="btn btn-dark text-white btn-sm">Eliminar</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CarritoDeCompras