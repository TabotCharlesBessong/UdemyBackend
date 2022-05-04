const path = require('path');

const express = require('express');
const errorController = require('./controllers/error.js')
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page)
app.listen(port,()=>{
  console.log(`The server is running on port number ${port}... `)
});
