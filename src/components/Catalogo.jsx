import Card from "./Card"
import { useDispatch, useSelector } from "react-redux";
import { AGREGAR_PRODUCTO_ACTION } from "./redux/actions/productActions";

const Catalogo = () => {
    const productos = useSelector(state => state.products);
    const dispatch = useDispatch();

    const agregarProductoCarrito = () => {
        console.log("agregar");
    }

    if (productos.length == 0) {
        return (
            <div className="container my-5">
                <div className="row">
                    <h2 className="display-6 text-center mb-3 text-danger">No hay Productos!</h2>
                </div>
            </div>
        )
    }

    return (
        <div className="container my-5">
            <div className="row">
                <h2 className="display-6 text-center mb-3">Listado de Productos</h2>
                {
                    productos.map(item => (
                        <Card key={item.id} item={item} onClick={agregarProductoCarrito} />
                ))
            }
            </div>
        </div>
    )
}

export default Catalogo