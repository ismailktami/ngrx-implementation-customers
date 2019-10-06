const express = require('express')
const app = express()
const path =require('path')
const jsonServer = require('json-server');

app.use(express.static(__dirname + '/dist/reduximplementation'))
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname + '/dist/reduximplementation/index.html'))
})
app.use('/api',jsonServer.router('db.json'))
app.listen(process.env.PORT || 4200)
