const mongoose= require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/book-directory-backend',{
    useNewUrlParser:true,
    // useCreateIndex:true
})