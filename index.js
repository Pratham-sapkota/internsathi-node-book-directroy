const express=require('express')
require('./db/mongoose')

const bookStoreRouter=require('./routers/router')


const app=express()
const port=process.env.PORT || 3000

app.use(express.json())
app.use(bookStoreRouter)


app.listen(port,()=>{
    console.log("listening on port "+ port)
})