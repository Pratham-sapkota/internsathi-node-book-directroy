const express= require('express')
const router=new express.Router()
const Book= require('../models/book-store')
const { $where } = require('../models/book-store')

router.post('/books',async (req,res)=>{
    const book = new Book(req.body)
    try{
        await book.save()
        res.status(201).send(book)
    }catch(e){
        res.status(400).send(e)
    }
})

router.get('/books',async (req,res)=>{

    try{
        const books =await Book.find({})
        res.send(books)
    } catch(e){
        res.status(500).send()
    }
    
})

// router.get('/books/:search',async (req,res)=>{
//     const _search= req.params
    
    
//     try{
//     const book=await Book.find({
       
//     })
//         if(!book){
//             return res.status(400).send()
//         }
//         res.send(book)
//     }catch(e){
//         res.status(500).send(e)
//     }
 
// })


router.get('/books/:title',async (req,res)=>{
    const _title= req.params.title
    
    
    try{
    const book=await Book.findOne({title:/`${_title}`/})
        if(!book){
            return res.status(400).send()
        }
        res.send(book)
    }catch(e){
        res.status(500).send(e)
    }
 
})

router.get('/author/:author',async (req,res)=>{
    const _author= req.params.author
    console.log(_author)
    
    try{
        const book=await Book.find({author:_author})
        if(!book){
            return res.status(400).send()
        }
        res.send(book)
    }catch(e){
        res.status(500).send(e)
    }
 
})

router.patch('/books/:id',async(req,res)=>{
    //line 54 to 60 is to check whether keys other than given are being updated
    const updates=Object.keys(req.body) //return array
    const allowedUpdates=['title','author']
    const isValidUpdate=updates.every((update)=>allowedUpdates.includes(update))

    if(!isValidUpdate){
        return res.status(400).send({error:"invalid updates"})
    }
    try{
        const book=await Book.findById(req.params.id)
        updates.forEach((update)=>book[update]=req.body[update])
        await book.save()

        if(!book){
            return res.status(404).send()
        }
        res.send(book)
    }catch(e){

        res.status(400).send(e)

    }
})

router.delete('/books/:id',async(req,res)=>{
  try{
    const book= await Book.findByIdAndDelete(req.params.id)
    if(!book){
        return res.status(404).send()
    }
    res.send(book)
  }catch(e){
    res.status(500).send(e)
  }
})

module.exports=router
