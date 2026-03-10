const weddingDate=new Date("Aug 29 2026 15:00")

function update(){

const now=new Date()

const diff=weddingDate-now

document.getElementById("days").innerText=
Math.floor(diff/(1000*60*60*24))

document.getElementById("hours").innerText=
Math.floor(diff/(1000*60*60)%24)

document.getElementById("minutes").innerText=
Math.floor(diff/(1000*60)%60)

document.getElementById("seconds").innerText=
Math.floor(diff/1000%60)

}

setInterval(update,1000)
update()

