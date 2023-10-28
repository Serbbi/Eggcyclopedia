require('dotenv').config();
const express = require('express');
const mainPageRouter = require("./src/routes/mainPage.route");
const { mongoose } = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.json());

app.use('/', mainPageRouter);

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
    });

app.listen(process.env.PORT, (error) =>{
    if(error) console.log(error);
    console.log("Application is running at: %chttp://localhost:3000", "color: blue; text-decoration: underline;");
});
