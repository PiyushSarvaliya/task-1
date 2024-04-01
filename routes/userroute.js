const express = require("express");
const user = require("../modals/usermodal");
const Fuse = require("fuse.js");
const check = require("../middleware/auth");
const app2 = express();


app2.get("/" , (req , res) =>{
    res.render("index")
})

app2.get("/alldata" , async(req , res) =>{
    let data = await user.find();
    res.json(data)
})

app2.post("/create" , check,async(req , res) =>{
    let {name , email , phone , image} = req.body
    let data = await user.create(req.body);
    res.json(data)
});

app2.get("/search" , async(req , res) =>{
    let query = req.query;
    const data = await user.find();

    const option = {
        keys : ["name" , "email"],
    }
    const fuse =  new Fuse(data , option)
    const result = fuse.search(query)
    res.json(result)

})

app2.delete("/delete/:id" , async(req , res) =>{
    let {id} = req.params
    let deletedata = await user.findByIdAndDelete(id)
    res.redirect("/")
})

app2.patch("/update/:id" , async(req , res) =>{
        const { id } = req.params;
        const {name,email,phone}=req.body
        let obj={
            name:req.body.name,
            email:req.body.email,
            phone:req.body.phone,
        }
        const updatedUser = await user.findByIdAndUpdate(id, obj);
        await updatedUser.save()
        res.json(updatedUser);
})
module.exports = app2; 