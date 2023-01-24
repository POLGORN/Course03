class WorkData {
    get json() {
        return this._json;
    }
    constructor(file_name) {
        this._json = require(file_name);
    }

    comparator(a, b, fields, directs) {
        let dict = {'asc': +1, 'desc': -1};
        let d = dict[directs[0]];
        let f = fields[0];

        if ((fields.length === 1) || (a[f] !== b[f])) {
            return d * (a[f] > b[f] ? +1 : -1);
        }
        return this.comparator(a, b, fields.slice(1,), directs.slice(1,));
    }

    orderBy(fields, directs) {
        return this._json.sort((a, b) => this.comparator(a, b, fields, directs));
    }
}

module.exports = {
    WorkData
}