import { AGREGAR_PRODUCTO, EDITAR_PRODUCTO, ELIMINAR_PRODUCTO } from "../types/productTypes";
import APIClient from "../../APIClient";
import productosJSON from "../../../assets/productos.json";

export const productsReducer = (state = productosJSON, action) => {    
    switch(action.type) {
        case AGREGAR_PRODUCTO:
            const id = state.length + 1;
            const nuevoProducto = {id:id, ...action.payload};

            return [
                ...state,
                nuevoProducto
            ]
        case EDITAR_PRODUCTO:
            const producto = state.find(item => item.id == action.payload.id);
            producto.nombre = action.payload.producto.nombre;
            producto.precio = action.payload.producto.precio;
            producto.stock = action.payload.producto.stock;
            producto.marca = action.payload.producto.marca;
            producto.categoria = action.payload.producto.categoria;
            producto.detalles = action.payload.producto.detalles;
            producto.foto = action.payload.producto.foto;
            producto.envio = action.payload.producto.envio;

            return [
                ...state
            ]
        case ELIMINAR_PRODUCTO:
            break;
        default:
            return state
    }
}