window.addEventListener("load", function () {
  AOS.init({
    duration: 600,
  })

})

// modal

let contactModalBtns = document.querySelectorAll('[data-modal-trigger="contact"]'),
    contactModal = document.querySelector('[data-modal="contact"]'),
    signUpModalBtns = document.querySelectorAll('[data-modal-trigger="signup"]'),
    signUpModal = document.querySelector('[data-modal="signup"]'),
    modalBtnClose = document.querySelectorAll('.modal__btn-close');

function openModal(btn, modal) {
    btn.forEach(item => {
        item.addEventListener('click', () => {
            document.querySelectorAll('.modal').forEach(modalItem => {
                modalItem.classList.remove('modal--active');
            })
            modal.classList.add('modal--active');
        });
    });
}

openModal(contactModalBtns, contactModal)
openModal(signUpModalBtns, signUpModal)

modalBtnClose.forEach(itemBtn => {
    itemBtn.addEventListener('click', () => {

        const parentElement = itemBtn.closest('.modal');
        if (!parentElement) return;

        const successMessage = parentElement.querySelector('.form__success');
        if (successMessage) {
            successMessage.remove();
        }

        const form = parentElement.querySelector('form');
        if (form) {
            clearErrors(form);
            form.reset();
        }

        parentElement.classList.remove('modal--active');
        document.body.style.overflow = 'auto';
    });
});


// valid

let contactForm = document.querySelector('#contact-form'),
    signupForm = document.querySelector('#signup-form'),
    mailForm = document.querySelector('#mail-form')


contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let nameField = contactForm.querySelector('input[name="name"]');
    let phoneField = contactForm.querySelector('input[name="phone"]');

    let nameValue = nameField.value.trim();
    let phoneValue = phoneField.value.trim();

    let isValid = true;

    clearErrors(contactForm);

    let namePattern = /^[a-zA-Z]{2,15}$/;
    if (nameValue === '') {
        showError(nameField, 'Name cannot be empty', true);
        isValid = false;
    } else if (!namePattern.test(nameValue)) {
        showError(nameField, 'Name must contain 2 to 15 Latin letters', true);
        isValid = false;
    }

    let phonePattern = /^[+]?[0-9]{6,}$/;
    if (phoneValue === '') {
        showError(phoneField, 'Phone cannot be empty', true);
        isValid = false;
    } else if (!phonePattern.test(phoneValue)) {
        showError(phoneField, 'Phone must contain at least 6 digits and may start with a plus sign', true);
        isValid = false;
    }

    if (isValid) {
        let successAnswer = document.createElement('div');
        successAnswer.classList.add('form__success');
        successAnswer.innerHTML = '<p>Form submitted successfully!</p>';

        let submitButton = contactForm.querySelector('button');
        contactForm.insertBefore(successAnswer, submitButton);
    }
});


signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailField = signupForm.querySelector('input[name="email"]');
    let passwordField = signupForm.querySelector('input[name="password"]');
    let confirmPasswordField = signupForm.querySelector('input[name="confirm-password"]');

    let emailValue = emailField.value.trim();
    let passwordValue = passwordField.value.trim();
    let confirmPasswordValue = confirmPasswordField.value.trim();

    let isValid = true;

    clearErrors(signupForm);

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        showError(emailField, 'Email cannot be empty', true);
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailField, 'Enter a valid email address', true);
        isValid = false;
    }

    if (passwordValue === '') {
        showError(passwordField, 'Password cannot be empty', true);
        isValid = false;
    } else if (passwordValue.length < 6) {
        showError(passwordField, 'Password must be at least 6 characters', true);
        isValid = false;
    }

    if (confirmPasswordValue !== passwordValue) {
        showError(confirmPasswordField, 'Passwords do not match', true);
        isValid = false;
    }

    if (isValid) {
        let successAnswer = document.createElement('div');
        successAnswer.classList.add('form__success');
        successAnswer.innerHTML = '<p>Sign up successful!</p>';

        let submitButton = signupForm.querySelector('button');
        signupForm.insertBefore(successAnswer, submitButton);
    }
});

mailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    let emailField = mailForm.querySelector('input[name="email"]');

    let emailValue = emailField.value.trim();

    let isValid = true;

    clearErrors(mailForm);

    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailValue === '') {
        showError(emailField, 'Email cannot be empty', false);
        isValid = false;
    } else if (!emailPattern.test(emailValue)) {
        showError(emailField, 'Enter a valid email address', false);
        isValid = false;
    }

    if (isValid) {
        if (!document.querySelector('.form__success')) {
            let successAnswer = document.createElement('div');
            successAnswer.classList.add('form__success');
            successAnswer.innerHTML = '<p>Sign up successful!</p>';

            let submitButton = mailForm.querySelector('button');
            mailForm.insertBefore(successAnswer, submitButton);


            setTimeout(() => {
                successAnswer.remove();
                mailForm.reset();
            }, 2000);
        }

    }

});



function showError(input, message, isFormLevel) {
    let error = document.createElement('span');
    error.classList.add('error-message');
    error.innerText = message;

    if (isFormLevel) {
        input.parentElement.parentElement.appendChild(error);
    } else {
        input.parentElement.appendChild(error);
    }

    input.addEventListener('input', function () {
        let value = input.value.trim();
        if (value) {
            if (input === contactForm.querySelector('input[name="name"]') && /^[a-zA-Z]{2,15}$/.test(value)) {
                error.remove();
            }
            if (input === contactForm.querySelector('input[name="phone"]') && /^[+]?[0-9]{6,}$/.test(value)) {
                error.remove();
            }
            if (input === signupForm.querySelector('input[name="email"]') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error.remove();
            }
            if (input === signupForm.querySelector('input[name="password"]') && value.length >= 6) {
                error.remove();
            }
            if (input === signupForm.querySelector('input[name="confirm-password"]') && value === signupForm.querySelector('input[name="password"]').value) {
                error.remove();
            }
            if (input === mailForm.querySelector('input[name="email"]') && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                error.remove();
            }
        }
    });
}



function clearErrors(form) {
    let errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());
}


// burger

let headerBurger = document.querySelector('.header__burger'),
    headerNavMain = document.querySelector('.header__main');


headerBurger.addEventListener('click', () => {
    headerNavMain.classList.add('header__main--active')
});

document.querySelector('.header__nav-item--close').addEventListener('click', () => {
    headerNavMain.classList.remove('header__main--active')
});

headerNavMain.addEventListener('click', (e) => {

    if (!e.target.matches('.header__main')) {
        headerNavMain.classList.remove('header__main--active')
    }
});


// slider

var swiper = new Swiper(".swiper-container", {
    slidesPerView: 2,
    loop: true,
    spaceBetween: 40,
    pagination: {
        el: ".swiper-pagination",
        clickable: true
    },
    breakpoints: {
        980: {
            slidesPerView: 2,
            spaceBetween: 40
        },
        0: {
            slidesPerView: 1,
            spaceBetween: 20
        }
    }
});

const passwordInput = document.getElementById('password');
const toggleIcon = document.querySelector('.form__field .form__field-input img');

toggleIcon.addEventListener('mousedown', function () {
    passwordInput.setAttribute('type', 'text');
});

toggleIcon.addEventListener('mouseup', function () {
    passwordInput.setAttribute('type', 'password');
});

toggleIcon.addEventListener('mouseleave', function () {
    passwordInput.setAttribute('type', 'password');
});
