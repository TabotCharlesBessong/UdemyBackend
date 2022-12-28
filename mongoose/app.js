const path = require('path');
const dotenv = require("dotenv");
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/error');
const User = require('./models/user');

mongoose.set("strictQuery", true);
dotenv.config()

const app = express();
const store = new MongoDBStore({
	uri:process.env.MONGO_URL,
	collection:'sessions',
});

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes)

app.use(errorController.get404);

mongoose
  .connect(process.env.MONGO_URL)
  .then(result => {
    User.findOne()
    .then(user => {
      if (!user) {
        const user = new User({
					name:'Charles Tabot',
					email:'charles.tabot@gmail.com',
					cart: {
						items: []
					}
				})
        user.save()
      }
    })
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
