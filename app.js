const express = require('express');
const session = require('express-session');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
dotenv.config();
global.__basedir = __dirname;
const listEndpoints = require('express-list-endpoints');
let logger = require('morgan');
const passport = require('passport');

const { clientPassportStrategy } = require('./middleware');
const { adminPassportStrategy } = require('./middleware');
const { googlePassportStrategy } = require('./middleware');
const { facebookPassportStrategy } = require('./middleware');

const app = express();
const corsOptions = { origin: process.env.ALLOW_ORIGIN, };
app.use(cors(corsOptions));

//template engine
app.set('view engine', 'ejs'); 
app.set('views', path.join(__dirname, 'views'));

//all routes 
const routes =  require('./routes');

clientPassportStrategy(passport);
adminPassportStrategy(passport);
googlePassportStrategy(passport);
facebookPassportStrategy(passport);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());
app.use(session({
  secret:'my-secret',
  resave:true,
  saveUninitialized:false
}));
app.use(routes);

app.get('/', (req, res) => {
  res.render('index');
});

if (process.env.NODE_ENV !== 'test' ) {

  const seeder = require('./seeders');
  const allRegisterRoutes = listEndpoints(app);
  seeder(allRegisterRoutes).then(()=>{console.log('Seeding done.');});
  app.listen(process.env.PORT,()=>{
    console.log(`your application is running on ${process.env.PORT}`);
  });
} else {
  module.exports = app;
}
