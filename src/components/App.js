import React, { useState } from 'react';
import '../index.css';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import PopupWithForm from './PopupWithForm';
import ImagePopup from './ImagePopup';

function App() {

    const [isEditAvatarPopup, setEditAvatarPopup] = useState(false);
    const [isEditProfilePopup, setEditProfilePopup] = useState(false);
    const [isAddPlacePopup, setAddPlacePopup] = useState(false);
    const [isSelectedCard, setSelectedCard] = useState(null);

    const handleEditAvatarClick = () => {
        setEditAvatarPopup(true);
    }

    const handleEditProfileClick = () => {
        setEditProfilePopup(true);
    }

    const handleAddPlaceClick = () => {
        setAddPlacePopup(true);
    }

    const handleCardClick = (card) => {
        setSelectedCard(card)
    }

    const closeAllPopups = () => {
        setEditAvatarPopup(false);
        setEditProfilePopup(false);
        setAddPlacePopup(false);
        setSelectedCard(null)
    }

    return (

        <div className="root">
            <div className="body">
                <Header />
                <Main 
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handleCardClick}
                />
                <Footer />

                <PopupWithForm
                    name="avatar"
                    title="Обновить аватар"
                    buttonTitle="Сохранить"
                    isOpen={isEditAvatarPopup}
                    onClose={closeAllPopups}
                >
                    <input className="popup__input popup__input_one" type="url" name="avatar" id="avatar"
                        autoComplete="off" defaultValue="" placeholder="Ссылка на аватарку" required />
                    <span className="avatar-error popup__input-error"></span>
                </PopupWithForm>

                <PopupWithForm
                    name="edit"
                    title="Редактировать профиль"   
                    buttonTitle="Сохранить"
                    isOpen={isEditProfilePopup}
                    onClose={closeAllPopups}
                >
                    <input className="popup__input popup__input_one" type="text" name="name" id="name"
                        autoComplete="off" defaultValue="" required minLength="2" maxLength="40" />
                    <span className="name-error popup__input-error"></span>

                    <input className="popup__input popup__input_two" type="text" name="about" id="description"
                        autoComplete="off" defaultValue="" required minLength="2" maxLength="200" />
                    <span className="description-error popup__input-error"></span>
                </PopupWithForm>

                <PopupWithForm
                    name="add"
                    title="Новое место"
                    buttonTitle="Создать"
                    isOpen={isAddPlacePopup}
                    onClose={closeAllPopups}
                >
                    <input className="popup__input popup__input_one" type="text" name="name" id="denomination"
                        autoComplete="off" defaultValue="" placeholder="Название" required minLength="2" />
                    <span className="denomination-error popup__input-error"></span>

                    <input className="popup__input popup__input_two" type="url" name="link"
                        id="link" autoComplete="off" defaultValue="" placeholder="Ссылка на картинку" required />
                    <span className="link-error popup__input-error"></span>
                </PopupWithForm>

                {/* <PopupWithForm
                    name="delete"
                    title="Вы уверены?"
                    buttonTitle="Да"
                    isOpen={isAddPlacePopup}
                    onClose={closeAllPopups}
                /> */}

                <ImagePopup card={isSelectedCard} onClose={closeAllPopups} />
            </div>
        </div>
    );
}

export default App;
