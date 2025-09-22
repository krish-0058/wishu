const mongoose = require("mongoose")

const dataSchema =  mongoose.Schema({
    naam:{
        type:String,
    },
    message:{
        type:String,
    },
    image:{
        type:String,
    },
    shortCode:{
        type:String,
    },
    date:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model("data",dataSchema)