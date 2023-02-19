import React from "react";
import {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [profileValues, setProfileValues] = useState({name: '', about: ''});
    const currentUser = useContext(UserContext);

    function handleChangeProfileValues(e) {
        const name = e.target.name;
        setProfileValues({
            ...profileValues,
            [name]: e.target.value,
        })
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser(profileValues);
    }

    useEffect(() => {
        setProfileValues({
            ...profileValues,
            name: currentUser.name,
            about: currentUser.about,
        })
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            isOpen={isOpen} 
            onClose={onClose}
            valueSubmit={"Сохранить"}
            onSubmit={handleSubmit}>
                <>
                    <label className="popup__field">
                        <input id="name-input" className="popup__input popup__input_type_name" type="text" name="name" value={isOpen ? profileValues.name: ''} onChange={handleChangeProfileValues} minLength="2" maxLength="40" required />
                        <span className="name-input-error popup__input-error"></span>
                    </label>
                    <label className="popup__field">
                        <input id="profession-input" className="popup__input popup__input_type_job" type="text" name="about" value={isOpen ? profileValues.about: ''} onChange={handleChangeProfileValues} minLength="2" maxLength="200" required />
                        <span className="profession-input-error popup__input-error"></span>
                    </label>
                </>
        </PopupWithForm>
        
    );
}

export default EditProfilePopup;