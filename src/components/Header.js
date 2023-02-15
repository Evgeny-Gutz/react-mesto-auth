function Header({loggedIn}) {

    return (
        <header className="header">
            <div className="header__logo"></div>
            {loggedIn ?
                <><span>email</span><button className="header__button">Выйти</button></>:
                <button className="header__button">Войти</button>

            }
        </header>
    );
}

export default Header;