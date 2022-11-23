const app = require('../src/app');
const http = require('http');
const { mongoConnect } = require('./services/mongo');

const PORT = process.env.PORT || 8000;

const server = http.createServer(app);

async function startServer() {
    await mongoConnect();

    server.listen(PORT, () => {
        console.log(`listening to port ${PORT}...`)
    });
};

startServer();

// server.listen(PORT, () => {
//     console.log(`listening to port ${PORT}...`)
// });