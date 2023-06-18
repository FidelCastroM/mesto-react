import React from 'react';
import { useNavigate } from 'react-router-dom';
import headerLogo from '../images/logo.svg';

function Header({ userEmail, isMainPage, isLoginPage, isRegisterPage }) {
    const navigate = useNavigate();

    const signOut = () => {
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    return (
        <header className="header">
            <img src={headerLogo} alt="доготип" className="header__logo" />
            <div className="header__info">
                {isMainPage && (
                    <>
                        <span className="header__email">{userEmail}</span>
                        <button type="button" className="header__button header__exit" onClick={signOut}>Выйти</button>
                    </>
                )}

                {isLoginPage && (
                    <button type="button" className="header__button header__register" onClick={() => navigate('/sing-up')}>Регистрация</button>
                )}

                {isRegisterPage && (
                    <button type="button" className="header__button header__login" onClick={() => navigate('/sing-in')}>Войти</button>
                )}
            </div>
        </header>
    );
}

export default Header;