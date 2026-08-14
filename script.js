document.addEventListener('DOMContentLoaded', () => {

    // Функция переключения языков
    function setLanguage(lang) {
        document.querySelectorAll('.lang-switch').forEach(el => el.classList.remove('active'));
        document.getElementById('btn-' + lang).classList.add('active');
        
        // Фиксируем активный язык на тэге body для корректной работы CSS
        document.body.setAttribute('data-active-lang', lang);
        localStorage.setItem('selectedLang', lang); // Сохраняем выбранный язык

        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === lang) {
                // Используем '' для возврата к естественному CSS-отображению элемента (inline для span, block для div и т.д.)
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
    }

    // Модальные окна для форм/гайдов
    window.openModal = function(id) {
        document.getElementById(id).classList.add('active');
    };

    window.closeModal = function(id) {
        document.getElementById(id).classList.remove('active');
    };

    // Функции для модального окна просмотра изображений
    window.openImageViewerModal = function(src) {
        document.getElementById('image-viewer-modal-img').src = src;
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку сайта
    };

    window.closeImageViewerModal = function() {
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto'; // Возвращаем прокрутку
    };

    // Фильтрация категорий (для portfolio.html)
    window.filterSelection = function(category, element) {
        const items = document.querySelectorAll('.portfolio-item');
        const buttons = document.querySelectorAll('.filter-btn');

        buttons.forEach(btn => btn.classList.remove('active'));
        if (element) {
            element.classList.add('active');
        }

        items.forEach(item => {
            if (category === 'all' || item.classList.contains(category)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    };

    // Общий обработчик закрытия по клику вне модального окна
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) {
            event.target.classList.remove('active');
        } else if (event.target.id === 'image-viewer-modal') {
            closeImageViewerModal();
        } else if (event.target.id === 'guideModal') {
            closeGuideModal();
        }
    };

    // JAVASCRIPT ЗАЩИТА АВТОРСКИХ ПРАВ (Блокировка контекстного меню и drag-and-drop)
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
        }
    });
    document.addEventListener('dragstart', function(e) {
        if (e.target.tagName === 'IMG' || e.target.tagName === 'VIDEO') {
            e.preventDefault();
        }
    });

    // Закрытие модального окна по кнопке Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            const guideModal = document.getElementById('guideModal');
            const guideModalOld = document.getElementById('guide-modal');
            const orderModal = document.getElementById('order-modal');
            const imageViewer = document.getElementById('image-viewer-modal');
            const guidePageModal = document.getElementById('guide-page-modal');

            if (guideModal && guideModal.classList.contains('active')) {
                closeGuideModal();
            } else if (guideModalOld && guideModalOld.classList.contains('active')) {
                closeModal('guide-modal');
            } else if (orderModal && orderModal.classList.contains('active')) {
                closeModal('order-modal');
            } else if (imageViewer && !imageViewer.classList.contains('hidden')) {
                closeImageViewerModal();
            } else if (guidePageModal && !guidePageModal.classList.contains('hidden')) {
                closeGuidePageModal();
            }
        }
    });

    // Инициализация при загрузке
    const savedLang = localStorage.getItem('selectedLang') || 'ru';
    setLanguage(savedLang);
    
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    /**
     * Функции для модального окна просмотра страниц гайда
     */
    const guidePageData = {
        1: {
            number: '01',
            title: {
                ru: 'Арт-медитация',
                en: 'Art Meditation',
                ua: 'Арт-медитація'
            },
            footer: {
                ru: 'Основы осознанного рисования',
                en: 'Mindful Drawing Basics',
                ua: 'Основи усвідомленого малювання'
            },
            svg: `<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5">
                    <path d="M50,20 Q50,55 15,55 Q50,55 50,90 Q50,55 85,55 Q50,55 50,20 Z" fill="#6c2603" fill-opacity="0.15"/>
                    <circle cx="50" cy="45" r="8" fill="none" stroke="#6c2603" stroke-width="1.2"/>
                    <path d="M35,70 Q50,85 65,70" fill="none" stroke="#6c2603" stroke-width="1.2"/>
                  </svg>`
        },
        2: {
            number: '02',
            title: {
                ru: 'Материалы',
                en: 'Materials',
                ua: 'Матеріали'
            },
            footer: {
                ru: 'Выбор инструментов',
                en: 'Choosing Your Tools',
                ua: 'Вибір інструментів'
            },
            svg: `<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5">
                    <rect x="30" y="25" width="40" height="60" rx="3" fill="#6c2603" fill-opacity="0.1" stroke="#6c2603" stroke-width="1.2"/>
                    <line x1="40" y1="40" x2="60" y2="40" stroke="#6c2603" stroke-width="1"/>
                    <line x1="40" y1="50" x2="60" y2="50" stroke="#6c2603" stroke-width="1"/>
                    <line x1="40" y1="60" x2="60" y2="60" stroke="#6c2603" stroke-width="1"/>
                    <circle cx="75" cy="35" r="10" fill="none" stroke="#6c2603" stroke-width="1.2"/>
                    <path d="M70,30 L80,40 M80,30 L70,40" stroke="#6c2603" stroke-width="1.2"/>
                  </svg>`
        },
        3: {
            number: '03',
            title: {
                ru: 'Практика',
                en: 'Practice',
                ua: 'Практика'
            },
            footer: {
                ru: 'Техники и упражнения',
                en: 'Techniques & Exercises',
                ua: 'Техніки та вправи'
            },
            svg: `<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5">
                    <path d="M25,80 Q35,60 50,60 Q65,60 75,80" fill="none" stroke="#6c2603" stroke-width="1.5"/>
                    <path d="M30,70 Q40,55 50,55 Q60,55 70,70" fill="none" stroke="#6c2603" stroke-width="1.2"/>
                    <circle cx="50" cy="40" r="12" fill="none" stroke="#6c2603" stroke-width="1.2"/>
                    <path d="M45,35 L50,42 L55,35" fill="none" stroke="#6c2603" stroke-width="1"/>
                  </svg>`
        }
    };

    window.openGuidePageModal = function(pageNum) {
        const data = guidePageData[pageNum];
        if (!data) return;

        const activeLang = document.body.getAttribute('data-active-lang') || 'ru';

        document.getElementById('modal-page-number').textContent = data.number;
        document.getElementById('modal-page-title').textContent = data.title[activeLang];
        document.getElementById('modal-page-art').innerHTML = data.svg;
        document.getElementById('modal-page-footer').textContent = data.footer[activeLang];

        const modal = document.getElementById('guide-page-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeGuidePageModal = function() {
        const modal = document.getElementById('guide-page-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    /**
     * Функции для модального окна гайда #guideModal
     */
    window.openGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Инициализация маски телефона с помощью IMask
    let phoneMask;
    function initPhoneMask() {
        const phoneInput = document.getElementById('guidePhone');
        if (phoneInput && typeof IMask !== 'undefined') {
            phoneMask = IMask(phoneInput, {
                mask: '+{7} (000) 000-00-00',
                lazy: false,
                placeholder: '+7 (___) ___-__-__'
            });
        }
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;
        
        // Проверка honeypot (защита от ботов)
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value) {
            // Бот заполнил скрытое поле - игнорируем форму
            return false;
        }
        
        // Валидация имени
        const nameInput = document.getElementById('guideName');
        const nameGroup = nameInput ? nameInput.closest('.form-group') : null;
        if (!nameInput || !nameInput.value.trim()) {
            if (nameGroup) nameGroup.classList.add('error');
            isValid = false;
        } else if (nameGroup) {
            nameGroup.classList.remove('error');
        }
        
        // Валидация телефона (должен быть полностью заполнен по маске)
        const phoneInput = document.getElementById('guidePhone');
        const phoneGroup = phoneInput ? phoneInput.closest('.form-group') : null;
        const phoneValue = phoneInput ? phoneInput.value.replace(/\D/g, '') : '';
        if (!phoneInput || phoneValue.length !== 11) {
            if (phoneGroup) phoneGroup.classList.add('error');
            isValid = false;
        } else if (phoneGroup) {
            phoneGroup.classList.remove('error');
        }
        
        // Валидация email
        const emailInput = document.getElementById('guideEmail');
        const emailGroup = emailInput ? emailInput.closest('.form-group') : null;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) {
            if (emailGroup) emailGroup.classList.add('error');
            isValid = false;
        } else if (emailGroup) {
            emailGroup.classList.remove('error');
        }
        
        // Валидация чекбокса согласия
        const consentCheckbox = document.getElementById('privacyConsent');
        const consentGroup = consentCheckbox ? consentCheckbox.closest('.checkbox-group') : null;
        if (!consentCheckbox || !consentCheckbox.checked) {
            if (consentGroup) consentGroup.classList.add('error');
            isValid = false;
        } else if (consentGroup) {
            consentGroup.classList.remove('error');
        }
        
        return isValid;
    }

    window.handleGuideSubmit = function(event) {
        event.preventDefault();
        
        // Проверяем валидность формы
        if (!validateForm()) {
            return;
        }
        
        // Скрываем форму, показываем экран успеха
        const formBlock = document.getElementById('modalFormBlock');
        const successBlock = document.getElementById('modalSuccessBlock');
        
        if (formBlock && successBlock) {
            formBlock.style.display = 'none';
            successBlock.style.display = 'block';
        }
    };

    window.copyPromoCode = function() {
        const promoCode = document.getElementById('promoCode');
        if (promoCode) {
            navigator.clipboard.writeText(promoCode.textContent).then(function() {
                const copyBtn = document.querySelector('.btn-copy');
                if (copyBtn) {
                    const originalText = copyBtn.textContent;
                    copyBtn.textContent = 'Скопировано!';
                    setTimeout(function() {
                        copyBtn.textContent = originalText;
                    }, 2000);
                }
            }).catch(function(err) {
                console.error('Ошибка копирования: ', err);
            });
        }
    };

    // Инициализация маски при загрузке страницы
    initPhoneMask();

});
