var router = require('express').Router()
var queryUtil = require('../utils/Util')

router.get('/', async (req, res , next)=>{
    var result  = await queryUtil.queryAllData()
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    // res.send(resultData)
    res.render('index', {data:resultData})
})

router.get('/searchdata', async (req, res , next)=>{
    console.log(req.query.search)
    var searchdata = req.query.search
    var result  = await queryUtil.queryData(searchdata)
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    // res.send(resultData)
    res.render('searchdata', {data:resultData, KEY:searchdata})
})

router.get('/create' ,(req, res , next)=>{
    res.render('create')
})

router.post('/create' ,async (req, res , next)=>{
    console.log(req.body.KEY)
    var KEY = req.body.KEY
    var color = req.body.color
    var make = req.body.make
    var model = req.body.model
    var owner =  req.body.owner

    await queryUtil.createCar(KEY ,color,make,model,owner)
    
    await res.redirect("/")
})
module.exports = router;