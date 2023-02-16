import React from "react";

const SubmissionForm = ({title, buttonValue, formValue, changeFormValues, handleSubmit}) => {
    return (
        <div className="submission-form">
            <h3 className="submission-form__title">{title}</h3>
            <form className="submission-form__form" name='form' onSubmit={handleSubmit} noValidate>
                <input className="submission-form__input" type="email" name="email" value={formValue.email} placeholder="Email" onChange={changeFormValues}/>
                <input className="submission-form__input" type="password" name="password" value={formValue.password} placeholder="Пароль" onChange={changeFormValues}/>
                <input className="submission-form__submit" type="submit"  name="submit" value={buttonValue}></input>
            </form>
        </div>
    )
}

export default SubmissionForm;