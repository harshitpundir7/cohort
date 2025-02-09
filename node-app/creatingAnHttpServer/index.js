const express = require("express")

const app = express();

let requests = 0;

app.use((req, res, next)=>{
   requests++;
    next();
})
app.get("/req",(req,res)=>{
    res.json({
        ans: requests
    })
})
// function logRequest(req,res,next){
//     console.log(`You are Requesting to :${req.url}`);
//     next();
// }

// app.get("/special", logRequest, (req,res)=>{
    //     res.send("This is the special route")
    // })
    
    app.get("/sum", function(req, res){
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a+b
    })

})
app.get("/sub", (req, res)=>{ 
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    res.json({
        ans: a-b
    })

})
app.get("/mul", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans : a*b
    })
})
app.get("/div", (req, res)=>{
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a/b
    })
    
})

//Assignment




app.listen(3000)