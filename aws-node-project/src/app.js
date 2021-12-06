let app = require('./index');
let http = require('http');

app.set('port', 4004);

var server = http.createServer(app);

server.listen(4004,() =>{
    console.log(`Server Running On Port 4004`)
});
