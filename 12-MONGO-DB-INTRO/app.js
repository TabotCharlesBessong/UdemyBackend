const path = require('path');
const mongoose = require('mongoose')
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
// const User = require('./models/user');

const app = express();
const port = process.env.PORT  || 5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
// const { Mongoose } = require('mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use((req, res, next) => {
//   User.findById('628ef4c46bf0827ff4a23269')
//     .then(user => {
//       req.user = new User(user.name, user.email, user.cart, user._id);
//       next();
//     })
//     .catch(err => console.log(err));
// });

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose.connect('mongodb+srv://tabotcharlesbessong:node-complete@cluster0.azbbe.mongodb.net/node-complete?retryWrites=true&w=majority')
.then(result => {
  app.listen(port,()=>{
  console.log(`Mon serveur execute sur le port numero ${port}... `)
})
}).catch(err => {
  console.log(err)
})