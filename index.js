const express=require('express')
const mongoose=require('mongoose');
const fs=require('fs');
const configure=require('./appConfig/configure');
const bodyParser=require('body-parser');
const cookieParser=require('cookie-parser');
const globalErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
const helmet=require('helmet');
const app= express();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())


let modulePath='./module';
fs.readdirSync(modulePath).forEach(function(file){

    if(~file.indexOf('.js')){
        require(modulePath+'/'+file);
    }
})


let routePath='./routes';
fs.readdirSync(routePath).forEach(function(file){

    if(~file.indexOf('.js')){
        let route=require(routePath+'/'+file);
        console.log(routePath+'/'+file)
        route.setRouter(app);
    }
})

app.use(globalErrorMiddleware.globalNotFoundHandler)



app.listen(configure.port, ()=>{

    let db=mongoose.connect(configure.db.uri,{useNewUrlParser:true});
})

mongoose.connection.on('error',function(err){
    if(err){
        console.log(err);  
    }
})

mongoose.connection.on('openuri',function(err){
    if(err){
        console.log(err);  
    }
    else{
        console.log("database connection open success")
    }
})