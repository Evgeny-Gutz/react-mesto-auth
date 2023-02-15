import React from "react";

const SubmissionForm = ({title, buttonValue}) => {

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="submission-form">
            <h3 className="submission-form__title">{title}</h3>
            <form className="submission-form__form" name='form' onClick={handleSubmit} noValidate>
                <input className="submission-form__input" type="email" name="email" placeholder="Email" />
                <input className="submission-form__input" type="password" name="password" placeholder="Пароль" />
                <input className="submission-form__submit" type="submit"  name="submit" value={buttonValue}></input>
            </form>
        </div>
    )
}

export default SubmissionForm;