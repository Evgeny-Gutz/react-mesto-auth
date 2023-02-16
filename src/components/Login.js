import SubmissionForm from "./SubmissionForm";
import React from "react";
import Header from "./Header";


const Login = () => {
    return (
        <>
            <Header buttonName="Регистрация"/>
            <SubmissionForm title="Вход" buttonValue="Войти" />
        </>
    )
}

export default Login;