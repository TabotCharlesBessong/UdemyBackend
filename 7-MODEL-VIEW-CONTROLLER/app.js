const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
  res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

app.listen(port,()=>{
  console.log(`The server is running on port number ${port}... `)
});
