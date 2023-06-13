import React from 'react';

function ImagePopup({ card, onClose }) {
    return (
        <div className={`popup popup_image ${card ? 'popup_opened' : ''}`}>
            <div className="popup__container popup__container_image">
                <button type="button" className="popup__close" onClick={onClose}></button>
                <img src={card?.link} alt={card?.name} className="popup__container_image" />
                <p className="popup__figcaption">{card ? card.name : ''}</p>
            </div>
        </div>
    );
}

export default ImagePopup;