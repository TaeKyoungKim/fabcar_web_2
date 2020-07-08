var router = require('express').Router()
var queryUtil = require('../utils/Util')
var Car = require('../models/CarModel')


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

router.get('/savedata/:carnum', async (req, res , next)=>{
    console.log(req.params.carnum)
    var searchdata = req.params.carnum
    var result  = await queryUtil.queryData(searchdata)
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    res.render('savedata', {data:resultData , KEY:searchdata})
})

router.get('/create' ,(req, res , next)=>{
    res.render('create')
})


router.post('/savedata', async (req ,res, next)=>{

    var contact  = new Car()
    contact.KEY = req.body.KEY
    contact.color =req.body.color
    contact.docType = req.body.docType
    contact.make = req.body.make
    contact.model = req.body.model
    contact.owner = req.body.owner

    
    contact.save((err , result)=>{
        if(err) {
            console.log(err)
        }

        console.log(result)
        res.redirect('/')
    })

    
})

router.post('/create' ,async (req, res , next)=>{
    console.log(req.body.KEY)
    var KEY = await req.body.KEY
    var color = await req.body.color
    var make = await req.body.make
    var model = await req.body.model
    var owner =  await req.body.owner

    await queryUtil.createCar(KEY ,color,make,model,owner)
    
    await res.redirect("/")
})


router.get('/detaildata/:carnum', async (req, res , next)=>{
    console.log(req.params.carnum)
    var searchdata = req.params.carnum
    var result  = await queryUtil.queryData(searchdata)
    var resultData  = await JSON.parse(result)
    
    console.log(resultData)
    res.render('detaildata', {data:resultData , KEY:searchdata})
})

router.get('/changeowner' , async (req ,res , next)=>{
    var result  = await queryUtil.queryAllData()
    var resultData = JSON.parse(result)
    res.render('changeowner', {data:resultData })
})

router.post('/changeowner' ,async (req, res ,next)=>{
    console.log(req.body.KEY)
    var KEY = req.body.KEY
    var owner = req.body.owner

    await queryUtil.changeOwner(KEY , owner)
    res.redirect('/') 
})
module.exports = router;