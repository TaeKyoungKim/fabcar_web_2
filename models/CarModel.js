var mongoose  = require('mongoose')


var carSchema = mongoose.Schema({
    KEY:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    docType:{
        type:String,
        required:true
    },
    make:{
        type:String,
        required:true
    },
    model:{
        type:String,
        required:true
    },
    owner:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Car', carSchema)