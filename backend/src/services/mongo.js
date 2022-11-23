const mongoose = require('mongoose');

const MONGO_URL = 'mongodb+srv://ambi-api:sHCHKCZda9GUsIG5@ambicluster.iysvpo5.mongodb.net/ambi?retryWrites=true&w=majority';

mongoose.connection.once('open', () => {
    console.log('MongoDB connection ready!');
});

mongoose.connection.on('error', (err) => {
    console.error(err);
});

async function mongoConnect() {
    await mongoose.connect(MONGO_URL);
};

async function mongoDisconnect() {
    await mongoose.disconnect();
};

module.exports = {
    mongoConnect,
    mongoDisconnect
};