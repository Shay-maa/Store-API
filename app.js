require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express();

const connectDB = require('./db/connection')
const productsRouter= require('./routes/products')

const notFound = require('./middlewares/not-found')
const errorHandler = require('./middlewares/error-handler')

app.use(express.json())

//routes
app.get('/',(req,res)=>{
    res.send('<h1>Store API</h1>')
})
app.use('/api/v1/products' ,productsRouter );


app.use(notFound)
app.use(errorHandler)

const port = process.env.PORT || 3000

const start = async()=>{
    try{
        await connectDB(process.env.MONGO_URL);
        app.listen(port, console.log(`Server app listening on port ${port}!`))
    }catch(error)
    {
        console.log(error)
    }
}
start();