const guests = document.getElementById("guests")
const extra = document.getElementById("extraGuests")

guests.onchange = () => {

extra.innerHTML = ""

let count = guests.value - 1

for (let i = 0; i < count; i++) {

extra.innerHTML += `

<div class="guest-card">

<input placeholder="Фамилия и имя">

<select>

<option>вино красное</option>
<option>вино белое</option>
<option>водка</option>
<option>коньяк</option>
<option>виски</option>
<option>не пью</option>

</select>

</div>

`

}

}