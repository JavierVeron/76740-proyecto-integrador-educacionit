import Logo from "./Logo"

const Header = () => {
    return (
        <div className="container-fluid bg-secondary-subtle p-3">
            <div className="row">
                <div className="col text-center">
                    <Logo />
                </div>
            </div>
        </div>
    )
}

export default Header