import {Link} from "react-router-dom";

function Header({buttonName}) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            {buttonName === "Регистрация" ?
                <Link to="/sign-up"><button className="header__button">{buttonName}</button></Link>:
                <Link to="/sign-in"><button className="header__button">{buttonName}</button></Link>
            }
        </header>
    );
}

export default Header;