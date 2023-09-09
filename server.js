const express  = require('express')
const cors = require('cors')
const supabaseclient = require('@supabase/supabase-js')

// const { supabase } = require('@supabase/auth-ui-shared')
const SUPABASE_URL = "https://xzoccaixasrxfxxoypcd.supabase.co"
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh6b2NjYWl4YXNyeGZ4eG95cGNkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTM1MDI3NDksImV4cCI6MjAwOTA3ODc0OX0.CqM5qep15yxBjbu1G7ytcxL7u8zHbRIx0GR1KtZPrmc"
supabase = supabaseclient.createClient(SUPABASE_URL,SUPABASE_KEY);

app = express()

app.use(cors())
app.use(express.json())
/////GET////////////////
app.get('/item',(req,res)=>{
    supabase
    .from("WarframeItem")
    .select("Name")
    .then((data)=>{
        res.send(data.data)
    })
    
})
app.get('/warframemarket',(req,res) =>{
    supabase
    .from("WarframeMarket")
    .select("Name,Cost")
    .order('Date', { ascending: false })
    .then((data)=>{
        res.send(data.data)
    })


    
})



//////POST///////////////
app.post('/auth',(req,res) =>{
    supabase.auth.signInWithPassword(req.body)
    .then((data)=>{
        res.send(data.data.user)
    })
    
    
})
app.post('/sell',(req,res) =>{
    console.log("Sending....")
    supabase
        .from("WarframeMarket")
        .insert({
            Name : req.body.name,
            Cost : req.body.cost,
            userID : req.body.userID
        })
        .then(()=>{
            console.log("Complete")
        })
})
app.post('/register',(req,res) =>{
    console.log("Sending...")
    supabase.auth.signUp(req.body)
    .then((data)=>{
        console.log("Register Complete")

    })
    
    
})



app.listen('3001',()=>{
    console.log("Port 3001 start....")
})
