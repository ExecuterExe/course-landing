const scriptURL = 'https://script.google.com/macros/s/AKfycbx6tcJ-K4R3Tyys5zvldwGQfFR4YZXa1H4lTpSXGCJmIajkDn3AC_RL4ruMeiZ1B4U5GA/exec'

const form = document.forms['submit-to-google-sheet'];
const submitBtn = form.querySelector('.submit-btn');

form.addEventListener('submit', e => {
    e.preventDefault(); // Отменяем стандартное поведение

    // --- НАЧАЛО БЛОКА ВАЛИДАЦИИ ---
    const name = form.querySelector('[name="name"]').value;
    const email = form.querySelector('[name="email"]').value;
    const phone = form.querySelector('[name="phone"]').value;
    const course = form.querySelector('[name="course"]').value;

    if (!name || !email || !phone || !course) {
        alert('Пожалуйста, заполните все обязательные поля (*)');
        return; // Останавливаем выполнение, если поля не заполнены
    }


    // Блокируем кнопку и меняем текст, чтобы пользователь видел, что что-то происходит
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправка...';

    // Отправляем данные формы в Google Sheets
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            console.log('Success!', response);
            alert('Спасибо! Ваша заявка успешно отправлена. Мы скоро с вами свяжемся.');

            // Сбрасываем форму и возвращаем кнопку в исходное состояние
            form.reset();
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        })
        .catch(error => {
            console.error('Error!', error.message);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте еще раз или свяжитесь с нами напрямую.');

            // Возвращаем кнопку в исходное состояние даже при ошибке
            submitBtn.disabled = false;
            submitBtn.textContent = 'Отправить заявку';
        });
});