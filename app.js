 
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv =require('dotenv').config()
const bodyParser= require('body-parser')
const cors =require('cors')
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
 const PORT = process.env.PORT || 5500

mongoose.connect('mongodb://0.0.0.0/appdb')
.then(()=> console.log('database connected'))
.catch(err=>console.log(err))


const item= new mongoose.Schema({
  item1: {
    type: String
  },
  mum1:String
});
 const ittem=mongoose.model('users', item)


app.post('/api/item/', async (req,res)=>{
  try {
    const newText = new ittem({ item1:req.body.item1});
    await newText.save();
    res.status(201).json(newText);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


 app.put('/api/item/:id', async (req,res)=>{
   const edit = await ittem.findByIdAndUpdate(req.params.id, req.body, {new:true})
   res.status(200).json(edit)
})


app.delete('/api/item/:mum', async (req,res)=>{
  try{
    await ittem.deleteOne(req.params.mum1)
  }catch(error){
    ()=> console.log(error.message)
  }
 
  
})



app.get('/api/item', async (req,res)=>{
  const result = await ittem.find()
})



app.listen(PORT, ()=> console.log('server connected'))