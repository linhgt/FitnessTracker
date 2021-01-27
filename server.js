//import modules
const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");

//Open port
const PORT = process.env.PORT || 3000;

//Initialize express app
const app = express();

app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.use(require("./routes/apiRoutes"));
app.use(require("./routes/htmlRoutes"));

//Setup connection to mongoose DB
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

//Listen to port
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});
