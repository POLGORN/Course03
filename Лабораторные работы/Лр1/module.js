function sort_insert(arr){
    
    for ( let i = 1,  m = arr.length; i < m; i++)
    {
        const k = arr[i]; 
        j = i ;
        while(j>0 && arr[j-1]> k)
        {
            arr[j] = arr[j-1];
            j--;
        }
    arr[j] = k;
}
    
    return arr;
}

module.exports = {
    sort_insert
}
