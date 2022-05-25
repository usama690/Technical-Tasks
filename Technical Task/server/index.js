const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const { MongooseConnect } = require("./models/mongoose");


// app middlewares

require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json())

//cors
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,PATCH') // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Origin', '*') // update to match the domain you will make the request from
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization , Options'
        // '*'
    )
    next()
})

//using route

app.use("/", require("./Routes/route"));
app.use((error, req, res, next) => {
    res.status(200).json({ error, success: false, message: error.message });
});

if (process.env.NODE_ENV == "development") {
    app.use(cors({ origin: `http://localhost:3000` }));
}

const port = process.env.port || 8000;
app.listen(port, () => {
    MongooseConnect();
    console.log(`API is running at port ${port}`);
});
