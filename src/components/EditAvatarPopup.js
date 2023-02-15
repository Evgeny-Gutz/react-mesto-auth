import React from "react";
import { useState, useEffect, useContext} from "react";
import { UserContext } from "../contexts/CurrentUserContext";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
    const [avatar, setAvatar] = useState('');
    const avatarRef = React.useRef();
    const currentUser = useContext(UserContext);

    function handleSubmit(e) {
        e.preventDefault();
      
        onUpdateAvatar({
           avatar: avatarRef.current.value,
        });
        onClose();
    }

    useEffect(()=> {
        setAvatar(currentUser.avatar);
    }, [currentUser])

    return (
        <PopupWithForm 
            name="avatar" 
            title="Обновить аватар" 
            isOpen={isOpen && "popup_opened"} 
            onClose={onClose}
            valueSubmit={"Сохранить"}
            onSubmit={handleSubmit}>
                <label className="popup__field">
                    <input id="link-input-avatar" ref={avatarRef} src={avatar}  className="popup__input popup__input_type_link" type="url" name="link" placeholder="Ссылка на картинку" required />
                    <span className="link-input-avatar-error popup__input-error"></span>
                </label>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;