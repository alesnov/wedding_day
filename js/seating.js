const map=document.getElementById("seating-map")

for(let i=1;i<=6;i++){

let table=document.createElement("div")

table.className="table"

table.innerHTML=`

<h3>Стол ${i}</h3>
<p>Нажмите чтобы увидеть гостей</p>

`

table.onclick=()=>{

alert("Здесь можно указать имена гостей")

}

map.appendChild(table)

}

