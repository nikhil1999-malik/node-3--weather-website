const path=require('path')
const express=require('express')
const hbs=require('hbs')
const geocode=require('../geocode')
const forecast=require('../forecast')



const app=express()
const DirectoryPath=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templating/views')
const PartailHBS=path.join(__dirname,'../templating/partial')
app.set('view engine','hbs')
app.set('views',viewsPath)

hbs.registerPartials(PartailHBS)

app.use(express.static(DirectoryPath))

//app.com
//app.com/help
//app.com/about

app.get('',(req,res)=>{
    res.render('./index',{
        title:'Weather',
        name:'Nikhil'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Nikhil MAlik'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help', 
        name:'Help me '
        
    })
})

app.get('/products',(req,res)=>{
  
    if(!req.query.address){
        return res.send({
            error:'You must provide a search term'
        })
    }

   res.send({
       products : [],
       address: req.query.address
   })
   
})

app.get('/weather',(req,res)=>{

    if (!req.query.address){
        return res.send({
            error
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if (error){
            return res.send({
                error
            })
            
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if (error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
        })
    })
})








app.listen(3000,()=>{
    console.log("Server is on port 3000")
})//start server

