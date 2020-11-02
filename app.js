const express = require('express');
const app = express();
const session = require("express-session")

const indexRoutes = require('./routes/indexRoutes')
const productRoutes = require('./routes/productRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require("./routes/loginRoutes")


const logMiddleware = require("./middlewares/logMiddleware");
const cookieParser = require('cookie-parser');
const recordameMiddleware = require("./middlewares/recordameMiddleware")


app.set('view engine', 'ejs');

app.use(cookieParser())
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use(session({secret: "secreto",resave: false,
saveUninitialized: true}))

app.use(recordameMiddleware);
app.use(logMiddleware);


app.listen(3000, () => { console.log('FUNCIONANDO EN EL PUERTO 3000')})


app.use('/', indexRoutes);

app.use('/product', productRoutes);

app.use('/register', registerRoutes);

app.use('/login', loginRoutes)