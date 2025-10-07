document.addEventListener('DOMContentLoaded', function () {
    // Мобильное меню
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links a');

    function toggleMenu() {
        // Переключаем классы
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        // Блокируем/разблокируем скролл
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : 'auto';
    }

    // Обработчик клика по бургеру
    hamburger.addEventListener('click', toggleMenu);

    // Закрываем меню при клике на ссылку
    links.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Закрываем меню при ресайзе окна
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Закрываем меню при клике вне его
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) &&
            !navLinks.contains(e.target) &&
            navLinks.classList.contains('active')) {
            toggleMenu();
        }
    });


    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            const currentlyActive = document.querySelector('.faq-item.active');
            if (currentlyActive && currentlyActive !== item) {
                currentlyActive.classList.remove('active');
            }
            item.classList.toggle('active');
        });
    });

    const coursesData = {
        'fin-game': {
            title: 'Финансовые игры для школьников',
            image: 'assets/fin-game.png', // Укажите путь к картинке, если она есть
            brief: 'Мы проводим увлекательные финансовые игры прямо в вашей школе, помогая ученикам освоить ключевые экономические концепции в интерактивном формате.',
            duration: '1-2 академических часа',
            price: 'Бесплатно',
            description: 'Наши финансовые игры — это не скучные лекции, а полноценное погружение в мир экономики. Участники принимают решения, управляют ресурсами, сталкиваются с рыночными вызовами и учатся финансовой ответственности. Игра адаптируется под возраст и уровень знаний класса.',
            program: [
                'Игры проводятся студентами. По вопросам содержания игр - узнавайте лично по телефону.',
                '> Игра «Виртуальный стартап»',
                '> Игра «Корпорация успеха»',
                '> Игра «Деловая этика в бизнесе»',
                '> Игра «Кошмар Аудитора»',
                '> Игра «Финансовый выживач»',
                '> Игра «Продажный квиз»',
                '> Игра «Экономическая ферма»'
            ],
            lifehacks: []
        }
    };


    const modal = document.getElementById('courseModal');
    const closeModalBtn = document.querySelector('.close-modal');

    function openModal(courseId) {
        const courseData = coursesData[courseId];
        if (courseData) {
            document.getElementById('modalTitle').textContent = courseData.title;
            document.getElementById('courseBrief').textContent = courseData.brief;
            document.getElementById('courseImage').src = courseData.image;
            document.getElementById('courseDuration').textContent = courseData.duration;
            document.getElementById('coursePrice').textContent = courseData.price;
            document.getElementById('courseDescription').textContent = courseData.description;

            const programList = document.getElementById('courseProgram');
            programList.innerHTML = '';
            courseData.program.forEach(item => {
                const li = document.createElement('li');
                li.textContent = item;
                programList.appendChild(li);
            });

            document.getElementById('enrollButton').dataset.courseId = courseId;
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';

            document.querySelector('.detail-btn[data-target="program"]').click();

            document.getElementById('enrollButton').addEventListener('click', function () {
                const courseId = this.dataset.courseId;

                closeModal();

                if (courseId) {
                    const courseSelect = document.getElementById('course');
                    const optionExists = courseSelect.querySelector(`option[value="${courseId}"]`);

                    if (optionExists) {
                        courseSelect.value = courseId;
                    }
                }

                const formSection = document.getElementById('contacts');
                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

                document.getElementById('name').focus();
            });
        }
    }

    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }

    // Закрытие модального окна по кнопке и клику вне его
    closeModalBtn.addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });


    // --- Часть 3: Логика для разных кнопок ---

    // 3.1: Кнопки "ВЫБРАТЬ КУРС" (прокрутка к форме)
    const selectCourseButtons = document.querySelectorAll('.details-btn');
    const formSection = document.getElementById('contacts');
    const courseSelect = document.getElementById('course');

    selectCourseButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const courseCard = button.closest('.course-card');
            if (courseCard) {
                const courseId = courseCard.dataset.course;
                const optionExists = courseSelect.querySelector(`option[value="${courseId}"]`);

                if (optionExists) {
                    courseSelect.value = courseId;
                } else {
                    console.warn(`Курс с ID "${courseId}" не найден в форме заявки.`);
                }

                formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // 3.2: Кнопки "ПОДРОБНЕЕ" (открытие модального окна)
    const openModalButtons = document.querySelectorAll('.details-btn-modal');

    openModalButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            event.preventDefault();
            const courseCard = button.closest('.course-card');
            if (courseCard) {
                const courseId = courseCard.dataset.course;
                openModal(courseId);
            }
        });
    });

    // Обработчики для кнопок деталей
    const detailButtons = document.querySelectorAll('.detail-btn');
    detailButtons.forEach(button => {
        button.addEventListener('click', function () {
            const targetId = this.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);

            // Скрываем все detail-content
            document.querySelectorAll('.detail-content').forEach(content => {
                content.style.display = 'none';
            });

            // Показываем выбранный content
            targetContent.style.display = 'block';

            // Убираем активный класс у всех кнопок
            detailButtons.forEach(btn => btn.classList.remove('active'));

            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
        });
    });


    // Закрытие модального окна
    document.querySelector('.close-modal').addEventListener('click', function () {
        document.getElementById('courseModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target == document.getElementById('courseModal')) {
            document.getElementById('courseModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Вызов функции openModal при клике на карточку курса
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function () {
            const courseId = this.getAttribute('data-course');
            openModal(courseId);
        });
    });


    // Закрытие модального окна
    document.querySelector('.close-modal').addEventListener('click', function () {
        document.getElementById('courseModal').style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target == document.getElementById('courseModal')) {
            document.getElementById('courseModal').style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Вызов функции openModal при клике на карточку курса
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('click', function () {
            const courseId = this.getAttribute('data-course');
            openModal(courseId);
        });
    });

    // Кнопка "Наверх"
    const scrollToTopBtn = document.getElementById('scrollToTop');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.display = 'flex';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });

    scrollToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Закрываем мобильное меню при клике на ссылку
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    hamburger.classList.remove('active');
                }
            }
        });
    });

    // Анимация появления элементов при скролле
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.fade-in');

        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;

            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Инициализация анимации при загрузке и скролле
    window.addEventListener('scroll', animateOnScroll);
    window.addEventListener('load', animateOnScroll);

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function (e) {
            let x = e.target.value.replace(/\D/g, '')
                .match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,4})/);
            e.target.value = !x[2] ? x[1] :
                '+' + x[1] + ' (' + x[2] + ') ' +
                (x[3] ? x[3] : '') +
                (x[4] ? '-' + x[4] : '');
        });
    }

    // Обработка ресайза окна
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            // Пересчет позиций элементов при необходимости
            animateOnScroll();
        }, 250);
    });

    // Предзагрузка изображений
    const preloadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            }
        });
    };

    // Инициализация предзагрузки изображений
    window.addEventListener('load', preloadImages);

    // Обработка ошибок
    window.onerror = function (msg, url, lineNo, columnNo, error) {
        console.error('Error: ' + msg + '\nURL: ' + url + '\nLine: ' + lineNo + '\nColumn: ' + columnNo + '\nError object: ' + JSON.stringify(error));
        return false;
    };

    // Обработка офлайн/онлайн статуса
    window.addEventListener('online', function () {
        console.log('Соединение восстановлено');

    });

    window.addEventListener('offline', function () {
        console.log('Соединение потеряно');

    });

    window.addEventListener('beforeunload', function (e) {
        const form = document.getElementById('applicationForm');
        if (form && Array.from(form.elements).some(element => element.value)) {
            e.preventDefault();
            e.returnValue = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.reviews-slider');
    const slides = document.querySelectorAll('.review-slide');
    const prevBtn = document.querySelector('.prev-review');
    const nextBtn = document.querySelector('.next-review');
    let currentIndex = 0;

    function updateSlider() {
        const slideWidth = slides[0].offsetWidth + 20; // width + gap
        slider.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    function nextSlide() {
        if (currentIndex < slides.length - 2) { // показываем 2 одновременно
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        updateSlider();
    }

    function prevSlide() {
        if (currentIndex > 0) {
            currentIndex--;
        } else {
            currentIndex = slides.length - 2;
        }
        updateSlider();
    }

    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Автопрокрутка каждые 5 секунд
    setInterval(nextSlide, 5000);

    // Инициализация
    updateSlider();

    // Обновление при изменении окна
    window.addEventListener('resize', updateSlider);
});

document.querySelectorAll('.review-slide').forEach(slide => {
    slide.addEventListener('click', () => {
        slide.classList.toggle('expanded');
    });
});