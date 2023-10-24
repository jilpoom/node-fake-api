const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const uri = process.env.MONGODB_ATLAS_URI;

const connect = async () => {
    await mongoose.connect(uri)
        .then(() => {
            console.log("MONGODB CONNECT")
        })
        .catch((error) => {
            console.log(error);
        })
};

mongoose.connection.on('error', (error) => {
    console.error('MongoDB Connection Error');
});

mongoose.connection.on('disconnected', () => {
    console.error('ReConnected...');
    connect();
})



module.exports = connect;