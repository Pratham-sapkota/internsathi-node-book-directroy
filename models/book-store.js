const mongoose= require('mongoose')

const Books = mongoose.model('Books',{
    title:{
        type:String,
        trim:true
    },
    author:{
        type: String,
        trim:true
    }
})

module.exports=Books