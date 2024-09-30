const servicesList = document.querySelector('.services__list');

fetch('../services.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {


        data.forEach((item) => {
            const servicesElement = document.createElement('div');
            servicesElement.classList.add('services__item');
            servicesElement.innerHTML = `
                <div class="services__item-inner">
                    <div class="services__item-name">
                        <span>${item.name}</span> 
                    </div>
                    <div class="services__item-step">
                        <span>${item.step}</span> 
                    </div>
                    <div class="services__item-text">
                        <span>${item.text}</span>
                        <button data-id="${item.id}">Details</button>
                    </div>
                    <div class="services__item-arrow">
                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16" fill="none">
                            <path
                                d="M1.84619 9.84612L15.0067 9.84612L12.0049 12.8479C11.6586 13.1941 11.464 13.6636 11.4639 14.1533C11.4638 14.643 11.6582 15.1126 12.0043 15.4589C12.3505 15.8053 12.82 15.9999 13.3097 16C13.7994 16.0001 14.269 15.8057 14.6154 15.4595L19.0288 11.0461C19.8352 10.2375 20.2881 9.14203 20.2881 8C20.2881 6.85797 19.8352 5.76255 19.0288 4.95391L14.6154 0.540453C14.269 0.194291 13.7994 -0.000116348 13.3097 0C12.82 0.000115395 12.3505 0.194745 12.0043 0.54107C11.6582 0.887395 11.4638 1.35705 11.4639 1.84671C11.464 2.33637 11.6586 2.80593 12.0049 3.15209L15.0067 6.15388L1.84619 6.15388C1.35657 6.15388 0.887005 6.34838 0.540791 6.6946C0.194576 7.04081 7.24792e-05 7.51038 7.24792e-05 8C7.24792e-05 8.48962 0.194576 8.95919 0.540791 9.3054C0.887005 9.65162 1.35657 9.84612 1.84619 9.84612Z"
                                fill="" />
                        </svg>
                    </div>
                </div>
            `;

            servicesElement.addEventListener('click', () => {
                if (servicesElement.classList.contains('services__item--active')) return;

                const activeItems = document.querySelectorAll('.services__item--active');
                activeItems.forEach(activeItem => {
                    activeItem.classList.remove('services__item--active');
                    const activeText = activeItem.querySelector('.services__item-text');
                    if (activeText) {
                        activeText.style.maxHeight = `0px`;
                    }
                });

                servicesElement.classList.add('services__item--active');
                const servicesItemTxt = servicesElement.querySelector('.services__item-text');
                if (servicesItemTxt) {
                    servicesItemTxt.style.maxHeight = `${servicesItemTxt.scrollHeight}px`;
                }
            });

            servicesList.appendChild(servicesElement);
        });

        const servicesBtn = document.querySelectorAll('.services__item-text button');
        const servicesModal = document.querySelector('[data-modal="services"]');

        servicesBtn.forEach(btnItem => {
            btnItem.addEventListener('click', (event) => {
                const serviceId = event.target.getAttribute('data-id');
                const serviceData = data.find(item => item.id == serviceId);

                let modalS = document.createElement('div');
                modalS.classList.add('modal', 'modal-info', 'modal--active');
                modalS.innerHTML = `

<button class="modal__btn-close">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90" fill="none">
        <path
            d="M86.9183 28.6336C83.1318 18.9356 76.0999 10.8505 67.0206 5.75595C57.9412 0.661382 47.3763 -1.12745 37.126 0.69425C26.8756 2.51595 17.574 7.83547 10.806 15.7464C4.03805 23.6574 0.222474 33.6703 0.00942346 44.0791C-0.203627 54.4879 3.19903 64.6486 9.63761 72.8299C16.0762 81.0111 25.1523 86.7068 35.3196 88.9464C45.4868 91.1861 56.1161 89.831 65.3963 85.1123C74.6764 80.3935 82.0334 72.6029 86.2135 63.0679L85.1019 62.5806C81.0345 71.8584 73.8761 79.4389 64.8462 84.0304C55.8163 88.6219 45.4737 89.9404 35.5807 87.7612C25.6876 85.582 16.8563 80.0399 10.5914 72.0793C4.32642 64.1187 1.01553 54.232 1.22284 44.104C1.43014 33.9759 5.14281 24.233 11.7282 16.5354C18.3137 8.83781 27.3644 3.66176 37.3383 1.88919C47.3122 0.116626 57.5922 1.85721 66.4267 6.81438C75.2611 11.7716 82.1034 19.6386 85.7877 29.075L86.9183 28.6336Z"
            fill="" />
        <path
            d="M59.5545 57.4752C60.1485 58.0693 60.1485 58.9604 59.5545 59.5545C59.2574 59.8515 58.8119 60 58.5148 60C58.2178 60 57.7723 59.8515 57.4752 59.5545L45 47.0792L32.5248 59.5545C32.2277 59.8515 31.7822 60 31.4851 60C31.1881 60 30.7426 59.8515 30.4455 59.5545C29.8515 58.9604 29.8515 58.0693 30.4455 57.4752L42.9208 45L30.4455 32.5248C29.8515 31.9307 29.8515 31.0396 30.4455 30.4455C31.0396 29.8515 31.9307 29.8515 32.5248 30.4455L45 42.9208L57.4752 30.4455C58.0693 29.8515 58.9604 29.8515 59.5545 30.4455C60.1485 31.0396 60.1485 31.9307 59.5545 32.5248L47.0792 45L59.5545 57.4752Z"
            fill="" />
    </svg>
</button>

<div class="modal-info__main">
    <div class="modal-info__header container">
        <h2>${serviceData.name}</h2>

        <button class="btn btn-link" data-modal-trigger="contact" type="button">
            <span>Join now</span>
            <div class="btn-link__icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="11" height="10" viewBox="0 0 11 10" fill="none">
                    <path
                        d="M3.20069 9.18619L7.36426 5.02263L7.36426 8.2065C7.36417 8.57375 7.50998 8.92599 7.7696 9.18573C8.02922 9.44548 8.38139 9.59145 8.74864 9.59153C9.11589 9.59162 9.46813 9.44581 9.72787 9.18619C9.98761 8.92657 10.1336 8.5744 10.1337 8.20715L10.1337 3.52598C10.1325 2.66946 9.79172 1.84836 9.18607 1.24271C8.58042 0.63706 7.75932 0.296288 6.9028 0.29511L2.22163 0.29511C1.85438 0.295196 1.50221 0.441168 1.24259 0.700912C0.982967 0.960656 0.837163 1.3129 0.837249 1.68014C0.837335 2.04739 0.983306 2.39956 1.24305 2.65918C1.50279 2.9188 1.85503 3.06461 2.22228 3.06452H5.40616L1.24259 7.22809C0.982927 7.48775 0.837053 7.83992 0.837053 8.20714C0.837053 8.57436 0.982928 8.92653 1.24259 9.18619C1.50225 9.44585 1.85443 9.59173 2.22164 9.59173C2.58886 9.59173 2.94103 9.44585 3.20069 9.18619Z"
                        fill="#CCFD56" />
                </svg>
            </div>
        </button>
    </div>

    <div class="modal-info__content">
        <p id="modal-main-info">
            ${serviceData.text}
        </p>

        <h3>Technologies Covered in the Course</h3>

        <ul class="modal-info__list">
        ${serviceData.technologies.map(topic => `<li><span>${topic}</span></li>`).join('')}
           
        </ul>
    </div>
</div>

<div class="modal__list">

    <div class="modal__list-header modal__list-header--top">
        <div class="modal__list-name"></div>
        <div class="modal__list-date">
            <span class="modal__list-date-time">Weeks</span>
        </div>
        <div class="modal__list-arrow-wrapper"></div>
    </div>
    ${serviceData.programs.map(topic => `
    <div class="modal__list-item ">
                <div class="modal__list-header">
                    <div class="modal__list-name">
                        <span>${topic.name}</span>
                    </div>
                    <div class="modal__list-date">
                        <span>${topic.weeks}</span>
                    </div>
                    <div class="modal__list-arrow-wrapper">
                        <div class="modal__list-arrow">
                            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="16" viewBox="0 0 21 16"
                                fill="none">
                                <path
                                    d="M1.84619 9.84612L15.0067 9.84612L12.0049 12.8479C11.6586 13.1941 11.464 13.6636 11.4639 14.1533C11.4638 14.643 11.6582 15.1126 12.0043 15.4589C12.3505 15.8053 12.82 15.9999 13.3097 16C13.7994 16.0001 14.269 15.8057 14.6154 15.4595L19.0288 11.0461C19.8352 10.2375 20.2881 9.14203 20.2881 8C20.2881 6.85797 19.8352 5.76255 19.0288 4.95391L14.6154 0.540453C14.269 0.194291 13.7994 -0.000116348 13.3097 0C12.82 0.000115395 12.3505 0.194745 12.0043 0.54107C11.6582 0.887395 11.4638 1.35705 11.4639 1.84671C11.464 2.33637 11.6586 2.80593 12.0049 3.15209L15.0067 6.15388L1.84619 6.15388C1.35657 6.15388 0.887005 6.34838 0.540791 6.6946C0.194576 7.04081 7.24792e-05 7.51038 7.24792e-05 8C7.24792e-05 8.48962 0.194576 8.95919 0.540791 9.3054C0.887005 9.65162 1.35657 9.84612 1.84619 9.84612Z"
                                    fill="" />
                            </svg>
                        </div>
                    </div>
                </div>


                <div class="modal__list-content">
                    <div class="modal__list-content-item">
                        <h4>Topics Covered</h4>
                        <ul>
                        ${topic.Topics.map(it => `<li><span>${it}</span></li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal__list-content-item">
                        <h4>Technologies</h4>
                        <ul class="modal-info__list">
                        ${topic.technologies.map(it => `<li><span>${it}</span></li>`).join('')}
                        </ul>
                    </div>
                    <div class="modal__list-content-item">
                        <h4>Outcome</h4>
                        <ul>
                            <li>

                                <span>${topic.Outcome}</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
    `).join('')}
</div>

`;

                document.body.appendChild(modalS);
                document.body.style.overflow = 'hidden';
                const contactButtons = document.querySelectorAll('.modal-info [data-modal-trigger="contact"]');
                openModal(contactButtons, contactModal);


                const closeModal = modalS.querySelector('.modal__btn-close');
                closeModal.addEventListener('click', () => {
                    modalS.remove();
                    document.body.style.overflow = 'auto';
                });

                let modalListItems = document.querySelectorAll('.modal__list-item');

                modalListItems.forEach(item => {
                    item.addEventListener('click', () => {

                        modalListItems.forEach(listItem => {
                            listItem.classList.remove('modal__list-item--active');
                            listItem.querySelector('.modal__list-content').style.maxHeight = '0px';
                        });

                        item.classList.add('modal__list-item--active');
                        item.querySelector('.modal__list-content').style.maxHeight = `${item.querySelector('.modal__list-content').scrollHeight}px`;
                    });
                });

            });


        });





    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });




