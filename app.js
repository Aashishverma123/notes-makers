const express = require("express");
const userModel   = require("./models/user");
const user = require("./models/user");
const app  = express();
app.set("view engine", "ejs");

app.use (express.json());
app.use (express.urlencoded({extended: true}));


app.get("/", function( req , res){
    res.render("index");
})


app.post("/create", function( req , res){
    var {name, username,email,password} = req.body;
   userModel.create({
        name,
        username,
        email,
        password
    }).then(function(users){
        if(users.name.length >0)res.redirect("/user");
        else res.send("fil the form");
    })

})

app.get("/user" , function( req , res){
  
    userModel.find().then(function(user){
       if(user.length>0)res.render("user",{user});
       else res.redirect("/");
    
    })
})


app.get("/delete/:_id", function( req, res) {
    const id  = req.params._id
    userModel.findOneAndDelete({
        _id: id
    }).then(function(deleteUser){
        res.redirect("/user");
    })

    
 })

 app.get("/edit/:_id", function( req, res) {
    const id  = req.params._id
    userModel.findOne({
        _id: id
    }).then(function(user){
        res.render("edit",{user});
    })   
 })


//  app.post("/update/:_id", function( req, res) {
//     // const id  = req.params._id
//     // var {name, username,email,password} = req.body;
//     // userModel.findOneAndUpdate({
//     //     _id: id
//     // },{
//     //     name,
//     //     username,
//     //     email,
//     //     password
//     // }).then(function(user){
//     //     res.redirect("/user");
//     // })
//       res.send("hello");
    
//  })
app.post("/update/:_id",function( req , res){
      const id  = req.params._id
    var {name, username,email,password} = req.body;
    userModel.findOneAndUpdate({
        _id: id
    },{
        name,
        username,
        email,
        password
    }).then(function(user){
        res.redirect("/user");
    })
})


app.listen(3000);