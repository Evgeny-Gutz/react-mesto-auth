import SubmissionForm from "./SubmissionForm";
import React from "react";
import Header from "./Header";


const Login = ({formValue, changeFormValues, handleSubmitLogin}) => {
    return (
        <>
            <Header buttonName="Регистрация"/>
            <SubmissionForm
                title="Вход"
                buttonValue="Войти"
                formValue={formValue}
                changeFormValues={changeFormValues}
                handleSubmit={handleSubmitLogin}/>
        </>
    )
}

export default Login;