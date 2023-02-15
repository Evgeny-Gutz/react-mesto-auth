import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace}) {
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");

    function handleChangeTitle(e) {
        setTitle(e.target.value);
    }

    function handleChangeUrl(e) {
        setLink(e.target.value);
    }

    function handleSubmit (e) {
        e.preventDefault();

        onAddPlace({
            name: title,
            link: link,
        });

        onClose();
        setTitle("");
        setLink("");
    }


    return (
        <PopupWithForm 
            name="card" 
            title="Новое место" 
            isOpen={isOpen && "popup_opened"} 
            onClose={onClose}
            valueSubmit={"Создать"}
            onSubmit={handleSubmit}>
                <label className="popup__field">
                     <input id="title-input" className="popup__input popup__input_type_title" value={title} onChange={handleChangeTitle} type="text" name="title" placeholder="Название" minLength="2" maxLength="30" required />
                     <span className="title-input-error popup__input-error"></span>
                 </label>
                 <label className="popup__field">
                     <input id="link-input" className="popup__input popup__input_type_link" value={link} onChange={handleChangeUrl} type="url" name="link" placeholder="Ссылка на картинку" />
                     <span className="link-input-error popup__input-error"></span>
                 </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;