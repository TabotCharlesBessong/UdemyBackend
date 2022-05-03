const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')

const app = express();
const port = process.env.PORT || 5000

app.set('view engine','pug')
app.set('views','views')

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: false}));

app.use('/admin', adminRoutes.router);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname,'./','views','404.html'))
});

app.listen(port,()=>{
    console.log(`Our server is running on port ${port}... `);
})
