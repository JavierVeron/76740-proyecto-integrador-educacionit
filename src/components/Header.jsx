import Logo from "./Logo"
import Navbar from "./Navbar"

const Header = () => {
    return (
        <>
            <div className="container-fluid bg-secondary-subtle p-3">
                <div className="row">
                    <div className="col text-center">
                        <Logo />
                    </div>
                </div>
            </div>
            <Navbar />
        </>
    )
}

export default Header