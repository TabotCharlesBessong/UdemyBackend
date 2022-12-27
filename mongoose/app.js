const path = require('path');
const dotenv = require('dotenv')

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session')

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
mongoose.set("strictQuery", true);
dotenv.config()

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret:'my secret text',resave:false,saveUninitialized:false}))

app.use((req, res, next) => {
  User.findById("63a9d5e0322e32629361bf94")
		.then((user) => {
			req.user = user;
			next();
		})
		.catch((err) => console.log(err));
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
            items:[]
          }
        })
        user.save()

      }
    } )
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
