import  express from  'express'
import  bodyParser  from 'body-parser';

import adminRoutes from './routes/admin.js'
import shopRoutes from './routes/shop.js'

const port = process.env.PORT  || 5000
const app = express();

// app.use(bodyParser.json({limit:"30mb",extended:true}))
app.use(bodyParser.urlencoded({extended:false}))

app.use('/admin',adminRoutes)
app.use(shopRoutes)

app.use((req,res,next)=>{
  res.status(404).send('<h1>Page not found</h1>')
})



app.listen(port,()=>{
  console.log(`The server is listening on port ${port}....`);
});
