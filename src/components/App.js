import React from 'react';
import {useEffect, useState} from "react";
import Header from './Header';
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import api from "../utils/Api";
import {UserContext} from '../contexts/CurrentUserContext.js';
import ImagePopup from './ImagePopup';

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isVisible:false, name: "", link: ""});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);

    function closeAllPopups () {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({...selectedCard, isVisible: false});
    }

    function handleCardClick (dataNameLink) {
        setSelectedCard({...selectedCard, isVisible: true, ...dataNameLink});
    }

    function handleEscClose (evt) {
        if(evt.key === 'Escape') closeAllPopups();
    }

    function handleBackgroundClose(evt) {
        if(evt.target.classList.contains('popup_opened')) closeAllPopups();
    }

    useEffect(()=> {
        api.getInitialCards()
            .then(cardList => setCards([...cards, ...cardList]))
            .catch(error => console.log(`Ошибка при загрузке карточек: ${error}`))
    }, []);

    useEffect(() => {
        api.getDataUser()
            .then(res => setCurrentUser(res))
            .catch(error => console.log(`Ошибка при загрузке карточек: ${error}`))
    }, []);
    
    useEffect( () => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mousedown', handleBackgroundClose);

        return () => {
            document.addEventListener('mousedown', handleBackgroundClose);
            document.addEventListener('keydown', handleEscClose);   
        }
    });
    
    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }
    function handleEditProfileClick () {
        setEditProfilePopupOpen(true);
    }
    function handleAddPlaceClick () {
        setAddPlacePopupOpen(true);
    }

    function handleCardLike (card) {
        const isLiked = card.likes.some( i => i._id === currentUser._id);

        api.setLike(card._id, !isLiked)
            .then(newCard => setCards(state => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(error => console.log(`Ошибка при добавлении лайка: ${error}`))
    }

    function handleCardDislike (card) {
        const isLiked = card.likes.some( i => i._id === currentUser._id);

        api.deleteLike(card._id, isLiked)
            .then(newCard => setCards(state => state.map((c) => c._id === card._id ? newCard : c)))
            .catch(error => console.log(`Ошибка при удалении лайка: ${error}`))
    }

    function handleCardDelete(id) {
        api.deleteCard(id)
            .then(() => setCards((state) =>  state.filter(e => e._id !== id)))
            .catch(error => console.log(`Ошибка при удалении картоки: ${error}`))
    }

    function handleUpdateUser({name, about}) {
        api.changeDataProfil({name, about})
            .then(res => setCurrentUser(res))
            .catch(error => console.log(`Ошибка при обновлении профиля: ${error}`))
    }

    function handleUpdateAvatar({avatar}) {
        api.changeAvatarProfil(avatar)
            .then(res => setCurrentUser(res))
            .catch(error => console.log(`Ошибка при изменении данных профиля: ${error}`))
    }

    function handleUpdatePlace({name, link}) {
        api.addNewCard({name, link})
            .then(newCard => setCards([newCard, ...cards]))
            .catch(error => console.log(`Ошибка при добавлении новой картоки: ${error}`))
    }

    return (
    <UserContext.Provider value={currentUser}>
        <Header />
        <Main 
            onEditProfile={handleEditProfileClick} 
            onAddPlace={handleAddPlaceClick} 
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardClick} 
            onCardLike={handleCardLike}
            onCardDislike={handleCardDislike}
            onCardDelete={handleCardDelete}
            cards={cards}
            setCards={setCards} />
        <Footer />
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdatePlace} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <ImagePopup
            onOpen={handleCardClick}
            card={selectedCard}
            onClose={closeAllPopups} />
    </UserContext.Provider>
  );
}

export default App;