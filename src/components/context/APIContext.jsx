import { createContext, useEffect, useState } from "react";
import productosJSON from "../../assets/productos.json";

export const APIContext = createContext();

const APIContextProvider = ({children}) => {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState([]);

    useEffect(() => {
        setProductos(productosJSON)
    }, [])

    const generarId = () => {
        return productos.length + 1;
    }

    const agregarProducto = ({nombre, precio, stock, marca, categoria, detalles, foto, envio}) => {
        const id = generarId();
        const nuevoProducto = {id, nombre, precio, stock, marca, categoria, detalles, foto, envio};
        setProductos([...productos, nuevoProducto]);
        console.log("Se agregó el Producto #" + id + "!");
    }

    const actualizarProducto = (id, {nombre, precio, stock, marca, categoria, detalles, foto, envio}) => {
        const producto = productos.find(item => item.id == id);
        producto.nombre = nombre;
        producto.precio = precio;
        producto.stock = stock;
        producto.marca = marca;
        producto.categoria = categoria;
        producto.detalles = detalles;
        producto.foto = foto;
        producto.envio = envio;
        setProductos([...productos]);
        console.log("Se actualizó el Producto #" + id + "!");
    }

    const eliminarProducto = (id) => {
        const productosActualizados = productos.filter(item => item.id != id);
        setProductos([...productosActualizados]);
        console.log("Se eliminó el Producto #" + id + "!");
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

    return <APIContext.Provider value={{productos, agregarProducto, actualizarProducto, eliminarProducto, carrito, agregarProductoCarrito, eliminarProductoCarrito, vaciarCarrito, cantidadProductosCarrito, sumaProductosCarrito}}>
        {children}
    </APIContext.Provider>
}

export default APIContextProvider