import productos from "../assets/productos.json"
import { useState } from "react"

const Alta = () => {
    const [items, setItems] = useState(productos);
    const [nombre, setNombre] = useState("Timbre Ring con batería");
    const [precio, setPrecio] = useState(109.98);
    const [stock, setStock] = useState(8);
    const [marca, setMarca] = useState("Ring");
    const [categoria, setCategoria] = useState("timbres");
    const [detalles, setDetalles] = useState("Obtén un 66% más de cobertura vertical con la versión más reciente del Timbre con cámara Ring (2.ª generación) de superventas que ahora incluye video de cuerpo completo.");
    const [foto, setFoto] = useState("https://m.media-amazon.com/images/I/51WbH+NMfVL._SY450_.jpg");
    const [envio, setEnvio] = useState(false);
    const [edicion, setEdicion] = useState(false);
    const [idProducto, setIdProducto] = useState(0);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (edicion) {
            const producto = items.find(item => item.id == idProducto);
            producto.nombre = nombre;
            producto.precio = precio;
            producto.stock = stock;
            producto.marca = marca;
            producto.categoria = categoria;
            producto.detalles = detalles;
            producto.foto = foto;
            producto.envio = envio;
            setItems([...items]);
            console.log("Se actualizó el Producto #" + idProducto + "!");
        } else {
            const id = productos.length + 1;
            setEnvio(envio ? true : false);
            const nuevoProducto = {id, nombre, precio, stock, marca, categoria, detalles, foto, envio};
            console.log(nuevoProducto);
            setItems([...items, nuevoProducto]);
            console.log("Se agregó el Producto #" + id + "!");
        }

        vaciarCampos();
    }

    const actualizarCampos = (item) => {
        setNombre(item.nombre);
        setPrecio(item.precio);
        setStock(item.stock);
        setMarca(item.marca);
        setCategoria(item.categoria);
        setDetalles(item.detalles);
        setFoto(item.foto);
        setEnvio(item.envio);
    }

    const vaciarCampos = () => {
        setNombre("");
        setPrecio("");
        setStock("");
        setMarca("");
        setCategoria("");
        setDetalles("");
        setFoto("");
        setEnvio("");
    }

    const actualizarProducto = (id) => {
        setEdicion(true);
        setIdProducto(id);
        const producto = items.find(item => item.id == id);        
        actualizarCampos(producto);
    }

    const cancelarEdicion = () => {
        setEdicion(false);
        setIdProducto(0);
        vaciarCampos();
    }

    const eliminarProducto = (id) => {
        const producto = items.find(item => item.id == id);
        const confirmar = confirm("Desea eliminar el producto:\n\n" + producto.nombre)

        if (confirmar) {
           const productosActualizados = items.filter(item => item.id != id);
           setItems([...productosActualizados]);
           console.log("Se eliminó el Producto #" + id + "!");
        }
    }

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <h2 className="display-6 text-center mb-3">Alta</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Nombre</label>
                            <input type="text" className="form-control" value={nombre} onInput={(e) => {setNombre(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Precio</label>
                            <input type="text" className="form-control" value={precio} onInput={(e) => {setPrecio(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stock</label>
                            <input type="text" className="form-control" value={stock} onInput={(e) => {setStock(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Marca</label>
                            <input type="text" className="form-control" value={marca} onInput={(e) => {setMarca(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Categoría</label>
                            <input type="text" className="form-control" value={categoria} onInput={(e) => {setCategoria(e.target.value)}} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Detalles</label>
                            <textarea className="form-control" value={detalles} onInput={(e) => {setDetalles(e.target.value)}}></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Foto</label>
                            <textarea className="form-control" value={foto} onInput={(e) => {setFoto(e.target.value)}}></textarea>
                        </div>
                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value={envio} checked={envio ? "checekd" : ""} onChange={(e) => {setEnvio(e.target.value)}} />
                            <label className="form-check-label">Envío Gratis</label>
                        </div>
                        <button type="submit" className="btn btn-primary">{edicion ? "Actualizar" : "Guardar"}</button>
                        {edicion ? <button type="button" className="btn btn-primary ms-2" onClick={cancelarEdicion}>Cancelar</button> : ""}
                    </form>
                </div>
            </div>
            <div className="row my-5">
                <div className="col">
                    {items.length > 0 ? <table className="table">
                    <tbody>
                    {
                        items.map(item => (
                            <tr key={item.id} className={item.id == idProducto ? "table-active" : ""}>
                                <td><img src={item.foto} alt={item.nombre} width={64} /></td>
                                <td className="align-middle">{item.nombre}</td>
                                <td className="align-middle">${item.precio}</td>
                                <td className="align-middle">{item.marca}</td>
                                <td className="align-middle">{item.categoria}</td>
                                <td className="align-middle">1</td>
                                <td className="align-middle text-end"><button className="btn btn-dark text-white btn-sm" onClick={() => {actualizarProducto(item.id)}}>Editar</button><button className={`btn btn-dark text-white btn-sm ms-2 ${edicion ? "disabled" : ""}`} onClick={() => {eliminarProducto(item.id)}}>Eliminar</button></td>
                            </tr>
                        ))
                    }
                    </tbody>
                </table> : <h2 className="display-6 text-center mb-3 text-danger">No hay Productos!</h2>}
                </div>
            </div>
        </div>
    )
}

export default Alta