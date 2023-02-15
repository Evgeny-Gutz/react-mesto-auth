import React, { useState } from "react";
import {Link} from "react-router-dom";

const Registr = () => {
    // const [formValue, setFormValue] = useState({email: '', password: ''})
    //
    const handleSubmit = (e) => {
        e.preventDefault();
    }


        return (
            <div className="registr">
                <h3 className="registr__title">Регистрация</h3>
                <form className="registr__form" name='registr' onClick={handleSubmit} noValidate>
                    <input className="registr__input" type="email" name="email" placeholder="Email" />
                    <input className="registr__input" type="password" name="password" placeholder="Пароль" />
                    <input className="registr__submit" type="submit"  name="submit" value="Зарегистрироваться"></input>
                </form>
                <Link to="/" className="registr__link-to">Уже зарегистрированы? Войти</Link>
            </div>
        )
}

export default Registr;