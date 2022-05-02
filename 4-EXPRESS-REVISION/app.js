
import http from 'http'
import express from 'express'

const port = process.env.PORT || 5000
const app = express()

app.use('/',(req,res,next)=>{
  res.send('<html>')
  res.send('<head> <title>Hello </title>  </head>')
  res.send('<body>')
  res.send('<h1>hello my beloved wife</h1>')
  res.send('<form action="title" method="POST" > <input type="text" name="title" placeholder="add a title"  /> <button>add title</button> </form>')
  res.send('</body>')
  res.send('</html>')
  console.log('in the middle ware')
  res.end()
  // next() // allows the request to continue to the next middleware 
})


app.listen(port,()=>{
  console.log(`The server is listening on port  ${port}... `);
})
