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
            const guideModal = document.getElementById('guide-modal');
            const orderModal = document.getElementById('order-modal');
            const imageViewer = document.getElementById('image-viewer-modal');

            if (guideModal && guideModal.classList.contains('active')) {
                closeModal('guide-modal');
            } else if (orderModal && orderModal.classList.contains('active')) {
                closeModal('order-modal');
            } else if (imageViewer && !imageViewer.classList.contains('hidden')) {
                closeImageViewerModal();
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
});
