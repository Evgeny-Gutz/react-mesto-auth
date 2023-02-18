import React from "react";

const InfoTooltip = ({isOk, isOpen, onClose}) => {
    return (
        <div className={`popup info-popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__cross popup__close" type="button" onClick={onClose} ></button>
                <div className={`popup__circle popup__circle_${isOk ? 'successful' : 'not-successful'}`}></div>
                <span className="popup__span">
                    {isOk ? 'Вы успешно зарегистрировались!':'Что-то пошло не так!Попробуйте ещё раз.'}
                </span>
            </div>
        </div>
    );
}

export default InfoTooltip;