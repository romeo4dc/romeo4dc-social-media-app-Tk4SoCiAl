const express = require("express");
const cors = require("cors");
const dbConnect = require("../mongodb");
const app = express();
app.use(cors())

const port = process.env.PORT || 3000;

app.get('/',async(req,res)=>{
    let data = await dbConnect();
    data = await data.find().toArray();
    console.log(data)
    res.send(data)
})
app.listen(port,()=>{
    console.log("sdsdasd ad")
})