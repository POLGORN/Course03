    // let ex_02 = function (arr) { 
    //     return arr.sort((a,b) => b[3] - a[3] );
    // }
    let ex_02 = function (arr) { 
        return arr
        .sort((a,b) => b[3] < a[3]? -1: 1) 
        .sort((a,b) => b[1] < a[1]? 1: -1 );
        

    }
let students = [

    [0,'Пиб-21', 'Aaa', 200],
    [1, 'Пиб-21', 'Zzz',300],
    [2, 'Ис-31', 'Mmm', 180],
    [3, 'Ис-31', 'ggg', 220],
    [4, 'Ис-31', 'ooo', 120],
    [5, 'Пинб-41', 'Bbb', 141],
    [6, 'Пинб-41','Bbb',192],
    [7, 'Пиб-11', 'Zzz', 169],
];

  ex_02(students)
    .forEach(item => console.log(item));

 