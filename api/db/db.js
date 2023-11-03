const { mongoose } = require("mongoose");

const db =  async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL)
        console.log('DB connection established')
    } catch (error) {
        console.log('db connection error: ' + error)
    }
}

module.exports =  {db};