import React from "react";

const InfoTooltip = ({isOpen, onClose, itsOk}) => {
    return (
        <div className={`popup info-popup ${isOpen && "popup_opened"}`}>
            <div className="popup__container">
                <button className="popup__cross popup__close" type="button" onClick={onClose} ></button>
                <div className={`popup__circle popup__circle_${itsOk ? 'successful' : 'not-successful'}`}></div>
                <span className="popup__span">
                    {itsOk ? 'Вы успешно зарегистрировались!':'Что-то пошло не так!Попробуйте ещё раз.'}
                </span>
            </div>
        </div>
    );
}

export default InfoTooltip;