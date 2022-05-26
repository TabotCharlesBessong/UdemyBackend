const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('5baa2528563f16379fc8a610')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://tabotcharlesbessong:node-complete@cluster0.azbbe.mongodb.net/node-complete?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true}
  )
  .then(result => {
    app.listen(port,()=>{
    console.log(`Mon serveur execute sur le port numero ${port}... `);
  });
  })
  .catch(err => {
    console.log(err);
  });
