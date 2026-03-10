const map = document.getElementById("seating-map")

for(let i=1;i<=6;i++){

let table=document.createElement("div")

table.className="table"

table.innerHTML=`

<h3>Стол ${i}</h3>
<p>Гости</p>

`

table.onclick=()=>{

alert("Здесь будут имена гостей")

}

map.appendChild(table)

}