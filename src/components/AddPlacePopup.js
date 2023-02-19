import React from "react";
import { useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen, onClose, onAddPlace, placeValues, handleChangePlaceValues}) {
    // const [title, setTitle] = useState("");
    // const [link, setLink] = useState("");
    // const [placeValues, setPlaceValues] = useState({name: '', link: '',});

    // function handleChangePlaceValues(e) {
    //     const name = e.target.name;
    //     setPlaceValues({
    //         ...placeValues,
    //         [name]: e.target.value,
    //     })
    // }

    // function handleChangeTitle(e) {
    //     setTitle(e.target.value);
    // }
    //
    // function handleChangeUrl(e) {
    //     setLink(e.target.value);
    // }

    function handleSubmit (e) {
        e.preventDefault();
        onAddPlace(placeValues);
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
                     <input id="title-input" className="popup__input popup__input_type_title" value={placeValues.name} onChange={handleChangePlaceValues} type="text" name="name" placeholder="Название" minLength="2" maxLength="30" required />
                     <span className="title-input-error popup__input-error"></span>
                 </label>
                 <label className="popup__field">
                     <input id="link-input" className="popup__input popup__input_type_link" value={placeValues.link} onChange={handleChangePlaceValues} type="url" name="link" placeholder="Ссылка на картинку" />
                     <span className="link-input-error popup__input-error"></span>
                 </label>
        </PopupWithForm>
    );
}

export default AddPlacePopup;