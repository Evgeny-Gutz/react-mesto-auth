import SubmissionForm from "./SubmissionForm";
import React from "react";
import Header from "./Header";
import InfoTooltip from "./InfoTooltip";


const Login = ({formValue, changeFormValues, handleSubmitLogin, isOpenInfoTool, onClose, successful}) => {
    return (
        <>
            <Header buttonName="Регистрация"/>
            <SubmissionForm title="Вход" buttonValue="Войти" formValue={formValue} changeFormValues={changeFormValues} handleSubmit={handleSubmitLogin}/>
            <InfoTooltip isOk={successful} onClose={onClose} isOpen={isOpenInfoTool}/>
        </>
    )
}

export default Login;