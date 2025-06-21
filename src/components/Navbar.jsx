import { Link } from "react-router-dom"

const Navbar = () => {
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
                            <Link className="nav-link text-dark fw-bold" to={"/carrito"}>Carrito</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar