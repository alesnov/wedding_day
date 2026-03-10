const guests=document.getElementById("guests")
const extra=document.getElementById("extraGuests")

guests.onchange=()=>{

extra.innerHTML=""

let count=guests.value-1

for(let i=0;i<count;i++){

extra.innerHTML+=`
<input placeholder="Имя гостя">
`

}

}