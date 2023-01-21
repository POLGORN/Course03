const {sort_insert } = require("./module");
 
let arr = Array(1000).fill(0).map(() => Math.floor(Math.random()*1000));

console.clear();

console.time('time');

console.table(sort_insert(arr).slice(0,100))

console.timeEnd('time')