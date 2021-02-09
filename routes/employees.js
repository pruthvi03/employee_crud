const express = require("express");
const router = express.Router();
const Employee = require('../models/employee');

router.get("/",(req,res)=>{
    // res.send("Hello World<br><h1>Hello</h1>");
    Employee.find({})
    .then(employees =>{
        res.render('index',{employees: employees});
    })
    .catch(err =>{
        console.log(err);
    });
        
});

router.post("/",(req,res)=>{
    searchString = {name: req.body.search};
    Employee.find(searchString)
    .then(employees =>{
        res.render('index',{employees: employees});
        // console.log(employees);
    })
    .catch(err =>{
        req.flash('error_msg','Error: '+err);
        console.log(err);
    });
    
});

router.get("/employee/new",(req,res)=>{
    res.render("new");
});

router.post("/employee/new",(req,res)=>{
    let newEmployee = {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary  
    }
    Employee.create(newEmployee)
    .then(employee =>{
        req.flash('success_msg','New Employee added successfully.');
        res.redirect('/');
    })
    .catch(err =>{
        req.flash('error_msg','Error: '+err);
        console.log(err);
    });
});

// update router
router.get('/edit/:id',(req,res)=>{
    let searchQuery = {_id : req.params.id};
    Employee.findOne(searchQuery)
    .then(emp =>{
        res.render('edit',{employee:emp})
    })
    .catch(err=>{
        req.flash('error_msg','Error: '+err);
        console.log(err);
    });
});

// post routes here

// put routes start here
router.put('/edit/:id',(req,res)=>{
    let searchQuery = {_id: req.params.id};
    Employee.updateOne(searchQuery,{$set: {
        name: req.body.name,
        designation: req.body.designation,
        salary: req.body.salary
    }})
    .then(emp => {
        req.flash('success_msg',"Employees' details are edited successfully.");
        res.redirect('/');
    })
    .catch(err=>{
        req.flash('error_msg','Error: '+err);
        console.log(err);
    });
});
// put routes start here

// delete
router.delete("/delete/:id",(req,res)=>{
    let searchQuery = {_id:req.params.id};
    Employee.deleteOne(searchQuery)
    .then(emp => {
        req.flash('success_msg','Employee deleted successfully.');
        res.redirect("/");
    })
    .catch(err=>{
        req.flash('error_msg','Error: '+err);
        console.log(err);
    });
})

module.exports = router;