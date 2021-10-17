// Modified Date

let date = new Date()
date.setDate(date.getDate() + 2)
let futureDay = date.toLocaleDateString('default', {day: '2-digit'})
let futureMonth = (date.toLocaleDateString('default', {month: 'numeric'}))
let futureYear = date.toLocaleDateString('default', {year: 'numeric'})

console.log(futureMonth + "/" + futureDay + "/" + futureYear)


date.setDate(date.getMonth() + 2)
console.log(futureMonth)
