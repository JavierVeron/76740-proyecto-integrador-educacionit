import { AGREGAR_PRODUCTO, EDITAR_PRODUCTO, ELIMINAR_PRODUCTO } from "../types/productTypes";

export const AGREGAR_PRODUCTO_ACTION = (producto) => ({type:AGREGAR_PRODUCTO, payload:producto}); 
export const EDITAR_PRODUCTO_ACTION = (id, producto) => ({type:EDITAR_PRODUCTO, payload:{id, producto}}); 
export const ELIMINAR_PRODUCTO_ACTION = (id) => ({type:ELIMINAR_PRODUCTO, payload:id});