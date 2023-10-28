const express = require('express');
const mainPageRouter = require("./src/routes/mainPage.route");


const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');

app.use('/assets', express.static(__dirname + '/assets'));
app.use(express.json());

app.use('/', mainPageRouter);

app.listen(PORT, (error) =>{
    if(error) {
        console.log(error);
    }
    console.log("Application is running at: %chttp://localhost:3000", "color: blue; text-decoration: underline;");
});
