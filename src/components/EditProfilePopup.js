import React from "react";
import {useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditProfilePopup({isOpen, onClose, onUpdateUser}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const currentUser = useContext(UserContext);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name,
            about: description,
        });
        onClose();
    }

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about)
    }, [currentUser, isOpen]);

    return (
        <PopupWithForm 
            name="profile" 
            title="Редактировать профиль" 
            isOpen={isOpen} 
            onClose={onClose}
            valueSubmit={"Сохранить"}
            onSubmit={handleSubmit}>
                { name && description && <><label className="popup__field">
                    <input id="name-input" className="popup__input popup__input_type_name" type="text" name="name" value={name} onChange={handleChangeName} minLength="2" maxLength="40" required />
                    <span className="name-input-error popup__input-error"></span>
                </label>
                <label className="popup__field">
                    <input id="profession-input" className="popup__input popup__input_type_job" type="text" name="name" value={description} onChange={handleChangeDescription} minLength="2" maxLength="200" required />
                    <span className="profession-input-error popup__input-error"></span>
                </label>
            </>}
        </PopupWithForm>
        
    );
}

export default EditProfilePopup;