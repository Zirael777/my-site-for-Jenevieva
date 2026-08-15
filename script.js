document.addEventListener('DOMContentLoaded', () => {

    const GOOGLE_DRIVE_LINK = 'https://drive.google.com/file/d/11nVx2ksJ_mQkzvfGd7Ess4x6J-C1PENF/view';
    const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbxuJ4Cyiyj50xcxeEnIZPTKsxhbJjQS4jOaltBgREshSg9JUSRfDIkv7pNph2fLXvbx/exec';

    // Глобальная функция переключения языков
    window.setLanguage = function(lang) {
        document.querySelectorAll('.lang-switch').forEach(el => el.classList.remove('active'));
        const btnElement = document.getElementById('btn-' + lang);
        if (btnElement) btnElement.classList.add('active');
        
        document.body.setAttribute('data-active-lang', lang);
        localStorage.setItem('site_lang', lang);

        document.querySelectorAll('[data-lang]').forEach(el => {
            el.style.display = el.getAttribute('data-lang') === lang ? '' : 'none';
        });
        
        updatePlaceholders(lang);
        updateI18nElements(lang);
        updateModalTexts(lang);
    };
    
    function updatePlaceholders(lang) {
        const placeholders = {
            'guideName': { ru: 'Как к вам обращаться', en: 'Your name', ua: 'Як до вас звертатися' },
            'guidePhone': { ru: " (___) ___-__-__", en: " (___) ___-__-__", ua: " (___) ___-__-__" },
            'guideEmail': { ru: 'Ваш E-mail', en: 'Your E-mail', ua: 'Ваш E-mail' }
        };
        
        for (const [id, texts] of Object.entries(placeholders)) {
            const input = document.getElementById(id);
            if (input && texts[lang]) input.placeholder = texts[lang];
        }
    }
    
    function updateI18nElements(lang) {
        const translations = {
            guide_banner_badge: { ru: 'АРТ-ПРАКТИКУМ + СКИДКА 20%', en: 'ART PRACTICUM + 20% OFF', ua: 'АРТ-ПРАКТИКУМ + ЗНИЖКА 20%' },
            guide_banner_title: { ru: 'Тихое искусство быть собой', en: 'The Quiet Art of Being Yourself', ua: 'Тихе мистецтво бути собою' },
            guide_banner_subtitle: { ru: 'Пошаговый путь к себе через медитативное рисование', en: 'A step-by-step path to yourself through meditative drawing', ua: 'Покроковий шлях до себе через медитативне малювання' },
            guide_banner_desc: { ru: 'Авторский гайд с практиками и упражнениями...', en: "Author's guide with practices...", ua: "Авторський гайд з практиками..." },
            guide_banner_btn: { ru: 'Забрать гайд и скидку 20%', en: 'Get the Guide and 20% Discount', ua: 'Отримати гайд і знижку 20%' },
            nav_guide: { ru: 'Бесплатный гайд', en: 'Free Guide', ua: 'Безкоштовний гайд' }
        };
        
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[key] && translations[key][lang]) {
                el.textContent = translations[key][lang];
            }
        });
    }
    
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
        const successDesc = document.querySelector('#modalSuccessBlock .modal-description');
        const promoLabel = document.querySelector('#modalSuccessBlock .promo-label');
        
        const translations = {
            modalTitle: { ru: 'Тихое искусство быть собой', en: 'The Quiet Art of Being Yourself', ua: 'Тихе мистецтво бути собою' },
            modalDescription: { ru: 'Пошаговый путь к себе через медитативное рисование. Авторский гайд с практиками...', en: "A step-by-step journey...", ua: 'Покроковий шлях до себе...' },
            formHint: { ru: 'После отправки формы вы сможете сразу скачать PDF-гайд...', en: 'After submitting the form...', ua: 'Після відправки формы...' },
            submitBtn: { ru: 'Забрать гайд и скидку 20%', en: 'Get the Guide and 20% Discount', ua: 'Отримати гайд і знижку 20%' },
            checkboxLabel: { ru: 'Согласен(на) на обработку персональных данных', en: 'I agree to personal data processing', ua: 'Згоден(на) на обробку персональних даних' },
            messengerLabel: { ru: 'Предпочитаемый способ связи:', en: 'Preferred contact method:', ua: "Бажаний спосіб зв'язку:" },
            successTitle: { ru: '✦ Ваш гайд «Тихое искусство быть собой» готов!', en: '✦ Your Guide "The Quiet Art of Being Yourself" is Ready!', ua: '✦ Ваш гайд «Тихе мистецтво бути собою» готовий!' },
            downloadBtn: { ru: 'СКАЧАТЬ PDF-ГАЙД', en: 'DOWNLOAD PDF GUIDE', ua: 'ЗАВАНТАЖИТИ PDF-ГАЙД' },
            copyBtn: { ru: 'Скопировать', en: 'Copy', ua: 'Копіювати' },
            promoHint: { ru: 'Промокод продублирован в ваш выбранный способ связи.', en: 'Promo code has been sent...', ua: "Промокод продубльовано..." },
            toOrderLink: { ru: 'Перейти к заказу →', en: 'Proceed to Order →', ua: 'Перейти до замовлення →' },
            successDesc: { ru: 'Вы можете скачать PDF прямо сейчас, а ваш промокод на 20% скопировать ниже:', en: 'You can download PDF right now...', ua: 'Ви можете завантажити PDF просто зараз...' },
            promoLabel: { ru: 'Ваш промокод:', en: 'Your promo code:', ua: 'Ваш промокод:' }
        };

        if (modalTitle) modalTitle.textContent = translations.modalTitle[lang] || translations.modalTitle.ru;
        if (modalDesc) modalDesc.textContent = translations.modalDescription[lang] || translations.modalDescription.ru;
        if (formHint) formHint.textContent = translations.formHint[lang] || translations.formHint.ru;
        if (submitBtn) submitBtn.textContent = translations.submitBtn[lang] || translations.submitBtn.ru;
        if (checkboxLabel) checkboxLabel.textContent = translations.checkboxLabel[lang] || translations.checkboxLabel.ru;
        if (messengerLabel) messengerLabel.textContent = translations.messengerLabel[lang] || translations.messengerLabel.ru;
        if (successTitle) successTitle.textContent = translations.successTitle[lang] || translations.successTitle.ru;
        if (downloadBtn) downloadBtn.textContent = translations.downloadBtn[lang] || translations.downloadBtn.ru;
        if (promoHint) promoHint.textContent = translations.promoHint[lang] || translations.promoHint.ru;
        if (toOrderLink) toOrderLink.textContent = translations.toOrderLink[lang] || translations.toOrderLink.ru;
        if (successDesc) successDesc.textContent = translations.successDesc[lang] || translations.successDesc.ru;
        if (promoLabel) promoLabel.textContent = translations.promoLabel[lang] || translations.promoLabel.ru;

        if (copyBtn) {
            if (!copyBtn.dataset.original) copyBtn.dataset.original = copyBtn.textContent;
            copyBtn.textContent = translations.copyBtn[lang] || translations.copyBtn.ru;
        }
    }

    window.openModal = function(id) {
        const modal = document.getElementById(id);
        if (!modal) return;
        modal.classList.add('active');
        setLanguage(localStorage.getItem('site_lang') || 'ru');
        if (id === 'guideModal') setTimeout(initPhoneInput, 100);
    };

    window.closeModal = function(id) {
        const modal = document.getElementById(id);
        if (modal) modal.classList.remove('active');
    };

    window.openImageViewerModal = function(src) {
        document.getElementById('image-viewer-modal-img').src = src;
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    };

    window.closeImageViewerModal = function() {
        const modal = document.getElementById('image-viewer-modal');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    };

    window.onclick = function(event) {
        if (event.target.classList.contains('modal') || event.target.classList.contains('modal-overlay')) {
            event.target.classList.remove('active');
            if (event.target.id === 'guideModal') closeGuideModal();
        } else if (event.target.id === 'image-viewer-modal') {
            closeImageViewerModal();
        }
    };

    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape") {
            closeGuideModal();
            closeModal('order-modal');
            closeImageViewerModal();
        }
    });

    window.openGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            updateModalTexts(document.body.getAttribute('data-active-lang') || 'ru');
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    };

    window.closeGuideModal = function() {
        const modal = document.getElementById('guideModal');
        if (modal) {
            setTimeout(() => {
                const formBlock = document.getElementById('modalFormBlock');
                const successBlock = document.getElementById('modalSuccessBlock');
                
                ['guideName', 'guidePhone', 'guideEmail'].forEach(id => {
                    const input = document.getElementById(id);
                    if (input) input.value = '';
                });
                const consent = document.getElementById('privacyConsent');
                if (consent) consent.checked = true;
                
                document.querySelectorAll('.form-group.error').forEach(el => el.classList.remove('error'));
                if (formBlock) formBlock.style.display = 'block';
                if (successBlock) successBlock.style.display = 'none';
            }, 300);
            
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    let phoneInputInstance;
    function initPhoneInput() {
        const phoneInput = document.getElementById('guidePhone');
        if (phoneInput && typeof intlTelInput !== 'undefined') {
            if (phoneInputInstance) phoneInputInstance.destroy();
            phoneInputInstance = intlTelInput(phoneInput, {
                initialCountry: 'auto',
                geoIpLookup: callback => fetch('https://ipapi.co/json').then(res => res.json()).then(data => callback(data.country_code)).catch(() => callback('ru')),
                preferredCountries: ['ru', 'ua', 'us', 'de', 'kz'],
                separateDialCode: true,
                utilsScript: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.19/js/utils.js'
            });
        }
    }

    function validateForm() {
        let isValid = true;
        const honeypot = document.getElementById('website');
        if (honeypot && honeypot.value) return false;
        
        const nameInput = document.getElementById('guideName');
        if (!nameInput || !nameInput.value.trim()) isValid = false;
        
        const phoneInput = document.getElementById('guidePhone');
        if (!phoneInput || !phoneInputInstance || !phoneInputInstance.isValidNumber()) isValid = false;
        
        const emailInput = document.getElementById('guideEmail');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput || !emailRegex.test(emailInput.value.trim())) isValid = false;
        
        return isValid;
    }

    window.handleGuideSubmit = function(event) {
        event.preventDefault();
        if (!validateForm()) return;
        
        const leadData = {
            name: document.getElementById('guideName').value,
            phone: phoneInputInstance ? phoneInputInstance.getNumber() : document.getElementById('guidePhone').value,
            email: document.getElementById('guideEmail').value,
            promoCode: 'MEDITATION20',
            date: new Date().toLocaleString('ru-RU')
        };

        fetch(GOOGLE_SHEET_URL, {
            method: 'POST',
            mode: 'no-cors',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(leadData)
        }).catch(err => console.error(err));
        
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

    window.copyPromoCode = function() {
        const lang = document.body.getAttribute('data-active-lang') || 'ru';
        const copiedMsg = { ru: 'Скопировано!', en: 'Copied!', ua: 'Скопійовано!' };
        
        navigator.clipboard.writeText('MEDITATION20').then(() => {
            const copyBtn = document.querySelector('.btn-copy');
            if (copyBtn) {
                const originalText = copyBtn.textContent;
                copyBtn.textContent = copiedMsg[lang] || copiedMsg.ru;
                setTimeout(() => copyBtn.textContent = originalText, 2000);
            }
        });
    };

    setLanguage(localStorage.getItem('site_lang') || 'ru');
    initPhoneInput();
});
