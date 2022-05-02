import  express from  'express'
import  bodyParser  from 'body-parser';
const port = process.env.PORT  || 5000
const app = express();

// app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({extended:false}))

app.use('/add-product', (req, res, next) => {
  res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(port,()=>{
  console.log(`The server is listening on port ${port}`);
});
