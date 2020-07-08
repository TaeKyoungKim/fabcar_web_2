var express = require('express')
var path = require('path')
var bodyParser = require('body-parser')
var ejs = require('ejs')
var app = express()
require('dotenv').config()

var apiRouter = require('./routes/Router')
//templetes file settings
app.set('views', path.resolve(__dirname + '/views'))
app.set('view engine', 'ejs')

//body-parser

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())


//cors 처리
var cors  = require('cors')
app.use(cors())

//routing파일 등록
app.use('/', apiRouter)

var port = process.env.PORT || 3000
app.listen(port , ()=>{
    console.log(`Server is Starting at http://localhost:${port}`)
})