const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config')
const route=require('./routes/blogRoute')
const app = express();

app.use(express.json());
app.use(cors());
app.use(route)
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
    })
    .then((result) => {
        app.listen(5000)
        console.log("server is running at 5000");
    })
.catch(err=>console.log("Error in connecting DB",err))