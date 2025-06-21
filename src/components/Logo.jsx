import { Link } from "react-router-dom"

const Logo = () => {
    return (
        <Link to={"/"}>
            <img src="/images/logo-amazon.png" alt="Amazon" width={180} />
        </Link>
    )
}

export default Logo