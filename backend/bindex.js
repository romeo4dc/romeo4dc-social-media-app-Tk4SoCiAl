const express = require("express")
const app = express()

const port = 4444;

app.get("/",(req,res)=>{
    res.send("yoo")
    console.log(req,res)
})
app.get("/yolo/:ruru",(req,res)=>{
    res.send(`yoo,${req.params.ruru}`)
})

app.listen(port,()=>{
    console.log("Server is running on port " + port);
})