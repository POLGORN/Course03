const { arch } = require('os');

const about = (res) => {
    let about = require('./about.json');
    res.write(JSON.stringify(about, null, 4));
}

const get_files_filter = (dir, ext) => {
    const rd = require('fs').readdirSync;
    const st = require('fs').statSync;
    const path = require('path');
    const rec = (dir) => {
        let items = rd(dir, 'utf-8');
        for (let item of items) {
            let path_item = path.join(dir, item.toString());
            if (st(path_item).isDirectory()) {
                rec(path_item, ext);
            }
            else {
                if (path_item.slice(-3) == ext) { name_files.push(path_item); }
                else if (path_item.slice(-4) == ext) { name_files.push(path_item); }
            }
        }
    }
    let name_files = [];
    rec(dir);
    return name_files;
}

module.exports = {
    about,
    get_files_filter
}
