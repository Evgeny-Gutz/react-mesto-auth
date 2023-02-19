import React, {useState} from "react";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import AddPlacePopup from "./AddPlacePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import ImagePopup from "./ImagePopup";
import Header from "./Header";

const PersonalPage = (props) => {

    return (
        <>
            <Header buttonName="Выйти" personEmail={props.personEmail} changeLoggedIn={props.changeLoggedIn}/>
            <Main
                onEditProfile={props.handleEditProfileClick}
                onAddPlace={props.handleAddPlaceClick}
                onEditAvatar={props.handleEditAvatarClick}
                onCardClick={props.handleCardClick}
                onCardLike={props.handleCardLike}
                onCardDislike={props.handleCardDislike}
                onCardDelete={props.handleCardDelete}
                cards={props.cards}
                setCards={props.setCards} />
            <Footer />
            <EditProfilePopup
                isOpen={props.isEditProfilePopupOpen}
                onClose={props.closeAllPopups}
                onUpdateUser={props.handleUpdateUser} />
            <AddPlacePopup
                isOpen={props.isAddPlacePopupOpen}
                onClose={props.closeAllPopups}
                onAddPlace={props.handleUpdatePlace}
                placeValues={props.placeValues}
                handleChangePlaceValues={props.handleChangePlaceValues}/>
            <EditAvatarPopup isOpen={props.isEditAvatarPopupOpen} onClose={props.closeAllPopups} onUpdateAvatar={props.handleUpdateAvatar} />
            <ImagePopup
                onOpen={props.handleCardClick}
                card={props.selectedCard}
                onClose={props.closeAllPopups} />
        </>
    )
}

export default PersonalPage;