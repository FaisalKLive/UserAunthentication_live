console.log("******** Welcome  ********* !!!")

import express from 'express'

import mongoose from 'mongoose'

import MongoStore from 'connect-mongo'

import session from 'express-session'

import { MemoryStore } from 'express-session'

import isValidUser from './middlewares/validate.js'

import router from './routes/routes.js'

import {} from 'dotenv/config'

import { MemoryStore } from 'express-session'

const uri = process.env.MONGO_URI

//const uri = "mongodb+srv://FullStack:Conestoga@cluster0.1ua8had.mongodb.net/CostCoUserz?retryWrites=true&w=majority&appName=Cluster0";

const session_store = MongoStore.create({
    mongoUrl : uri ,
    dbName : 'CostCoUserz',
    collectionName : 'CostCoSessions'
})



const app = express()

app.use(express.urlencoded({extended:true}))

app.use(session({
    secret : 'A secret Key to sign the cookie',
    saveUninitialized : false ,
    resave : false,
    store : session_store,
    cookie: { maxAge: 86400000 },
    store: new MemoryStore({
      checkPeriod: 86400000 // prune expired entries every 24h
    })
}))

app.set('view-engine','ejs')

app.use(express.static('public'))


const PORT = process.env.PORT || 8080   


app.listen(PORT,()=>{

    console.log(`App is listening at port ${PORT} !!!!!!!!!!!`)
})

// app.get('/home',(req,res)=>{

//     res.render('home.ejs')
// })

// app.get('/login',(req,res)=>{

//      req.session.isValid = true
 
//     console.log(req.session)

//     console.log(req.session.id)

//     res.render('login.ejs')
// })

// Adding Middleware to Dashboard Route
// To restrict the user from accessing the dashboard page
// only the logged in user having session will be visiting
// the dashboard page

// app.get('/dashboard',isValidUser,(req,res)=>{

//     res.render('dashboard.ejs')
// })


// app.post('/logout',(req,res)=>{

//     req.session.destroy((err)=>{
//         if(err) throw err

//         res.redirect('/home')
//     })
// })

app.use('/',router)



app.get('/test',(req,res)=>{

    req.session.user = "Johnson"


    req.session.age = 20

    console.log(req.session)

    delete req.session.user
    
    console.log(req.session)

    res.render('test.ejs')
})

export default session
