import React, { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar
}) {

    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={handleSubmit}
            buttonTitle="Сохранить"
        >
            <input ref={avatarRef} className="popup__input popup__input_one" type="url" name="avatar" id="avatar"
                placeholder="Ссылка на аватарку" required />
            <span className="avatar-error popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;