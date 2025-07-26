import { Link, useParams } from "react-router-dom"

const ThankYou = () => {
    const {id} = useParams();

    return (
        <div className="container my-5">
            <div className="row">
                <div className="col text-center">
                    <h1>Gracias por tu Compra!</h1>
                    <h3>Tu Número de Compra es: <span className="fw-bold">#{id}</span></h3>
                    <p>
                        <Link to={"/"} className="btn btn-warning rounded-pill fw-bold px-3 mt-3" style={{fontSize:"12px"}}>Volver a la Página Principal</Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ThankYou