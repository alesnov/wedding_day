// const attendanceSelect = document.getElementById("attendance");
// const additionalFields = document.getElementById("additionalFields");
// const guestsSelect = document.getElementById("guests");
// const extraGuestsDiv = document.getElementById("extraGuests");
//
// // Показываем/скрываем дополнительные поля в зависимости от ответа
// if (attendanceSelect) {
//     attendanceSelect.addEventListener("change", function() {
//         if (this.value === "yes") {
//             additionalFields.style.display = "block";
//             // Делаем поля обязательными только если выбрано "Да"
//             document.getElementById("drink").setAttribute("required", "required");
//             document.getElementById("guests").setAttribute("required", "required");
//         } else {
//             additionalFields.style.display = "none";
//             // Убираем обязательность полей
//             document.getElementById("drink").removeAttribute("required");
//             document.getElementById("guests").removeAttribute("required");
//         }
//     });
// }
//
// // Обработка дополнительных гостей
// if (guestsSelect) {
//     guestsSelect.addEventListener("change", function() {
//         const count = parseInt(this.value);
//         extraGuestsDiv.innerHTML = "";
//
//         if (count > 1) {
//             extraGuestsDiv.classList.add("active");
//             for (let i = 1; i < count; i++) {
//                 const guestSection = document.createElement("div");
//                 guestSection.className = "guest-section";
//                 guestSection.innerHTML = `
//                     <h4 class="guest-title">Гость ${i}</h4>
//                     <div class="form-group">
//                         <label>Фамилия и имя</label>
//                         <input type="text" name="guest_${i}_name" required placeholder="Введите имя гостя">
//                     </div>
//                     <div class="form-group">
//                         <label>Что будет пить?</label>
//                         <select name="guest_${i}_drink" required>
//                             <option value="">Выберите...</option>
//                             <option value="red_wine">Вино красное</option>
//                             <option value="white_wine">Вино белое</option>
//                             <option value="vodka">Водка</option>
//                             <option value="cognac">Коньяк</option>
//                             <option value="whiskey">Виски</option>
//                             <option value="jin">Джин</option>
//                             <option value="none">Не пью</option>
//                         </select>
//                     </div>
//                 `;
//                 extraGuestsDiv.appendChild(guestSection);
//             }
//         } else {
//             extraGuestsDiv.classList.remove("active");
//         }
//     });
// }
//
// // Обработка отправки формы
// const rsvpForm = document.getElementById("rsvpForm");
// if (rsvpForm) {
//     rsvpForm.addEventListener("submit", function(e) {
//         e.preventDefault();
//         alert("Спасибо за ваш ответ! Мы получили вашу информацию.");
//         this.submit();
//     });
// }



const attendanceSelect = document.getElementById("attendance");
const additionalFields = document.getElementById("additionalFields");
const guestsSelect = document.getElementById("guests");
const extraGuestsDiv = document.getElementById("extraGuests");
const rsvpForm = document.getElementById("rsvpForm");

// Плавное появление/исчезновение полей
function toggleAdditionalFields(show) {
    if (!additionalFields) return;

    if (show) {
        additionalFields.style.display = 'block';
        additionalFields.style.opacity = '0';
        additionalFields.style.transform = 'translateY(-20px)';
        additionalFields.style.transition = 'all 0.4s ease';

        setTimeout(() => {
            additionalFields.style.opacity = '1';
            additionalFields.style.transform = 'translateY(0)';
        }, 10);

        // Делаем поля обязательными
        const drinkField = document.getElementById("drink");
        const guestsField = document.getElementById("guests");
        if (drinkField) drinkField.setAttribute("required", "required");
        if (guestsField) guestsField.setAttribute("required", "required");
    } else {
        additionalFields.style.opacity = '0';
        additionalFields.style.transform = 'translateY(-20px)';

        setTimeout(() => {
            additionalFields.style.display = 'none';
        }, 400);

        // Убираем обязательность
        const drinkField = document.getElementById("drink");
        const guestsField = document.getElementById("guests");
        if (drinkField) drinkField.removeAttribute("required");
        if (guestsField) guestsField.removeAttribute("required");
    }
}

// Обработка ответа
if (attendanceSelect) {
    attendanceSelect.addEventListener("change", function() {
        if (this.value === "yes") {
            toggleAdditionalFields(true);
        } else {
            toggleAdditionalFields(false);
            // Очищаем дополнительные поля
            if (extraGuestsDiv) extraGuestsDiv.innerHTML = "";
            if (guestsSelect) guestsSelect.value = "1";
        }
    });
}

// Создание полей для дополнительных гостей
function createGuestFields(count) {
    if (!extraGuestsDiv) return;

    extraGuestsDiv.innerHTML = "";

    if (count > 1) {
        extraGuestsDiv.classList.add("active");

        for (let i = 1; i < count; i++) {
            const guestSection = document.createElement("div");
            guestSection.className = "guest-section";
            guestSection.style.animation = `slideDown 0.4s ease ${i * 0.1}s both`;

            guestSection.innerHTML = `
                <h4 class="guest-title">Гость ${i + 1}</h4>
                <div class="form-group">
                    <label>Фамилия и имя</label>
                    <input type="text" name="guest_${i}_name" required 
                           placeholder="Введите имя гостя"
                           pattern="[А-Яа-яЁёA-Za-z\\s-]+"
                           title="Пожалуйста, введите корректное имя">
                </div>
                <div class="form-group">
                    <label>Что будет пить?</label>
                    <select name="guest_${i}_drink" required>
                        <option value="">Выберите...</option>
                        <option value="red_wine">Вино красное</option>
                        <option value="white_wine">Вино белое</option>
                        <option value="vodka">Водка</option>
                        <option value="cognac">Коньяк</option>
                        <option value="whiskey">Виски</option>
                        <option value="jin">Джин</option>
                        <option value="none">Не пью</option>
                    </select>
                </div>
            `;

            extraGuestsDiv.appendChild(guestSection);
        }
    } else {
        extraGuestsDiv.classList.remove("active");
    }
}

// Обработка выбора количества гостей
if (guestsSelect) {
    guestsSelect.addEventListener("change", function() {
        const count = parseInt(this.value);
        createGuestFields(count);
    });
}

// Валидация формы
function validateForm(form) {
    let isValid = true;
    const errors = [];

    // Проверяем обязательные поля
    const requiredFields = form.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            errors.push(field.previousElementSibling?.textContent || 'Поле обязательно');
        } else {
            field.classList.remove('error');
        }
    });

    // Проверяем email если есть
    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            isValid = false;
            emailField.classList.add('error');
            errors.push('Некорректный email');
        }
    }

    return { isValid, errors };
}

// Обработка отправки формы
if (rsvpForm) {
    rsvpForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const { isValid, errors } = validateForm(this);

        if (!isValid) {
            // Показываем ошибки
            alert('Пожалуйста, заполните все обязательные поля:\n' + errors.join('\n'));

            // Плавная прокрутка к первой ошибке
            const firstError = this.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
            return;
        }

        // Показываем индикатор загрузки
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            // Собираем данные формы
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());

            // Здесь можно добавить отправку на сервер
            // const response = await fetch('/submit-rsvp', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });

            // Имитация отправки
            await new Promise(resolve => setTimeout(resolve, 1500));

            // Успешная отправка
            showSuccessMessage();

        } catch (error) {
            console.error('Error:', error);
            alert('Произошла ошибка при отправке. Пожалуйста, попробуйте позже.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Показываем сообщение об успехе
function showSuccessMessage() {
    const successModal = document.createElement('div');
    successModal.className = 'success-modal';
    successModal.innerHTML = `
        <div class="success-content">
            <div class="success-icon">✓</div>
            <h2>Спасибо за ваш ответ!</h2>
            <p>Мы получили вашу информацию и с нетерпением ждем встречи!</p>
            <button class="close-success">Закрыть</button>
        </div>
    `;

    document.body.appendChild(successModal);

    setTimeout(() => {
        successModal.classList.add('show');
    }, 10);

    successModal.querySelector('.close-success').addEventListener('click', () => {
        successModal.classList.remove('show');
        setTimeout(() => {
            successModal.remove();
            if (rsvpForm) rsvpForm.reset();
            if (additionalFields) additionalFields.style.display = 'none';
            if (extraGuestsDiv) extraGuestsDiv.innerHTML = '';
        }, 300);
    });
}