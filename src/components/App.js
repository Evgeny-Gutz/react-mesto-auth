import React from 'react';
import {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from "react-router-dom";
import api from "../utils/Api";
import {UserContext} from '../contexts/CurrentUserContext.js';
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import {register, authorization, tokenValidity} from "../utils/mestoAuth";
import PersonalPage from "./PersonalPage";

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
    const [personEmail, setPersonEmail] = useState('');
    const [isOpenInfoTool, setIsOpenInfoTool] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        initCards();
        initProfile();
        tokenCheck();
    }, []);
    useEffect( () => {
        document.addEventListener('keydown', handleEscClose);
        document.addEventListener('mousedown', handleBackgroundClose);

        return () => {
            document.addEventListener('mousedown', handleBackgroundClose);
            document.addEventListener('keydown', handleEscClose);   
        }
    });

    function initProfile() {
        api.getDataUser()
            .then(res => setCurrentUser(res))
            .catch(error => console.log(`Ошибка при загрузке карточек: ${error}`))
    }
    function initCards() {
        api.getInitialCards()
            .then(cardList => setCards([...cards, ...cardList]))
            .catch(error => console.log(`Ошибка при загрузке карточек: ${error}`))
    }
    function tokenCheck() {
        const token = localStorage.getItem('token');
        if(token) {
            tokenValidity(token)
                .then((res) => {
                    if(res) {
                        changeLoggedIn();
                        navigate("/", {replace: true});
                    }
                    return res.json();
                })
                .then((res) => {
                    setPersonEmail(res.data.email);
                })
        }
    }
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
                navigate("/sign-in", {replace: true});
            })
            .catch((e) => {
                console.log(`Ошибка регистрации: ${e}`);
            });
    }
    function handleSubmitLogin(e) {
        e.preventDefault();
        authorization(formValue)
            .then((res) => {
                if(res.status === (400 || 401)) {
                    successfulRegistration(false);
                    setIsOpenInfoTool(true);
                }
                return res.json();
            })
            .then((data) => {
                setPersonEmail(formValue.email);
                setLoggedIn(true);
                localStorage.setItem('token', data.token);
                navigate("/", {replace: true});
                setFormValue({...formValue, email: '', password: ''});
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
    function changeLoggedIn() {
        setLoggedIn(true);
    }

    return (
        <UserContext.Provider value={currentUser}>
            <Routes>
                <Route path="/sign-up" element={
                    <Register
                        handleSubmitRegistration={handleSubmitRegistration}
                        formValue={formValue}
                        changeFormValues={changeFormValues}
                        successful={isSuccessfulRequest}
                        onClose={closeAllPopups}
                        isOpenInfoTool={isOpenInfoTool}/>}/>
                <Route path="/sign-in" element={
                    <Login
                        handleSubmitLogin={handleSubmitLogin}
                        formValue={formValue}
                        changeFormValues={changeFormValues}
                        successful={isSuccessfulRequest}
                        onClose={closeAllPopups}
                        isOpenInfoTool={isOpenInfoTool}/>} />
                <Route path="/" element={
                    <ProtectedRoute element={
                        PersonalPage} loggedIn={loggedIn}
                            changeLoggedIn={changeLoggedIn}
                            personEmail={personEmail}
                            handleEditProfileClick={handleEditProfileClick}
                            handleAddPlaceClick={handleAddPlaceClick}
                            handleEditAvatarClick={handleEditAvatarClick}
                            handleCardClick={handleCardClick}
                            handleCardLike={handleCardLike}
                            handleCardDislike={handleCardDislike}
                            handleCardDelete={handleCardDelete}
                            cards={cards}
                            setCards={setCards}
                            selectedCard={selectedCard}
                            closeAllPopups={closeAllPopups}
                            isEditProfilePopupOpen={isEditProfilePopupOpen}
                            handleUpdateUser={handleUpdateUser}
                            isAddPlacePopupOpen={isAddPlacePopupOpen}
                            handleUpdatePlace={handleUpdatePlace}
                            isEditAvatarPopupOpen={isEditAvatarPopupOpen}
                            handleUpdateAvatar={handleUpdateAvatar}/>}/>
            </Routes>
        </UserContext.Provider>
  );
}

export default App;