import React, { useState } from "react";
import {Link} from "react-router-dom";
import SubmissionForm from "./SubmissionForm";
import Header from "./Header";

const Register  = () => {
    // const [formValue, setFormValue] = useState({email: '', password: ''})
    //
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    // }
        return (
            <>
                <Header buttonName="Войти"/>
                <SubmissionForm title="Регистрация" buttonValue="Зарегистрироваться"/>
                <Link to="/sign-in" className="registr__link-to">Уже зарегистрированы? Войти</Link>
            </>
        )
}

export default Register ;