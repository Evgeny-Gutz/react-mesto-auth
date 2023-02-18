import {Link} from "react-router-dom";

function Header({buttonName, personEmail, changeLoggedIn}) {
    function handleClickLeave() {
        localStorage.removeItem('token');
        changeLoggedIn(false);
    }

    return (
        <header className="header">
            <div className="header__logo"></div>
            {buttonName === "Регистрация" && <Link to="/sign-up"><button className="header__button">{buttonName}</button></Link>}
            {buttonName === "Войти" && <Link to="/sign-in"><button className="header__button">{buttonName}</button></Link>}
            {buttonName === "Выйти" &&
                <div className="header__person-block">
                    <span className="header__email">{personEmail}</span>
                    <Link to="/sign-in"><button className="header__button" onClick={handleClickLeave}>{buttonName}</button></Link>
                </div>}
        </header>
    );
}

export default Header;