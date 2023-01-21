
class WorkCSV {
    _json; // данные считанные из файла
    _tmp; // данные для текущей работы
    get json () {
        return this._json;
    }
    // сделайте геттер свойства для поля _json
    constructor(file_name, del) {
        this.fs = require("fs");
        this._ = require("lodash");
        this.csvjson = require("csvjson");
        this.fastcsv = require("fast-csv");
        this._json = this.csv_to_json(file_name, del);
        this._tmp = this.restore();
    }
    restore() {
        this._tmp = this._.clone(this._json);
    }
    csv_to_json(nameFile, del=',') {
        let textCSV = this.fs.readFileSync(nameFile, 'utf-8');
        return this.csvjson.toObject(textCSV, { delimiter: del });
    }

    json_to_csv(nameFile, del=',') {
        let fw = this.fs.writeFileSync(nameFile);
        return this.fastcsv
        //toObject(textCSV, { delimiter: del });
            .write(array, {headers:true})
            .pipe(fw);
    }
    select(...fields) {
        this._tmp = JSON.parse(JSON.stringify(this._tmp, fields));
        return this._tmp;
    }
    where(field, value) {
        this._tmp = this._tmp.filter(obj => obj[field] === value.toString());
        return this._tmp;
    }
    
    orderBy(fields, directs) {
        this._tmp = this._.orderBy(this._tmp, fields, directs);
        return this._tmp;
    }
    comparator = (a, b, fs, ds) => {
        if ((fs.length > 1) && (a[fs[0]] === b[fs[0]])) {
            return this.comparator(a, b, fs.slice(1,), ds.slice(1,));
        }
        let d = { 'asc': +1, 'desc': -1};
        return d[ds[0]] * (a[fs[0]] > b[fs[0]]? +1: -1);
    }
    
    orderBy = (arr, fields, directs) => {
        return arr.sort((a,b) => comparator(a,b,fields,directs));
    }
    insert() {
        // добавить запись
        // предусмотреть увеличение id
    }
    update() {
        // изменить все записи по признаку
    }
    delete() {
        // удалить все записи по признаку
    }
    filter(fields, values) {
        values = values.map(elm => elm.toString());
        let arr_fltr = this._.zip(fields, values);
        let obj_fltr = this._.fromPairs(arr_fltr);
        this._tmp = this._.filter(this._tmp, obj_fltr);
        return this._tmp;
    }
}

module.exports = {
    WorkCSV
}
