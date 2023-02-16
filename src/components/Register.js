import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import SubmissionForm from "./SubmissionForm";
import Header from "./Header";
import {register} from "../utils/mestoAuth";

const Register  = () => {
    const [formValue, setFormValue] = useState({email: '', password: ''});

    const changeFormValues = (e) => {
      e.preventDefault();
      const {name, value} = e.target;
      setFormValue({
        ...formValue,
        [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formValue);
        register(formValue)
          .then((response) => {
            // console.log(response);
          })
          .catch( e => console.log(e));
    }
    return (
        <>
            <Header buttonName="Войти"/>
            <SubmissionForm title="Регистрация" buttonValue="Зарегистрироваться" formValue={formValue} changeFormValues={changeFormValues} handleSubmit={handleSubmit}/>
            <Link to="/sign-in" className="registr__link-to">Уже зарегистрированы? Войти</Link>
        </>
    )
}

export default Register ;