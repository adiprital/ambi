const app = require('../src/app');
const http = require('http');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

server.listen(PORT, () => {
    console.log(`listening to port ${PORT}...`)
})