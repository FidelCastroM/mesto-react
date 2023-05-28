import React, { useState, useEffect } from 'react';
import profileSymbol from '../images/Vector.svg';
import profileEditInfo from '../images/EditButton.svg';
import { api } from './Api';
import Card from './Card';

function Main({
    onEditAvatar,
    onEditProfile,
    onAddPlace,
    onCardClick
}) {

    const [userName, setUserName] = useState('');
    const [userDescription, setUserDescription] = useState('');
    const [userAvatar, setUserAvatar] = useState('');
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setUserName(userInfo.name);
                setUserDescription(userInfo.about);
                setUserAvatar(userInfo.avatar);
                setCards(initialCards);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <main>
            <section className="profile">
                <div style={{ backgroundImage: `url(${userAvatar})` }} className="profile__avatar"></div>
                <button className="profile__avatar-button" onClick={onEditAvatar}></button>
                <div className="profile__info">
                    <h1 className="profile__name">{userName}</h1>
                    <button aria-label="Редактирование" type="button" className="profile__edit">
                        <img src={profileEditInfo} alt="редактирование" className="profile__edit-info" onClick={onEditProfile} />
                    </button>
                    <p className="profile__about-me">{userDescription}</p>
                </div>
                <button aria-label="Добавление" type="button" className="profile__add" onClick={onAddPlace}>
                    <img src={profileSymbol} alt="Кнопка добавления" className="profile__symbol" />
                </button>
            </section>

            <ul className="elements">
                {cards.map(card => (
                    <Card key={card._id} card={card} onCardClick={onCardClick} />
                ))}
            </ul>
        </main>
    )
}

export default Main;