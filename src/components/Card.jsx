const Card = ({item}) => {
    return (
        <div className="col-md-2">
            <div className="card">
                <img src={item.foto} className="card-img-top" alt={item.nombre} />
                <div className="card-body">
                    <h5 className="card-title" style={{fontSize:"13px"}}>{item.nombre}</h5>
                    <p className="card-text text-center fw-bold">${item.precio}</p>
                    <p className="card-text text-center text-uppercase"><span className="badge text-bg-light text-secondary">{item.categoria}</span></p>
                    {item.envio && <p className="card-text text-center text-danger fw-bold">Envío Gratis</p>}
                    <p className="text-center"><button className="btn btn-warning rounded-pill fw-bold px-3" style={{fontSize:"12px"}}>Agregar al Carrito</button></p>
                </div>
            </div>
        </div>
    )
}

export default Card