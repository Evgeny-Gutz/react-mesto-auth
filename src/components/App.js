import React from 'react';
import {useEffect, useState} from "react";
import { Route, Routes} from "react-router-dom";
import Main from './Main';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Footer from './Footer';
import api from "../utils/Api";
import {UserContext} from '../contexts/CurrentUserContext.js';
import ImagePopup from './ImagePopup';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import {register, authorization, tokenValidity} from "../utils/mestoAuth";

function App() {
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({isVisible:false, name: "", link: ""});
    const [isSuccessfulRequest, setIsSuccessfulRequest] = useState(true);
    const [formValue, setFormValue] = useState({email: '', password: ''});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [isOpenInfoTool, setIsOpenInfoTool] = useState(false);

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
    useEffect(() => {
       tokenValidity()
           .then(res => res.json())
           .then((data) => {
               console.log(data);
           })
    }, []);

    function closeAllPopups () {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setSelectedCard({...selectedCard, isVisible: false});
        setIsOpenInfoTool(false);
    }
    function successfulRegistration(value) {
        setIsSuccessfulRequest(value);
        setFormValue({...formValue, email: '', password: ''});
    }
    function changeFormValues(e) {
        e.preventDefault();
        const {name, value} = e.target;
        setFormValue({
            ...formValue,
            [name]: value});
    };

    function handleSubmitRegistration(e) {
        e.preventDefault();
        register(formValue)
            .then((res) => {
                console.log(`Cтатус: ${res.status}`);
                if(res.status === 400) {
                    successfulRegistration(false);
                }
                else {
                    successfulRegistration(true);
                }
                return res.json();
            })
            .then((res) => {
                setIsOpenInfoTool(true);

                console.log(res);
            })
            .catch((e) => {
                console.log(`Ошибка регистрации: ${e}`);
            });
    }
    function handleSubmitLogin(e) {
        e.preventDefault();
        authorization(formValue)
            .then((res) => {
                console.log(`Cтатус входа: ${res.status}`);
                if(res.status === (400 || 401)) {
                    successfulRegistration(false);
                    setIsOpenInfoTool(true);
                }
                return res.json();
            })
            .then((data) => {
                localStorage.setItem('token', data.token);
                console.log(data.token);
            })
            .catch((e) => {
                console.log(`Ошибка регистрации: ${e}`);
            });
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
    // function handleSubmitLogin() {
    //     setLoggedIn(true);
    // }

    return (
        <UserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/hidden" element={
                    <>
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
                        <InfoTooltip isOpen={isSuccessfulRequest} onClose={closeAllPopups} isOk={false}/>
                        <ImagePopup
                            onOpen={handleCardClick}
                            card={selectedCard}
                            onClose={closeAllPopups} />
                    </>
                } />

                <Route path="/sign-up" element={<Register
                    handleSubmitRegistration={handleSubmitRegistration}
                    formValue={formValue}
                    changeFormValues={changeFormValues}
                    successful={isSuccessfulRequest}
                    onClose={closeAllPopups}
                    isOpenInfoTool={isOpenInfoTool}/>}/>
                <Route path="/sign-in" element={<Login
                    handleSubmitLogin={handleSubmitLogin}
                    formValue={formValue}
                    changeFormValues={changeFormValues}
                    successful={isSuccessfulRequest}
                    onClose={closeAllPopups}
                    isOpenInfoTool={isOpenInfoTool}/>}/>
                <Route path="/" element={<ProtectedRoute element={<Login />} loggedIn={loggedIn}/> } />
            </Routes>
        </UserContext.Provider>
  );
}

export default App;