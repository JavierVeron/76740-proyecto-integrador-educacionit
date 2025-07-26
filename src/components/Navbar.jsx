import { useContext } from "react"
import { Link } from "react-router-dom"
import { APIContext } from "./context/APIContext"

const Navbar = () => {
    //const {cantidadProductosCarrito} = useContext(APIContext);

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col">
                    <ul className="nav justify-content-center">
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-bold" to={"/catalogo"}>Catálogo</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-bold" to={"/alta"}>Alta</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-dark fw-bold" to={"/carrito"}>Carrito <span className="badge text-bg-warning">{}</span></Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar