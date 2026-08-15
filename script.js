document.addEventListener('DOMContentLoaded', () => {

    // ССЫЛКИ И ПЕРЕМЕННЫЕ ДЛЯ ИНТЕГРАЦИИ
    const GOOGLE_DRIVE_LINK = 'https://drive.google.com/file/d/11nVx2ksJ_mQkzvfGd7Ess4x6J-C1PENF/view';
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxuJ4Cyiyj50xcxeEnIZPTKsxhbJjQS4jOaltBgREshSg9JUSRfDIkv7pNph2fLXvbx/exec';

    // Функция переключения языков - ГЛОБАЛЬНАЯ
    window.setLanguage = function(lang) {
        // Обновляем активный класс у кнопок переключателя
        document.querySelectorAll('.lang-switch').forEach(el => el.classList.remove('active'));
        const btnElement = document.getElementById('btn-' + lang);
        if (btnElement) {
            btnElement.classList.add('active');
        }
        
        // Фиксируем активный язык на тэге body для корректной работы CSS
        document.body.setAttribute('data-active-lang', lang);
        localStorage.setItem('site_lang', lang); // Сохраняем выбранный язык

        // Переключаем видимость элементов с data-lang
        document.querySelectorAll('[data-lang]').forEach(el => {
            if (el.getAttribute('data-lang') === lang) {
                el.style.display = '';
            } else {
                el.style.display = 'none';
            }
        });
        
        // Обновляем плейсхолдеры у инпутов если есть data-i18n-placeholder
        updatePlaceholders(lang);
        
        // Обновляем тексты элементов с data-i18n (баннер гайда и другие)
        updateI18nElements(lang);
        
        // Обновляем тексты модального окна гайда
        updateModalTexts(lang);
    };
    
    // Функция обновления плейсхолдеров
    function updatePlaceholders(lang) {
        const placeholders = {
            'guideName': {
                ru: 'Как к вам обращаться',
                en: 'Your name',
                ua: 'Як до вас звертатися'
            },
            'guidePhone': {
                ru: " (___) ___-__-__",
                en: " (___) ___-__-__",
                ua: " (___) ___-__-__"
            },
            'guideEmail': {
                ru: 'Ваш E-mail',
                en: 'Your E-mail',
                ua: 'Ваш E-mail'
            }
        };
        
        for (const [id, texts] of Object.entries(placeholders)) {
            const input = document.getElementById(id);
            if (input && texts[lang]) {
                input.placeholder = texts[lang];
            }
        }
    }
    
    // Функция обновления текстов элементов с data-i18n (баннер гайда и другие)
    function updateI18nElements(lang) {
        const translations = {
            guide_banner_badge: {
                ru: '✦ АРТ-ПРАКТИКУМ + СКИДКА 20% ✦',
                en: '✦ ART PRACTICUM + 20% OFF ✦',
                ua: '✦ АРТ-ПРАКТИКУМ + ЗНИЖКА 20% ✦'
            },
            guide_banner_title: {
                ru: '«Тихое искусство быть собой»',
                en: '"The Quiet Art of Being Yourself"',
                ua: '«Тихе мистецтво бути собою»'
            },
            guide_banner_subtitle: {
                ru: 'Пошаговый путь к себе через медитативное рисование',
                en: 'A step-by-step path to yourself through meditative drawing',
                ua: 'Покроковий шлях до себе через медитативне малювання'
            },
            guide_banner_desc: {
                ru: 'Авторский гайд с практиками и упражнениями, которые помогают замедлиться, успокоить ум и почувствовать внутреннюю опору. Он создан для тех, кто устал от спешки и хочет мягко вернуться к себе — через внимание, наблюдение и простые творческие практики.',
                en: "Author's guide with practices and exercises that help you slow down, calm your mind and feel inner support. It is created for those who are tired of haste and want to gently return to themselves — through attention, observation and simple creative practices.",
                ua: "Авторський гайд з практиками та вправами, які допомагають сповільнитися, заспокоїти розум і відчути внутрішню опору. Він створений для тих, хто втомився від поспіху і хоче м'яко повернутися до себе — через увагу, спостереження і прості творчі практики."
            },
            guide_banner_btn: {
                ru: '✦ Забрать гайд и скидку 20% ✦',
                en: '✦ Get the Guide and 20% Discount ✦',
                ua: '✦ Отримати гайд і знижку 20% ✦'
            }
        };
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });
    }
    
    // Функция обновления текстов в модальном окне гайда
    function updateModalTexts(lang) {
        const modalTitle = document.querySelector('#guideModal .modal-title');
        const modalDesc = document.querySelector('#guideModal .modal-description');
        const formHint = document.querySelector('#guideModal .form-hint');
        const submitBtn = document.querySelector('#guideModal .btn-accent');
        const checkboxLabel = document.querySelector('#guideModal .checkbox-label');
        const messengerLabel = document.querySelector('#guideModal .messenger-label');
        const successTitle = document.querySelector('#modalSuccessBlock .modal-title');
        const copyBtn = document.querySelector('#modalSuccessBlock .btn-copy');
        const promoHint = document.querySelector('#modalSuccessBlock .form-hint');
        const toOrderLink = document.querySelector('#modalSuccessBlock .catalog-link');
        const downloadBtn = document.querySelector('#modalSuccessBlock .download-btn');
        
        const translations = {
            guide_modal_title: {
                ru: '✦⪼ «Тихое искусство быть собой» ⪻✦',
                en: '✦⪼ "The Quiet Art of Being Yourself" ⪻✦',
                ua: '✦⪼ «Тихе мистецтво бути собою» ⪻✦'
            },
            guide_modal_desc: {
                ru: 'Пошаговый путь к себе через медитативное рисование. Авторский гайд с практиками, которые помогут замедлиться, успокоить ум и найти внутреннюю опору.',
                en: "A step-by-step journey to yourself through meditative drawing. Author's guide with practices to help you slow down, calm your mind and find inner support.",
                ua: 'Покроковий шлях до себе через медитативне малювання. Авторський гайд з практиками, які допоможуть сповільнитися, заспокоїти розум і знайти внутрішню опору.'
            },
            guide_ph_name: {
                ru: 'Как к вам обращаться',
                en: 'Your Name',
                ua: 'Як до вас звертатися'
            },
            guide_ph_phone: {
                ru: "+7 (___) ___-__-__",
                en: "+1 (___) ___-__-__",
                ua: "+380 (___) ___-__-__"
            },
            guide_ph_email: {
                ru: 'Ваш E-mail',
                en: 'Your E-mail',
                ua: 'Ваш E-mail'
            },
            guide_contact_label: {
                ru: 'Предпочитаемый способ связи:',
                en: 'Preferred contact method:',
                ua: "Бажаний спосіб зв'язку:"
            },
            guide_privacy_text: {
                ru: 'Согласен(на) на обработку персональных данных',
                en: 'I agree to the processing of personal data',
                ua: 'Згоден(на) на обробку персональних даних'
            },
            guide_form_hint: {
                ru: 'После отправки формы вы сможете сразу скачать PDF-гайд и получить промокод 20% на первую покупку.',
                en: 'After submitting the form you can immediately download the PDF guide and get a 20% promo code for your first purchase.',
                ua: 'Після відправки форми ви зможете одразу завантажити PDF-гайд і отримати промокод 20% на першу покупку.'
            },
            guide_submit_btn: {
                ru: '✦ Забрать гайд и скидку 20% ✦',
                en: '✦ Get Guide & 20% Off ✦',
                ua: '✦ Забрати гайд та знижку 20% ✦'
            },
            guide_success_title: {
                ru: '✦⪼ Ваш гайд «Тихое искусство быть собой» готов! ⪻✦',
                en: '✦⪼ Your guide "The Quiet Art of Being Yourself" is ready! ⪻✦',
                ua: '✦⪼ Ваш гайд «Тихе мистецтво бути собою» готовий! ⪻✦'
            },
            guide_download_btn: {
                ru: '✦ СКАЧАТЬ PDF-ГАЙД ✦',
                en: '✦ DOWNLOAD PDF GUIDE ✦',
                ua: '✦ ЗАВАНТАЖИТИ PDF-ГАЙД ✦'
            },
            guide_copy_btn: {
                ru: 'Скопировать',
                en: 'Copy',
                ua: 'Скопіювати'
            },
            guide_success_desc: {
                ru: 'Вы можете скачать PDF прямо сейчас, а ваш промокод на 20% скопировать ниже:',
                en: 'You can download the PDF right now, and copy your 20% promo code below:',
                ua: 'Ви можете завантажити PDF просто зараз, а ваш промокод на 20% скопіювати нижче:'
            },
            guide_promo_label: {
                ru: 'Ваш промокод:',
                en: 'Your promo code:',
                ua: 'Ваш промокод:'
            },
            guide_promo_hint: {
                ru: 'Промокод продублирован в ваш выбранный способ связи.',
                en: 'Promo code has been sent to your preferred contact method.',
                ua: "Промокод продубльовано у ваш обраний спосіб зв'язку."
            },
            guide_services_btn: {
                ru: 'Перейти к заказу →',
                en: 'Go to Services →',
                ua: 'Перейти до послуг →'
            },
            modalTitle: {
                ru: '✦⪼ «Тихое искусство быть собой» ⪻✦',
                en: '✦⪼ "The Quiet Art of Being Yourself" ⪻✦',
                ua: '✦⪼ «Тихе мистецтво бути собою» ⪻✦'
            },
            modalDescription: {
                ru: 'Пошаговый путь к себе через медитативное рисование. Авторский гайд с практиками, которые помогут замедлиться, успокоить ум и найти внутреннюю опору.',
                en: "A step-by-step journey to yourself through meditative drawing. Author's guide with practices to help you slow down, calm your mind and find inner support.",
                ua: 'Покроковий шлях до себе через медитативне малювання. Авторський гайд з практиками, які допоможуть сповільнитися, заспокоїти розум і знайти внутрішню опору.'
            },
            formHint: {
                ru: 'После отправки формы вы сможете сразу скачать PDF-гайд и получить промокод 20% на первую покупку.',
                en: 'After submitting the form you can immediately download the PDF guide and get a 20% promo code for your first purchase.',
                ua: 'Після відправки форми ви зможете одразу завантажити PDF-гайд і отримати промокод 20% на першу покупку.'
            },
            submitBtn: {
                ru: '✦ Забрать гайд и скидку 20% ✦',
                en: '✦ Get the Guide and 20% Discount ✦',
                ua: '✦ Отримати гайд і знижку 20% ✦'
            },
            checkboxLabel: {
                ru: 'Согласен(на) на обработку персональных данных',
                en: 'I agree to the processing of personal data',
                ua: 'Згоден(на) на обробку персональних даних'
            },
            messengerLabel: {
                ru: 'Предпочитаемый способ связи:',
                en: 'Preferred contact method:',
                ua: "Бажаний спосіб зв'язку:"
            },
            successTitle: {
                ru: '✦⪼ Ваш гайд «Тихое искусство быть собой» готов! ⪻✦',
                en: '✦⪼ Your Guide "The Quiet Art of Being Yourself" is Ready! ⪻✦',
                ua: '✦⪼ Ваш гайд «Тихе мистецтво бути собою» готовий! ⪻✦'
            },
            downloadBtn: {
                ru: '✦ СКАЧАТЬ PDF-ГАЙД ✦',
                en: '✦ DOWNLOAD PDF GUIDE ✦',
                ua: '✦ ЗАВАНТАЖИТИ PDF-ГАЙД ✦'
            },
            copyBtn: {
                ru: 'Скопировать',
                en: 'Copy',
                ua: 'Копіювати'
            },
            promoHint: {
                ru: 'Промокод продублирован в ваш выбранный способ связи.',
                en: 'Promo code has been sent to your preferred contact method.',
                ua: "Промокод продубльовано у ваш обраний спосіб зв'язку."
            },
            toOrderLink: {
                ru: 'Перейти к заказу →',
                en: 'Proceed to Order →',
                ua: 'Перейти до замовлення →'
            },
            copiedMsg: {
                ru: 'Скопировано! ✦',
                en: 'Copied! ✦',
                ua: 'Скопійовано! ✦'
            }
        };
        if (modalTitle) modalTitle.textContent = translations.modalTitle[lang] || translations.modalTitle.ru;
        if (modalDesc) modalDesc.textContent = translations.modalDescription[lang] || translations.modalDescription.ru;
        if (formHint) formHint.textContent = translations.formHint[lang] || translations.formHint.ru;
        if (submitBtn) submitBtn.textContent = translations.submitBtn[lang] || translations.submitBtn.ru;
        if (checkboxLabel) checkboxLabel.textContent = translations.checkboxLabel[lang] || translations.checkboxLabel.ru;
        if (messengerLabel) messengerLabel.textContent = translations.messengerLabel[lang] || translations.messengerLabel.ru;
        if (successTitle) successTitle.textContent = translations.successTitle[lang] || translations.successTitle.ru;
        if (downloadBtn) downloadBtn.textContent = translations.downloadBtn[lang] || translations.downloadBtn.ru;
        if (copyBtn) {
            // Сохраняем оригинальный текст если кнопка еще не была нажата
            if (!copyBtn.dataset.original) {
                copyBtn.dataset.original = copyBtn.textContent;
            }
            copyBtn.textContent = translations.copyBtn[lang] || translations.copyBtn.ru;
        }
        if (promoHint) promoHint.textContent = translations.promoHint[lang] || translations.promoHint.ru;
        if (toOrderLink) toOrderLink.textContent = translations.toOrderLink[lang] || translations.toOrderLink.ru;

        // Обновляем текст описания успеха и лейбл промокода
        const successDesc = document.querySelector('#modalSuccessBlock .modal-description');
        const promoLabel = document.querySelector('#modalSuccessBlock .promo-label');
        if (successDesc) successDesc.textContent = translations.guide_success_desc[lang] || translations.guide_success_desc.ru;
        if (promoLabel) promoLabel.textContent = translations.guide_promo_label[lang] || translations.guide_promo_label.ru;
        
        // Обновляем бейджи мессенджеров
        document.querySelectorAll('.messenger-badge').forEach(badge => {
            const text = badge.textContent.trim();
            if (text === 'Telegram') {
                badge.textContent = lang === 'en' ? 'Telegram' : lang === 'ua' ? 'Telegram' : 'Telegram';
            } else if (text === 'WhatsApp') {
                badge.textContent = lang === 'en' ? 'WhatsApp' : lang === 'ua' ? 'WhatsApp' : 'WhatsApp';
            } else if (text === 'E-mail') {
                badge.textContent = lang === 'en' ? 'E-mail' : lang === 'ua' ? 'E-mail' : 'E-mail';
            }
        });
    }

    // Модальные окна для форм/гайдов
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        modal.classList.add('active');
        
        // Принудительно обновляем переводы при открытии модалки
        const currentLang = localStorage.getItem('site_lang') || 'ru';
        setLanguage(currentLang);
        
        // Переинициализируем intl-tel-input если это модалка гайда
        if (id === 'guideModal') {
            setTimeout(function() {
                initPhoneInput();
            }, 100);
        }
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
        } else if (event.target.classList.contains('modal-overlay')) {
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
    const savedLang = localStorage.getItem('site_lang') || 'ru';
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
            // Обновляем тексты модального окна при открытии
            const currentLang = document.body.getAttribute('data-active-lang') || 'ru';
            updateModalTexts(currentLang);
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            // С задержкой 300ms очищаем поля формы и возвращаем экран к форме
            setTimeout(() => {
                const formBlock = document.getElementById('modalFormBlock');
                const successBlock = document.getElementById('modalSuccessBlock');
                
                // Очищаем поля формы
                const nameInput = document.getElementById('guideName');
                const phoneInput = document.getElementById('guidePhone');
                const emailInput = document.getElementById('guideEmail');
                const consentCheckbox = document.getElementById('privacyConsent');
                
                if (nameInput) nameInput.value = '';
                if (phoneInput) phoneInput.value = '';
                if (emailInput) emailInput.value = '';
                if (consentCheckbox) consentCheckbox.checked = true;
                
                // Сбрасываем ошибки валидации
                document.querySelectorAll('.form-group.error').forEach(el => {
                    el.classList.remove('error');
                });
                
                // Возвращаем экран к форме
                if (formBlock) formBlock.style.display = 'block';
                if (successBlock) successBlock.style.display = 'none';
                
                // Сбрасываем текст кнопки копирования с учетом текущего языка
                const currentLang = document.body.getAttribute('data-active-lang') || 'ru';
                const copyBtn = document.querySelector('.btn-copy');
                if (copyBtn) {
                    const copyTexts = { ru: 'Скопировать', en: 'Copy', ua: 'Копіювати' };
                    copyBtn.textContent = copyTexts[currentLang] || copyTexts.ru;
                }
            }, 300);
            
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };
    
    // Функция для перехода к заказу из экрана успеха
    window.goToServices = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
        
        // Плавный скролл к блоку услуг
        const servicesSection = document.getElementById('services');
        if (servicesSection) {
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Инициализация intl-tel-input для поля телефона
    let phoneInputInstance;
    function initPhoneInput() {
        const phoneInput = document.getElementById('guidePhone');
        if (phoneInput && typeof intlTelInput !== 'undefined') {
            // Уничтожаем предыдущий инстанс если есть
            if (phoneInputInstance) {
                phoneInputInstance.destroy();
            }
            
            phoneInputInstance = intlTelInput(phoneInput, {
                initialCountry: 'auto',
                geoIpLookup: function(callback) {
                    fetch('https://ipapi.co/json')
                        .then(function(res) { return res.json(); })
                        .then(function(data) { callback(data.country_code); })
                        .catch(function() { callback('ru'); });
                },
                preferredCountries: ['ru', 'ua', 'us', 'de', 'kz'],
                separateDialCode: true,
                autoPlaceholder: 'polite',
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
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
        
        // Валидация телефона через intl-tel-input
        const phoneInput = document.getElementById('guidePhone');
        const phoneGroup = phoneInput ? phoneInput.closest('.form-group') : null;
        if (!phoneInput || !phoneInputInstance || !phoneInputInstance.isValidNumber()) {
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
        
        // Собираем данные формы
        const leadData = {
            name: document.getElementById('guideName').value,
            phone: phoneInputInstance ? phoneInputInstance.getNumber() : document.getElementById('guidePhone').value,
            email: document.getElementById('guideEmail').value,
            preferredContact: getSelectedContactMethod(),
            promoCode: 'MEDITATION20',
            date: new Date().toLocaleString('ru-RU')
        };

        // Отправляем данные в Google Таблицу (без ожидания ответа)
        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(err => console.error('Ошибка отправки:', err));
        
        // Сразу переключаем интерфейс на экран успеха
        const formBlock = document.getElementById('modalFormBlock');
        const successBlock = document.getElementById('modalSuccessBlock');
        
        if (formBlock && successBlock) {
            formBlock.style.display = 'none';
            successBlock.style.display = 'block';
            
            // Настраиваем ссылку на гайд
            const downloadBtn = successBlock.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.href = GOOGLE_DRIVE_LINK;
                downloadBtn.target = '_blank';
            }
        }
    };
    
    // Функция получения выбранного способа связи
    function getSelectedContactMethod() {
        const selected = document.querySelector('input[name="messenger"]:checked');
        if (selected) {
            const value = selected.value;
            if (value === 'telegram') return 'Telegram';
            if (value === 'whatsapp') return 'WhatsApp';
            if (value === 'email') return 'E-mail';
        }
        return '';
    }

    window.copyPromoCode = function() {
        const activeLang = document.body.getAttribute('data-active-lang') || 'ru';
        const copiedMsg = {
            ru: 'Скопировано! ✦',
            en: 'Copied! ✦',
            ua: 'Скопійовано! ✦'
        };
        
        navigator.clipboard.writeText('MEDITATION20').then(function() {
            const copyBtn = document.querySelector('.btn-copy');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = copiedMsg[activeLang] || copiedMsg.ru;
                setTimeout(function() {
                    copyBtn.textContent = originalText;
                }, 2000);
            }
        }).catch(function(err) {
            console.error('Ошибка копирования: ', err);
        });
    };

    // Инициализация intl-tel-input при загрузке страницы
    initPhoneInput();

});
