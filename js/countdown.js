// const weddingDate = new Date("Aug 29 2026 15:00:00");
//
// function updateCountdown() {
//     const now = new Date();
//     const diff = weddingDate - now;
//
//     if (diff <= 0) {
//         document.getElementById("days").innerText = "00";
//         document.getElementById("hours").innerText = "00";
//         document.getElementById("minutes").innerText = "00";
//         document.getElementById("seconds").innerText = "00";
//         return;
//     }
//
//     const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//     const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
//     const minutes = Math.floor((diff / (1000 * 60)) % 60);
//     const seconds = Math.floor((diff / 1000) % 60);
//
//     document.getElementById("days").innerText = String(days).padStart(2, '0');
//     document.getElementById("hours").innerText = String(hours).padStart(2, '0');
//     document.getElementById("minutes").innerText = String(minutes).padStart(2, '0');
//     document.getElementById("seconds").innerText = String(seconds).padStart(2, '0');
// }
//
// setInterval(updateCountdown, 1000);
// updateCountdown();


const attendanceSelect = document.getElementById("attendance");
const additionalFields = document.getElementById("additionalFields");
const guestsSelect = document.getElementById("guests");
const extraGuestsDiv = document.getElementById("extraGuests");

// Показываем/скрываем дополнительные поля в зависимости от ответа
if (attendanceSelect) {
    attendanceSelect.addEventListener("change", function() {
        if (this.value === "yes") {
            additionalFields.style.display = "block";
            // Делаем поля обязательными только если выбрано "Да"
            document.getElementById("drink").setAttribute("required", "required");
            document.getElementById("guests").setAttribute("required", "required");
        } else {
            additionalFields.style.display = "none";
            // Убираем обязательность полей
            document.getElementById("drink").removeAttribute("required");
            document.getElementById("guests").removeAttribute("required");
        }
    });
}

// Обработка дополнительных гостей
if (guestsSelect) {
    guestsSelect.addEventListener("change", function() {
        const count = parseInt(this.value);
        extraGuestsDiv.innerHTML = "";

        if (count > 1) {
            extraGuestsDiv.classList.add("active");
            for (let i = 1; i < count; i++) {
                const guestSection = document.createElement("div");
                guestSection.className = "guest-section";
                guestSection.innerHTML = `
                    <h4 class="guest-title">Гость ${i}</h4>
                    <div class="form-group">
                        <label>Фамилия и имя</label>
                        <input type="text" name="guest_${i}_name" required placeholder="Введите имя гостя">
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
    });
}

// Обработка отправки формы
const rsvpForm = document.getElementById("rsvpForm");
if (rsvpForm) {
    rsvpForm.addEventListener("submit", function(e) {
        e.preventDefault();
        alert("Спасибо за ваш ответ! Мы получили вашу информацию.");
        this.submit();
    });
}