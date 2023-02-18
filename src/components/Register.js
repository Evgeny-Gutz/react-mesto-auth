import React, {useEffect, useState} from "react";
import {Link, useMatch} from "react-router-dom";
import SubmissionForm from "./SubmissionForm";
import { Navigate } from "react-router-dom";
import Header from "./Header";
import {register} from "../utils/mestoAuth";
import InfoTooltip from "./InfoTooltip";

const Register  = ({onClose, successful, formValue, handleSubmitRegistration, changeFormValues, isOpenInfoTool}) => {
  return (
        <>
            <Header buttonName="Войти"/>
            <SubmissionForm title="Регистрация" buttonValue="Зарегистрироваться" formValue={formValue} changeFormValues={changeFormValues} handleSubmit={handleSubmitRegistration}/>
            <Link to="/sign-in" className="registr__link-to">Уже зарегистрированы? Войти</Link>
            <InfoTooltip isOk={successful} onClose={onClose} isOpen={isOpenInfoTool}/>
        </>
    )
}

export default Register ;