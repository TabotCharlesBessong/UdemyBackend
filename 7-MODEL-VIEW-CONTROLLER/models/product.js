
const fs = require('fs')
const path = require('path')
const path = require('path')

module.exports = class products  {
  constructor (title) {
    this.title = this.title
  }

  save(){
    // products.push(this)
    const p = path.join(path.dirname(process.mainModule.filename),'data','products.json')

    fs.readFile(p,(err,fileContent)=>{
      console.log(err)
    })
  }

  static fetchAll(){
    return products
  }
}