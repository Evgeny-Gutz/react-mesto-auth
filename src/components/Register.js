import React from "react";
import {Link, useMatch} from "react-router-dom";
import SubmissionForm from "./SubmissionForm";
import Header from "./Header";

const Register  = ({formValue, handleSubmitRegistration, changeFormValues}) => {
  return (
        <>
            <Header buttonName="Войти"/>
            <SubmissionForm
                title="Регистрация"
                buttonValue="Зарегистрироваться"
                formValue={formValue}
                changeFormValues={changeFormValues}
                handleSubmit={handleSubmitRegistration}/>
            <Link to="/sign-in" className="registr__link-to">Уже зарегистрированы? Войти</Link>
        </>
    )
}

export default Register ;