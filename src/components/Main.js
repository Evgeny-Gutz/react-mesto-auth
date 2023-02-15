import React from "react";
import Card from "../components/Card";
import {UserContext} from '../contexts/CurrentUserContext';

function Main(props) {
    const currentUser = React.useContext(UserContext);   
    return (
        <main className="main">
            <section className="profile">
                <div className="profile__change-avatar" onClick={props.onEditAvatar}></div>
                <img className="profile__avatar" src={currentUser.avatar} alt="Жак-Ив Кусто" />
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__profession">{currentUser.about}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <section className="elements">
                {props.cards.map((card) => (
                        <Card 
                            key={card._id} 
                            card={card} 
                            onCardClick={props.onCardClick} 
                            onCardLike={props.onCardLike}
                            onCardDislike={props.onCardDislike}
                            onCardDelete={props.onCardDelete} />
                    ))
                }
            </section>
        </main>
    );
}

export default Main;