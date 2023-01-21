const clients = require('./Clients.json').clients
console.clear()
let a = "Кунгур"

let arr = clients
    .filter(cit => cit.address.city === a)
	.sort((a,b) => b.age-a.age )
	.sort((a,b) => a.name-b.name)
    .sort((a,b)=> a.gender-b.gender)
console.log(arr)
