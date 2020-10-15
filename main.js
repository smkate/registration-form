"use strict"

const openModal = document.querySelector('.open__btn'),
    modalForm = document.querySelector('.form'),
    modalFormBack = document.querySelector('.form__overlay'),
    closeModal = document.querySelector('.form__close-btn');

openModal.addEventListener('click', () => {
    modalForm.classList.add('active');
});

closeModal.addEventListener('click', () => {
    closeModalWindow();
});

modalFormBack.addEventListener('click', function(e) {
    if (!e.target.closest('.form__body')) {
        closeModalWindow();
    }
});
 
document.addEventListener('keydown', function(event) {
    if (event.keyCode === 27 && modalForm.classList.contains('active')) {
        closeModalWindow();
    }
});

function closeModalWindow() {
    modalForm.classList.remove('active');
}

// data for form sending
const errorMessageSend = {
    msg: 'Такой email не зарегистрирован',
    url: 'restate.ru',
    er: 'Заполните поля в форме'
};

// start validate a form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let sendMsg = document.querySelector('.error__message-send');

        let formData = new FormData(form);

        // send form without reloading a page
        if (error === 0) {
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                // Result message (success)
                document.location = errorMessageSend.url;
                sendMsg.textContent = '';
                form.reset();
            } else {
                // Error
                sendMsg.textContent = errorMessageSend.msg;
            }
        }
    }

    function formValidate(form) {
        let error = 0;
        let formInput = document.querySelectorAll('.form__input');
        let emailInput = document.querySelector('.form__input.__email');
        let passwInput = document.querySelector('.form__input.__password');


        
        for (let index = 0; index < formInput.length; index++) {
            const input = formInput[index];
            formRemoveError(input);

            if (input.classList.contains('__email') || emailInput.value == '') {
                if (emailTest(input)) {
                    formAddError(input);
                    document.querySelector('.error__message-email').textContent = 'Введите email';
                    error++;
                }
            } else {
                if (passwInput.value == '') {
                    formAddError(input);
                    document.querySelector('.error__message-password').textContent = 'Введите пароль';
                    error++;
                }
            }
        }
    }


    function formAddError(input) {
        input.classList.add('__error');
        input.classList.add('.__error');
    }
    function formRemoveError(input) {
        input.classList.remove('__error');
        input.classList.remove('__error');
        document.querySelector('.error__message-email').textContent = '';
        document.querySelector('.error__message-password').textContent = '';
    }
    // check right email
    function emailTest(input) {
        return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
    }
});

