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
// start validate a form
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('form');
    form.addEventListener('submit', formSend);

    async function formSend(e) {
        e.preventDefault();

        let error = formValidate(form);
        let formData = new FormData(form);

        // send form without reloading a page
        if (error == 0) {
            let response = await fetch('sendmail.php', {
                method: 'POST',
                body: formData
            });
            if (response.ok) {
                let result = await response.json();
                alert(result.message);
                form.reset();
            } else {
                alert("Ошибка");
            }
        } else {
            alert("Заполните поля в форме");
        }
    }

    function formValidate(form) {
        let error = 0;
        let formInput = document.querySelectorAll('.form__input');

        
        for (let index = 0; index < formInput.length; index++) {
            const input = formInput[index];
            formRemoveError(input);

            if (input.classList.contains('__email')) {
                if (emailTest(input)) {
                    formAddError(input);
                    error++;
                }
            } else {
                if (input.value == '') {
                    formAddError(input);
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
    }
    // check right email
    function emailTest(input) {
        return !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(input.value);
    }
});

