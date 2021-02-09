const express = require('express');
const app = express();
const path = require('path');
const mongose = require('mongoose');
const dotenv = require('dotenv');
const session = require('express-session');
const flash = require('connect-flash');
// const methodOverride = require('method-override');
const employeeRoutes = require('./routes/employees');
const bodyParser = require("body-parser");

var methodOverride = require('method-override');
// override with POST having ?_method=PUT
app.use(methodOverride('_method'));



dotenv.config({ path: './config.env' });
const port = process.env.PORT;
app.use(bodyParser.urlencoded({ extended: true }));
// middleware for connect flash
app.use(flash());
// middleware session express
app.use(session({
    secret: "nodejs",
    resave: true,
    saveUninitialized:true
}));
// setting message glabally
app.use((req,res,next)=>{
    res.locals.success_msg = req.flash(("success_msg"));
    res.locals.error_msg = req.flash(("error_msg"));
    next();
});
// connecting to mongodb database
mongose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(con=>{
    console.log("Database connected successfully");
});

app.set('views', path.join(__dirname, "views"));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(employeeRoutes);


app.listen(port, () => {
    console.log("Server is running");
});