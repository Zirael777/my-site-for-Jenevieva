document.addEventListener('DOMContentLoaded', () => {
    // Инициализация констант
    const GOOGLE_DRIVE_LINK = 'https://drive.google.com/file/d/11nVx2ksJ_mQkzvfGd7Ess4x6J-C1PENF/view';
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxuJ4Cyiyj50xcxeEnIZPTKsxhbJjQS4jOaltBgREshSg9JUSRfDIkv7pNph2fLXvbx/exec';
    const PROMO_CODE = 'MEDITATION20';

    // Объект переводов
    const translations = {
        placeholders: {
            guideName: { ru: 'Как к вам обращаться', en: 'Your name', ua: 'Як до вас звертатися' },
            guidePhone: { ru: ' (___) ___-__-__', en: ' (___) ___-__-__', ua: ' (___) ___-__-__' },
            guideEmail: { ru: 'Ваш E-mail', en: 'Your E-mail', ua: 'Ваш E-mail' }
        },
        i18n: {
            guide_banner_badge: { ru: 'АРТ-ПРАКТИКУМ + СКИДКА 20%', en: 'ART PRACTICUM + 20% OFF', ua: 'АРТ-ПРАКТИКУМ + ЗНИЖКА 20%' },
            guide_banner_title: { ru: 'Тихое искусство быть собой', en: 'The Quiet Art of Being Yourself', ua: 'Тихе мистецтво бути собою' },
            guide_banner_subtitle: { ru: 'Пошаговый путь к себе через медитативное рисование', en: 'A step-by-step path to yourself through meditative drawing', ua: 'Покроковий шлях до себе через медитативне малювання' },
            guide_banner_desc: { ru: 'Авторский гайд с практиками и упражнениями, которые помогают замедлиться, успокоить ум и почувствовать внутреннюю опору. Он создан для тех, кто устал от спешки и хочет мягко вернуться к себе — через внимание, наблюдение и простые творческие практики.', en: "Author's guide with practices and exercises that help you slow down, calm your mind and feel inner support. It is created for those who are tired of haste and want to gently return to themselves — through attention, observation and simple creative practices.", ua: "Авторський гайд з практиками та вправами, які допомагають сповільнитися, заспокоїти розум і відчути внутрішню опору. Він створений для тих, хто втомився від поспіху і хоче м'яко повернутися до себе — через увагу, спостереження і прості творчі практики." },
            guide_banner_btn: { ru: 'Забрать гайд и скидку 20%', en: 'Get the Guide and 20% Discount', ua: 'Отримати гайд і знижку 20%' },
            nav_guide: { ru: 'Бесплатный гайд', en: 'Free Guide', ua: 'Безкоштовний гайд' }
        },
        modal: {
            modalTitle: { ru: 'Тихое искусство быть собой', en: 'The Quiet Art of Being Yourself', ua: 'Тихе мистецтво бути собою' },
            modalDescription: { ru: 'Пошаговый путь к себе через медитативное рисование. Авторский гайд с практиками, которые помогут замедлиться, успокоить ум и найти внутреннюю опору.', en: "A step-by-step journey to yourself through meditative drawing. Author's guide with practices to help you slow down, calm your mind and find inner support.", ua: 'Покроковий шлях до себе через медитативне малювання. Авторський гайд з практиками, які допоможуть сповільнитися, заспокоїти розум і знайти внутрішню опору.' },
            formHint: { ru: 'После отправки формы вы сможете сразу скачать PDF-гайд и получить промокод 20% на первую покупку.', en: 'After submitting the form you can immediately download the PDF guide and get a 20% promo code for your first purchase.', ua: 'Після відправки форми ви зможете одразу завантажити PDF-гайд і отримати промокод 20% на першу покупку.' },
            submitBtn: { ru: 'Забрать гайд и скидку 20%', en: 'Get the Guide and 20% Discount', ua: 'Отримати гайд і знижку 20%' },
            checkboxLabel: { ru: 'Согласен(на) на обработку персональных данных', en: 'I agree to the processing of personal data', ua: 'Згоден(на) на обробку персональних даних' },
            messengerLabel: { ru: 'Предпочитаемый способ связи:', en: 'Preferred contact method:', ua: "Бажаний спосіб зв'язку:" },
            successTitle: { ru: 'Ваш гайд Тихое искусство быть собой готов!', en: 'Your Guide The Quiet Art of Being Yourself is Ready!', ua: 'Ваш гайд Тихе мистецтво бути собою готовый!' },
            downloadBtn: { ru: 'СКАЧАТЬ PDF-ГАЙД', en: 'DOWNLOAD PDF GUIDE', ua: 'ЗАВАНТАЖИТИ PDF-ГАЙД' },
            copyBtn: { ru: 'Скопировать', en: 'Copy', ua: 'Копіювати' },
            promoHint: { ru: 'Промокод продублирован в ваш выбранный способ связи.', en: 'Promo code has been sent to your preferred contact method.', ua: "Промокод продубльовано у ваш обраний спосіб зв'язку." },
            toOrderLink: { ru: 'Перейти к заказу →', en: 'Proceed to Order →', ua: 'Перейти до замовлення →' },
            copiedMsg: { ru: 'Скопировано!', en: 'Copied!', ua: 'Скопійовано!' },
            guide_success_desc: { ru: 'Вы можете скачать PDF прямо сейчас, а ваш промокод на 20% скопировать ниже:', en: 'You can download the PDF right now, and copy your 20% promo code below:', ua: 'Ви можете завантажити PDF просто зараз, а ваш промокод на 20% скопіювати нижче:' },
            guide_promo_label: { ru: 'Ваш промокод:', en: 'Your promo code:', ua: 'Ваш промокод:' }
        },
        guidePages: {
            1: { number: '01', title: { ru: 'Арт-медитация', en: 'Art Meditation', ua: 'Арт-медитація' }, footer: { ru: 'Основы осознанного рисования', en: 'Mindful Drawing Basics', ua: 'Основи усвідомленого малювання' }, svg: '<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5"><path d="M50,20 Q50,55 15,55 Q50,55 50,90 Q50,55 85,55 Q50,55 50,20 Z" fill="#6c2603" fill-opacity="0.15"/><circle cx="50" cy="45" r="8" fill="none" stroke="#6c2603" stroke-width="1.2"/><path d="M35,70 Q50,85 65,70" fill="none" stroke="#6c2603" stroke-width="1.2"/></svg>' },
            2: { number: '02', title: { ru: 'Материалы', en: 'Materials', ua: 'Матеріали' }, footer: { ru: 'Выбор инструментов', en: 'Choosing Your Tools', ua: 'Вибір інструментів' }, svg: '<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5"><rect x="30" y="25" width="40" height="60" rx="3" fill="#6c2603" fill-opacity="0.1" stroke="#6c2603" stroke-width="1.2"/><line x1="40" y1="40" x2="60" y2="40" stroke="#6c2603" stroke-width="1"/><line x1="40" y1="50" x2="60" y2="50" stroke="#6c2603" stroke-width="1"/><line x1="40" y1="60" x2="60" y2="60" stroke="#6c2603" stroke-width="1"/><circle cx="75" cy="35" r="10" fill="none" stroke="#6c2603" stroke-width="1.2"/><path d="M70,30 L80,40 M80,30 L70,40" stroke="#6c2603" stroke-width="1.2"/></svg>' },
            3: { number: '03', title: { ru: 'Практика', en: 'Practice', ua: 'Практика' }, footer: { ru: 'Техники и упражнения', en: 'Techniques & Exercises', ua: 'Техніки та вправи' }, svg: '<svg viewBox="0 0 100 120" fill="none" stroke="#6c2603" stroke-width="1.5"><path d="M25,80 Q35,60 50,60 Q65,60 75,80" fill="none" stroke="#6c2603" stroke-width="1.5"/><path d="M30,70 Q40,55 50,55 Q60,55 70,70" fill="none" stroke="#6c2603" stroke-width="1.2"/><circle cx="50" cy="40" r="12" fill="none" stroke="#6c2603" stroke-width="1.2"/><path d="M45,35 L50,42 L55,35" fill="none" stroke="#6c2603" stroke-width="1"/></svg>' }
        }
    };

    let phoneInputInstance = null;

    // Обновление плейсхолдеров
    function updatePlaceholders(lang) {
        Object.entries(translations.placeholders).forEach(([id, texts]) => {
            const input = document.getElementById(id);
            if (input && texts[lang]) input.placeholder = texts[lang];
        });
    }

    // Обновление элементов с data-i18n
    function updateI18nElements(lang) {
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations.i18n[key] && translations.i18n[key][lang]) {
                el.textContent = translations.i18n[key][lang];
            }
        });
    }

    // Обновление текстов модального окна
    function updateModalTexts(lang) {
        const t = translations.modal;
        const set = (selector, key) => {
            const el = document.querySelector(selector);
            if (el) el.textContent = t[key]?.[lang] || t[key]?.ru;
        };
        set('#guideModal .modal-title', 'modalTitle');
        set('#guideModal .modal-description', 'modalDescription');
        set('#guideModal .form-hint', 'formHint');
        set('#guideModal .btn-accent', 'submitBtn');
        set('#guideModal .checkbox-label', 'checkboxLabel');
        set('#guideModal .messenger-label', 'messengerLabel');
        set('#modalSuccessBlock .modal-title', 'successTitle');
        set('#modalSuccessBlock .download-btn', 'downloadBtn');
        set('#modalSuccessBlock .form-hint', 'promoHint');
        set('#modalSuccessBlock .catalog-link', 'toOrderLink');
        set('#modalSuccessBlock .modal-description', 'guide_success_desc');
        set('#modalSuccessBlock .promo-label', 'guide_promo_label');

        const copyBtn = document.querySelector('#modalSuccessBlock .btn-copy');
        if (copyBtn) {
            if (!copyBtn.dataset.original) copyBtn.dataset.original = copyBtn.textContent;
            copyBtn.textContent = t.copyBtn?.[lang] || t.copyBtn?.ru;
        }

        document.querySelectorAll('.messenger-badge').forEach(badge => {
            const text = badge.textContent.trim();
            if (['Telegram', 'WhatsApp', 'E-mail'].includes(text)) badge.textContent = text;
        });
    }

    // Переключение языка
    window.setLanguage = function(lang) {
        document.querySelectorAll('.lang-switch').forEach(el => el.classList.remove('active'));
        const btn = document.getElementById('btn-' + lang);
        if (btn) btn.classList.add('active');
        document.body.setAttribute('data-active-lang', lang);
        localStorage.setItem('site_lang', lang);
        document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
        });
        updatePlaceholders(lang);
        updateI18nElements(lang);
        updateModalTexts(lang);
    };

    // Открытие модального окна
    window.openModal = function(id) {
        const modal = document.getElementById(id);
        modal?.classList.add('active');
        if (id === 'guideModal') setTimeout(initPhoneInput, 100);
        setLanguage(localStorage.getItem('site_lang') || 'ru');
    };

    // Закрытие модального окна
    window.closeModal = function(id) {
        document.getElementById(id)?.classList.remove('active');
    };

    // Открытие просмотрщика изображений
    window.openImageViewerModal = function(src) {
        document.getElementById('image-viewer-modal-img').src = src;
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    // Закрытие просмотрщика изображений
    window.closeImageViewerModal = function() {
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    // Фильтрация портфолио
    window.filterSelection = function(category, element) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        element?.classList.add('active');
        document.querySelectorAll('.portfolio-item').forEach(item => {
            item.style.display = (category === 'all' || item.classList.contains(category)) ? 'flex' : 'none';
        });
    };

    // Обработчик кликов вне модальных окон
    window.onclick = function(event) {
        if (event.target.classList.contains('modal')) event.target.classList.remove('active');
        else if (event.target.id === 'image-viewer-modal') closeImageViewerModal();
        else if (event.target.id === 'guideModal' || event.target.classList.contains('modal-overlay')) closeGuideModal();
    };

    // Блокировка контекстного меню и drag-and-drop для изображений и видео
    document.addEventListener('contextmenu', e => {
        if (['IMG', 'VIDEO'].includes(e.target.tagName)) e.preventDefault();
    });
    document.addEventListener('dragstart', e => {
        if (['IMG', 'VIDEO'].includes(e.target.tagName)) e.preventDefault();
    });

    // Закрытие модальных окон по Escape
    document.addEventListener('keydown', event => {
        if (event.key !== 'Escape') return;
        const modals = [
            { id: 'guideModal', checker: () => document.getElementById('guideModal')?.classList.contains('active'), closer: closeGuideModal },
            { id: 'guide-modal', checker: () => document.getElementById('guide-modal')?.classList.contains('active'), closer: () => closeModal('guide-modal') },
            { id: 'order-modal', checker: () => document.getElementById('order-modal')?.classList.contains('active'), closer: () => closeModal('order-modal') },
            { id: 'image-viewer-modal', checker: () => !document.getElementById('image-viewer-modal')?.classList.contains('hidden'), closer: closeImageViewerModal },
            { id: 'guide-page-modal', checker: () => !document.getElementById('guide-page-modal')?.classList.contains('hidden'), closer: closeGuidePageModal }
        ];
        modals.forEach(({ checker, closer }) => { if (checker()) closer(); });
    });

    // Открытие модального окна страницы гайда
    window.openGuidePageModal = function(pageNum) {
        const data = translations.guidePages[pageNum];
        if (!data) return;
        const lang = document.body.getAttribute('data-active-lang') || 'ru';
        document.getElementById('modal-page-number').textContent = data.number;
        document.getElementById('modal-page-title').textContent = data.title[lang];
        document.getElementById('modal-page-art').innerHTML = data.svg;
        document.getElementById('modal-page-footer').textContent = data.footer[lang];
        const modal = document.getElementById('guide-page-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    // Закрытие модального окна страницы гайда
    window.closeGuidePageModal = function() {
        const modal = document.getElementById('guide-page-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    // Открытие модального окна гайда
    window.openGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            updateModalTexts(document.body.getAttribute('data-active-lang') || 'ru');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    // Закрытие модального окна гайда
    window.closeGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            setTimeout(() => {
                ['guideName', 'guidePhone', 'guideEmail'].forEach(id => {
                    const el = document.getElementById(id);
                    if (el) el.value = '';
                });
                const consent = document.getElementById('privacyConsent');
                if (consent) consent.checked = true;
                document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
                const formBlock = document.getElementById('modalFormBlock');
                const successBlock = document.getElementById('modalSuccessBlock');
                if (formBlock) formBlock.style.display = 'block';
                if (successBlock) successBlock.style.display = 'none';
                const copyBtn = document.querySelector('.btn-copy');
                if (copyBtn) {
                    const lang = document.body.getAttribute('data-active-lang') || 'ru';
                    copyBtn.textContent = translations.modal.copyBtn?.[lang] || translations.modal.copyBtn?.ru;
                }
            }, 300);
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Переход к услугам
    window.goToServices = function() {
        const modal = document.getElementById('guideModal');
        modal?.classList.remove('active');
        document.body.style.overflow = 'auto';
        document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
    };

    // Инициализация телефонного ввода
    function initPhoneInput() {
        const phoneInput = document.getElementById('guidePhone');
        if (!phoneInput || typeof intlTelInput === 'undefined') return;
        phoneInputInstance?.destroy();
        phoneInputInstance = intlTelInput(phoneInput, {
            initialCountry: 'auto',
            geoIpLookup: callback => {
                fetch('https://ipapi.co/json')
                    .then(res => res.json())
                    .then(data => callback(data.country_code))
                    .catch(() => callback('ru'));
            },
            preferredCountries: ['ru', 'ua', 'us', 'de', 'kz'],
            separateDialCode: true,
            autoPlaceholder: 'polite',
            utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
        });
    }

    // Валидация формы
    function validateForm() {
        let isValid = true;
        const honeypot = document.getElementById('website');
        if (honeypot?.value) return false;

        const fields = [
            { id: 'guideName', validator: val => val.trim(), errorClass: '.form-group' },
            { id: 'guidePhone', validator: () => phoneInputInstance?.isValidNumber(), errorClass: '.form-group' },
            { id: 'guideEmail', validator: val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val.trim()), errorClass: '.form-group' },
            { id: 'privacyConsent', validator: () => document.getElementById('privacyConsent')?.checked, errorClass: '.checkbox-group' }
        ];

        fields.forEach(({ id, validator, errorClass }) => {
            const input = document.getElementById(id);
            const group = input?.closest(errorClass);
            const value = input?.type === 'checkbox' ? null : input?.value;
            if (!validator(value)) {
                group?.classList.add('error');
                isValid = false;
            } else {
                group?.classList.remove('error');
            }
        });

        return isValid;
    }

    // Получение выбранного способа связи
    function getSelectedContactMethod() {
        const selected = document.querySelector('input[name="messenger"]:checked');
        if (!selected) return '';
        const map = { telegram: 'Telegram', whatsapp: 'WhatsApp', email: 'E-mail' };
        return map[selected.value] || '';
    }

    // Обработка отправки формы гайда
    window.handleGuideSubmit = function(event) {
        event.preventDefault();
        if (!validateForm()) return;

        const leadData = {
            name: document.getElementById('guideName').value,
            phone: phoneInputInstance ? phoneInputInstance.getNumber() : document.getElementById('guidePhone').value,
            email: document.getElementById('guideEmail').value,
            preferredContact: getSelectedContactMethod(),
            promoCode: PROMO_CODE,
            date: new Date().toLocaleString('ru-RU')
        };

        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(err => console.error('Ошибка отправки:', err));

        const formBlock = document.getElementById('modalFormBlock');
        const successBlock = document.getElementById('modalSuccessBlock');
        if (formBlock && successBlock) {
            formBlock.style.display = 'none';
            successBlock.style.display = 'block';
            const downloadBtn = successBlock.querySelector('.download-btn');
            if (downloadBtn) {
                downloadBtn.href = GOOGLE_DRIVE_LINK;
                downloadBtn.target = '_blank';
            }
        }
    };

    // Копирование промокода
    window.copyPromoCode = function() {
        const lang = document.body.getAttribute('data-active-lang') || 'ru';
        navigator.clipboard.writeText(PROMO_CODE).then(() => {
            const copyBtn = document.querySelector('.btn-copy');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = translations.modal.copiedMsg?.[lang] || translations.modal.copiedMsg?.ru;
                setTimeout(() => { copyBtn.textContent = originalText; }, 2000);
            }
        }).catch(err => console.error('Ошибка копирования:', err));
    };

    // Инициализация при загрузке
    setLanguage(localStorage.getItem('site_lang') || 'ru');
    const yearElement = document.getElementById('year');
    if (yearElement) yearElement.textContent = new Date().getFullYear();
    initPhoneInput();
});
