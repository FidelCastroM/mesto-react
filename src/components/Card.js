import React from 'react';
import elementBasket from '../images/basket.svg';
import cerdceLike from '../images/cerdce.svg';

function Card({ card, onCardClick }) {
    const handleClick = () => {
        onCardClick(card);
    };

    return (
            <li className="element">
                <button type="button" className="element__basketbutton">
                    <img src={elementBasket} alt="Корзина" className="element__basket" />
                </button>
            <img src={card.link} alt={card.name} className="element__image" onClick={handleClick} />
                <div className="element__card">
                <h2 className="element__landscape">{card.name}</h2>
                    <div className="element__box-like">
                        <button type="button" className="element__button-like">
                        <img src={cerdceLike} alt="Сердце" className="element__like" />
                        </button>
                        <span className="element__like-quantity">{card.likes.length}</span>
                    </div>
                </div>
            </li>
    );
}

export default Card;