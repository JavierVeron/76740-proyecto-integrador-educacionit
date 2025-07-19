import { createContext, useEffect, useState } from "react";
import APIClient from "../APIClient";

export const APIContext = createContext();

const APIContextProvider = ({children}) => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);
    const [actualizado, setActualizado] = useState(true);

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
            console.log("Se agregó el Producto #" + id + "!");
            setActualizado(true);
        })
        .catch(error => {
            console.log("Error! No se pudo agregar el Producto!");
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
            console.log("Se actualizó el Producto #" + id + "!");
            setActualizado(true);
        })
        .catch(error => {
            console.log("Error! No se pudo actualizar el Producto!");
        });
    }

    const eliminarProducto = async (id) => {
        await APIClient.delete("/productos/" + id)
        .then(response => {
            console.log("Se eliminó el Producto #" + id + "!");
            setActualizado(true);
        })
        .catch(error => {
            console.log("Error! No se pudo eliminar el Producto!");
        });
    }

    const agregarProductoCarrito = (id) => {
        let producto = carrito.find(item => item.id == id);

        if (producto) {
            producto.cantidad += 1;
            setCarrito([...carrito]);
        } else {
            producto = productos.find(item => item.id == id);
            producto.cantidad = 1;
            setCarrito([...carrito, producto]);
        }

        console.log("Se agregó al Carrito el Producto #" + id + "!");
    }

    const eliminarProductoCarrito = (id) => {
        const productosActualizados = carrito.filter(item => item.id != id);
        setCarrito([...productosActualizados]);
        console.log("Se eliminó del Carrito el Producto #" + id + "!");
    }

    const incrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad < producto.stock) {
            producto.cantidad += 1;
            setCarrito([...carrito]);
        }
    }

    const decrementarItem = (id) => {
        const producto = carrito.find(item => item.id == id);

        if (producto.cantidad > 1) {
            producto.cantidad -= 1;
            setCarrito([...carrito]);
        } else {
            eliminarProductoCarrito(id);
        }
    }

    const vaciarCarrito = () => {
        setCarrito([]);
        console.log("Se vació el Carrito!");
    }

    const cantidadProductosCarrito = () => {
        return carrito.reduce((acum, item) => acum += item.cantidad, 0)
    }

    const sumaProductosCarrito = () => {
        return carrito.reduce((acum, item) => acum += item.cantidad * item.precio, 0)
    }

    const agregarPedido = async (pedido) => {
        await APIClient.post("/pedidos", pedido)
        .then(response => {
            console.log("El pedido se generó correctamente!");
                        
            return response.data;
        })
        .catch(error => {
            console.log("Error! No se pudo Generar el Pedido!");
        })
    }

    return <APIContext.Provider value={{productos, agregarProducto, actualizarProducto, eliminarProducto, carrito, agregarProductoCarrito, eliminarProductoCarrito, incrementarItem, decrementarItem, vaciarCarrito, cantidadProductosCarrito, sumaProductosCarrito, agregarPedido}}>
        {children}
    </APIContext.Provider>
}

export default APIContextProvider