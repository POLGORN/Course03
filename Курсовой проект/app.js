const http = require("http");
const { about, get_files_filter } = require('./module');
let { WorkData } = require('./library');

const server = http.createServer();
const port = 3000;

let select_case = (args, response) => {
    try {
        switch (args.length) {
            case 1: // http://localhost:3000
                about(response);
                break;
            case 2: // http://localhost:3000/json или http://localhost:3000/csv
                let files =  get_files_filter('./public/', args[1]);
                response.write(files.join('\n'));
                break;
            case 3: // http://localhost:3000/json/abiturs.json
                let wd = new WorkData(`./public/${args[1]}/${args[2]}`);
                response.write(JSON.stringify(wd.json));
                break;
            case 4: // http://localhost:3000/json/abiturs.json/?rating=desc&name=asc
                params = args[3].slice(1, args[3].length).split('&')
                let fields = []
                let directs = []

                for(i in params){
                    let x = params[i].split('=')
                    fields.push(x[0])
                    directs.push(x[1])
                }
                let wd_order = new WorkData(`./public/${args[1]}/${args[2]}`).orderBy(fields, directs);

                response.write(JSON.stringify(wd_order));
                break;
            default:
                response.statusCode = 404;
                response.write('Запрос ошибочный...');
                break;
        }            
    } catch (error) {
        console.error(error);
    }
    response.end();
}

let callback = (request, response) => {
    let args = request.url.split('/');
    response.setHeader('Content-Type', 'text/plain; charset=utf-8');
    if (args[args.length-1] === '') args.pop();
    select_case(args, response);
}

server.on("request", callback);

server.listen(port, () => console.log(`localhost:${port}`));