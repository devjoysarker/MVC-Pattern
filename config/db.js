
const monoogs = require('mongoose');

const connectDB = async() => {
    try {
        const connect = await monoogs.connect(process.env.Mongo_DB);
        console.log(`MongoDB Connect`.bgMagenta.blue);
        
    } catch (error) {
        console.log(`${error}`.red);
    }
}

module.exports = connectDB;