import { useContext, useEffect, useState } from "react";
import { APIContext } from "./context/APIContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const {carrito, cantidadProductosCarrito, sumaProductosCarrito, agregarPedido, vaciarCarrito} = useContext(APIContext);
    const [nombre, setNombre] = useState("");
    const [nombreError, setNombreError] = useState("");
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState("");
    const [telefono, setTelefono] = useState("");
    const [telefonoError, setTelefonoError] = useState("");
    const [pedidoId, setPedidoId] = useState(0);
    const navigate = useNavigate();

    if (cantidadProductosCarrito() == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="display-6 text-center mb-3 text-danger">Carrito vacío!</h2>
                </div>
            </div>
        )
    }

    const generarPedido = async () => {
        if (nombre == "") {
            setNombreError("Complete el campo Nombre!");
            return false;
        } else {
            setNombreError("");
        }

        if (email == "") {
            setEmailError("Complete el campo Email!");
            return false;
        } else {
            setEmailError("");
        }

        if (telefono == "") {
            setTelefonoError("Complete el campo Teléfono!");
            return false;
        } else {
            setTelefonoError("");
        }

        const comprador = {nombre, email, telefono};
        const items = carrito.map(item => ({id:item.id, nombre:item.nombre, precio:item.precio, cantidad:item.cantidad}));
        const fecha = new Date();
        const fechActual = `${fecha.getDate()}-${fecha.getMonth()+1}-${fecha.getFullYear()} ${fecha.getHours()}:${fecha.getMinutes()}:${fecha.getSeconds()}`; //DD-MM-AAAA HH:MM:SS
        const total = sumaProductosCarrito();
        const pedido = {comprador, items, fechActual, total};
        await agregarPedido(pedido)
        .then(data => {            
            setPedidoId(data.id);
        });
    }

    useEffect(() => {        
        if (pedidoId) {
            vaciarCarrito();
            navigate("/thankyou/" + pedidoId, {replace:true});
        }
    }, [pedidoId])

    return (
        <>
            <div className="container my-5">
                <div className="row">
                    <h2 className="display-6 text-center mb-3">Checkout</h2>
                    <div className="col">
                        <form>
                            <div className="mb-3">
                                <label className="form-label">Nombre</label>
                                <input type="text" className="form-control" value={nombre} onInput={(e) => {setNombre(e.target.value)}} />
                                <div className="form-text text-danger">{nombreError}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email</label>
                                <input type="text" className="form-control" value={email} onInput={(e) => {setEmail(e.target.value)}} />
                                <div className="form-text text-danger">{emailError}</div>
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Teléfono</label>
                                <input type="text" className="form-control" value={telefono} onInput={(e) => {setTelefono(e.target.value)}} />
                                <div className="form-text text-danger">{telefonoError}</div>
                            </div>
                            <button type="button" className="btn btn-warning rounded-pill fw-bold px-3" style={{fontSize:"12px"}} onClick={generarPedido}>Generar Pedido</button>
                        </form>
                    </div>
                    <div className="col">
                        <table className="table">
                            <tbody>
                                {
                                    carrito.map(item => (
                                        <tr key={item.id}>
                                            <td><img src={item.foto} alt={item.nombre} width={64} /></td>
                                            <td className="align-middle">{item.nombre}</td>
                                            <td className="align-middle">${item.precio}</td>
                                            <td className="align-middle">x{item.cantidad}</td>
                                            <td className="align-middle">${(item.cantidad * item.precio).toFixed(2)}</td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td colSpan={4} className="text-center"><b>Total a Pagar</b></td>
                                    <td>${sumaProductosCarrito().toFixed(2)}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Checkout