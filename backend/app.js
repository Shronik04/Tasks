const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv/config");
const route = require("./routes/blogRoute");
const userCheck = require("./middleware/checkId");
const upload = require("./middleware/mult");

const app = express();

app.use(express.json({ limit: "1mb", extended: true }));
app.use(cors());
app.use(route);
app.use("/user", userCheck);
app.use("/images/", express.static("uploads"));
// app.use('/upload',upload )

mongoose
	.connect(process.env.DB_CONNECT, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then((result) => {
		app.listen(5000);
		console.log("DB is connected & server is running at 5000");
	})
	.catch((err) => console.log("Error in connecting DB", err));
