import React, { useState, useEffect } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import { api } from '../utils/Api';

import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function App() {

    const [isEditAvatarPopup, setEditAvatarPopup] = useState(false);
    const [isEditProfilePopup, setEditProfilePopup] = useState(false);
    const [isAddPlacePopup, setAddPlacePopup] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);
    const [cards, setCards] = useState([]);

    useEffect(() => {
        Promise.all([api.getUserInfo(), api.getInitialCards()])
            .then(([userInfo, initialCards]) => {
                setCurrentUser(userInfo);
                setCards(initialCards);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleCardLike = (card) => {
        const isLiked = card.likes.some((lik) => lik._id === currentUser._id);
        api.changeLike(card._id, !isLiked)
            .then((newCard) => {
                setCards((state) =>
                    state.map((c) => (c._id === card._id ? newCard : c))
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleCardDelete = (card) => {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) =>
                    state.filter((c) => c._id !== card._id)
                );
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleUpdateUser = (data) => {
        api.setUserInfo(data)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };


    const handleUpdateAvatar = (data) => {
        api.userAvatar(data)
            .then((updatedUser) => {
                setCurrentUser(updatedUser);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const handleAddPlaceSubmit = (newCard) => {
        api.postNewCard(newCard)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
        setSelectedCard(null);
    }

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <div className="root">
                <div className="body">
                    
                    <Header />

                    <Main
                        onEditAvatar={handleEditAvatarClick}
                        onEditProfile={handleEditProfileClick}
                        onAddPlace={handleAddPlaceClick}
                        onCardClick={handleCardClick}
                        onCardLike={handleCardLike}
                        onCardDelete={handleCardDelete}
                        cards={cards}
                    />
                    
                    <Footer />

                    <EditProfilePopup
                        isOpen={isEditProfilePopup} 
                        onClose={closeAllPopups} 
                        onUpdateUser={handleUpdateUser}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopup} 
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar}
                    />

                    <AddPlacePopup
                        isOpen={isAddPlacePopup}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlaceSubmit}
                    />

                    <ImagePopup card={selectedCard} onClose={closeAllPopups} />

                </div>
            </div>
        </CurrentUserContext.Provider>
    );
}

export default App;
