require('dotenv').config()
const connectDB = require('./db/connection')
const modle = require('./models/products')
const jsonProduct = require('./products.json');


const start = async()=>{
    try {
        await connectDB(process.env.MONGO_URL)
        await modle.create(jsonProduct);
        console.log("Added Successfully..")
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
start();