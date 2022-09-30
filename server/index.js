const express = require("express")
const app = express()

const path = require('path')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const port = process.env.PORT || 3000 

const User = require("./model/User")

app.use(cors())
app.use(express.json())
dotenv.config()



mongoose.connect(
    process.env.NODE_ENV === 'production' ?
     process.env.DATABASE:'mongodb://localhost:27017/invoice-app'
    ).then(()=> {
        console.log(`🌿[database]: Connected to database`) 
    })


app.use(express.static(path.resolve(__dirname, '../client/build'))) 

app.post("/api/register", async (req,res)=>{
    console.log(req.body)
    let user = User.findOne({
        email: req.body.email
    })

    if(!user){
        res.json({ status: 'error', error: 'Invalid login' })
    }

    try {
        req.body.password = await bcrypt.hash(req.body.password, Number.parseInt(process.env.SALT))
        user = new User(req.body)
        await user.save()
        res.json({ status: 'ok' })

    } catch (error) {
        console.log(`⚠️[server]: Error!\n${error}`)   
        res.json({ status: 'error', error: 'Invalid login' })

    }


})

app.get("/api", (req, res) => {
    res.json({ message: "⚡[server]: Hello from server!" })
})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'))
  })

app.listen(port, ()=>{
    console.log(`⚡[server]: Server is listening on port ${port}`)
})

