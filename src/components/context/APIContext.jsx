import { createContext, useEffect, useState } from "react";
import APIClient from "../APIClient";

export const APIContext = createContext();

const APIContextProvider = ({children}) => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [actualizado, setActualizado] = useState(true);
    const [mensaje, setMensaje] = useState("");
    const [tipoMensaje, setTipoMensaje] = useState("");
    const [idProducto, setIdProducto] = useState(0);

    useEffect(() => {
        if (actualizado) {
            (async () => {
                const response = await APIClient.get("/productos");
                setProductos(response.data);
                setActualizado(false);
            })();
        }
    }, [actualizado])

    const generarId = () => {
        return productos.length + 1;
    }

    const agregarProducto = async ({nombre, precio, stock, marca, categoria, detalles, foto, envio}) => {
        const id = generarId();
        const nuevoProducto = {id, nombre, precio, stock, marca, categoria, detalles, foto, envio};
        await APIClient.post("/productos", nuevoProducto)
        .then(response => {
            mostrarToast("Se agregó el Producto #" + id + "!", "ok");
            setActualizado(true);
        })
        .catch(error => {
            mostrarToast("Error! No se pudo agregar el Producto!", "error");
        }); 
    }

    const actualizarProducto = async (id, {nombre, precio, stock, marca, categoria, detalles, foto, envio}) => {
        const producto = productos.find(item => item.id == id);
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.marca = marca;
        producto.categoria = categoria;
        producto.detalles = detalles;
        producto.foto = foto;
        producto.envio = envio;
        await APIClient.put("/productos/" + id, producto)
        .then(response => {
            mostrarToast("Se actualizó el Producto #" + id + "!", "ok");
            setActualizado(true);
        })
        .catch(error => {
            mostrarToast("Error! No se pudo actualizar el Producto!", "error");
        });
    }

    const eliminarProducto = async (id) => {
        ocultarModal();
        await APIClient.delete("/productos/" + id)
        .then(response => {
            mostrarToast("Se eliminó el Producto #" + id + "!", "ok");
            setActualizado(true);
        })
        .catch(error => {
            mostrarToast("Error! No se pudo eliminar el Producto!", "error");
        });
    }

    const agregarProductoCarrito = (id) => {
        let producto = carrito.find(item => item.id == id);

        if (producto) {
            producto.cantidad += 1;
            setCarrito([...carrito]);
            mostrarToast("Se agregó al Carrito el Producto #" + id + "!", "warning");
        } else {
            producto = productos.find(item => item.id == id);
            producto.cantidad = 1;
            setCarrito([...carrito, producto]);
            mostrarToast("Se agregó al Carrito el Producto #" + id + "!", "ok");
        }
    }

    const eliminarProductoCarrito = (id) => {
        const productosActualizados = carrito.filter(item => item.id != id);
        setCarrito([...productosActualizados]);
        mostrarToast("Se eliminó del Carrito el Producto #" + id + "!", "ok");
    }

    const incrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad < producto.stock) {
            producto.cantidad += 1;
            setCarrito([...carrito]);
        }

        mostrarToast("Se incrementó la cantidad del Producto #" + id + "!", "warning");
    }

    const decrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            setCarrito([...carrito]);
        } else {
            eliminarProductoCarrito(id);
        }

        mostrarToast("Se decrementó la cantidad del Producto #" + id + "!", "warning");
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        mostrarToast("Se vació el Carrito!", "error");
    }

    const cantidadProductosCarrito = () => {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0)
    }

    const sumaProductosCarrito = () => {
        return carrito.reduce((acum, item) => acum += item.cantidad * item.precio, 0)
    }

    const agregarPedido = async (pedido) => {
        const response = await APIClient.post("/pedidos", pedido);
        mostrarToast("El pedido se generó correctamente!", "ok");

        return response.data;
    }

    const mostrarToast = (message, typeMessage) => {
        setMensaje(message);
        setTipoMensaje(typeMessage == "error" ? "bg-danger" : typeMessage == "warning" ? "bg-warning" : "bg-success");
        const toastLive = document.getElementById('liveToast');
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLive);
        toastBootstrap.show();
    }

    const mostrarModal = (message, id) => {
        setMensaje(message);
        setIdProducto(id);

        const liveModal = new bootstrap.Modal('#liveModal', {});
        liveModal.show();
    }

    const ocultarModal = () => {
        const liveModal = new bootstrap.Modal('#liveModal', {});
        liveModal.hide();
    }

    return <APIContext.Provider value={{productos, agregarProducto, actualizarProducto, eliminarProducto, carrito, agregarProductoCarrito, eliminarProductoCarrito, incrementarItem, decrementarItem, vaciarCarrito, cantidadProductosCarrito, sumaProductosCarrito, agregarPedido, setActualizado, mostrarToast, mostrarModal}}>
        <div className="toast-container position-fixed top-0 end-0 p-3">
            <div id="liveToast" className="toast" role="alert" aria-live="assertive" aria-atomic="true">
                <div className={`toast-header text-white ${tipoMensaje}`}>
                    <img src="https://www.amazon.com/favicon.ico" alt="favicon" width={16} />
                    <strong className="me-auto mx-1">Amazon</strong>
                    <small>ahora</small>
                    <button type="button" className="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
                </div>
                <div className="toast-body">
                    {mensaje}
                </div>
            </div>
        </div>

        <div className="modal fade" id="liveModal" tabIndex="-1" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Amazon</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        {mensaje}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={() => {eliminarProducto(idProducto)}}>Aceptar</button>
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    </div>
                </div>
            </div>
        </div>

        {children}
    </APIContext.Provider>
}

export default APIContextProvider