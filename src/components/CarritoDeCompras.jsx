import { useContext } from "react"
import { APIContext } from "./context/APIContext"

const CarritoDeCompras = () => {
    const {carrito, eliminarProductoCarrito, incrementarItem, decrementarItem, vaciarCarrito, cantidadProductosCarrito, sumaProductosCarrito} = useContext(APIContext);

    if (cantidadProductosCarrito() == 0) {
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
                        <tr>
                            <td colSpan={8} className="text-end">
                                <button className="btn btn-dark text-white btn-sm" onClick={vaciarCarrito}>Vaciar Carrito</button>
                            </td>
                        </tr>
                        {
                            carrito.map(item => (
                                <tr key={item.id}>
                                    <td><img src={item.foto} alt={item.nombre} width={64} /></td>
                                    <td className="align-middle">{item.nombre}</td>
                                    <td className="align-middle">${item.precio}</td>
                                    <td className="align-middle">
                                        <button className="btn btn-dark text-white btn-sm" onClick={() => {decrementarItem(item.id)}}>-</button> x{item.cantidad} <button className="btn btn-dark text-white btn-sm" onClick={() => {incrementarItem(item.id)}}>+</button>
                                    </td>
                                    <td className="align-middle">${item.cantidad * item.precio}</td>
                                    <td className="align-middle text-end">
                                        <button className="btn btn-dark text-white btn-sm" onClick={() => {eliminarProductoCarrito(item.id)}}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                        <tr>
                            <td colSpan={4} className="text-center"><b>Total a Pagar</b></td>
                            <td>${sumaProductosCarrito().toFixed(2)}</td>
                            <td colSpan={3}>&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default CarritoDeCompras