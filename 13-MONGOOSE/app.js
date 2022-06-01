const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const errorController = require('./controllers/error');
const User = require('./models/user');

const app = express();
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  // User.findById('628f9c41f9394a489cf9c1b3')
  //   .then(user => {
  //     req.user = user
  //     next();
  //   })
  //   .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

mongoose
  .connect(
    'mongodb+srv://tabotcharlesbessong:node-complete@cluster0.azbbe.mongodb.net/node-complete?retryWrites=true&w=majority',{useUnifiedTopology: true, useNewUrlParser: true}
  )
  .then(result => {
    // User.findOne().then(user => {
    //   if (!user) {
    //     const user = new User({
    //       name: 'Tabot Charles Bessong',
    //       email: 'ebezebeatrice@gmail.com',
    //       cart:{
    //         items:[]
    //        }
    //     })
    //   user.save()
    //   }})
    app.listen(port,()=>{
    console.log(`Mon serveur execute sur le port numero ${port}... `);
  });
  })
  .catch(err => {
    console.log(err)
  });
