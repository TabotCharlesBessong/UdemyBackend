console.log('Hello Mark');
import http from 'http'
import fs from 'fs'
import { parse } from 'path';
// import { on } from 'stream';

// ok well write now we have as for objective of writing values we get from a form to a .txt file 
const port = process.env.PORT  || 5000

const rqListener = (req,res)=>{
  const url = req.url 
  const method = req.method
  // this is  our form here on the home page
  if(url === '/'){
    res.write('<html>')
    res.write('<head> <title>enter a message</title> </head>')
    res.write('<body><form action="/message" method="POST"  > <input type="text" name="message"  placeholder="enter a value" /> <button type="submit" >Whats up doc</button> </form></body>')
    res.write('</html>')
    return res.end()
  }
  
  // we will use the req.on method to have access to that information
  // so we are checking if our url is matching and if we are using the post method 
  if(url === '/message' && method === 'POST'  ){
    // this body here as it is an array can be used to store our bundle of data
    const body = []
    req.on('data',(chunk)=>{
      console.log(chunk);
      // with the req.on method we can get the data which we in turn push into our array 
      body.push(chunk)
    })

    // up on ending , we want it to write the information to out .txt file 
    req.on('end',()=>{
      const parseBody = Buffer.concat(body).toString()
      const message = parseBody.split('=')[1]
      let newMessage = message.split("+").join(" ")
      // console.log(parseBody)
      fs.writeFile('message.txt',newMessage,(err)=>{
        
      })
    })

    // req.on('end',()=>{
    //   const parseBody = Buffer.concat(body).toString()
    //   const message = parseBody.split('=')[1]
    //   // console.log(parseBody)
    //   fs.writeFileSync('message.txt',message)
    // })

    // we are setting our header thanks to the redirect status code 
    res.statusCode = 302
    res.setHeader('Location','/')
    return res.end()
  }
  res.setHeader('content-Type','text/html')
  res.write('<h1>Hello world</h1>')
}

const server =  http.createServer(rqListener)
server.listen(port)