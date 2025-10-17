const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');   
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const Teacher = require('./models/Teacher');
const Student = require('./models/Student');


const JWT_SECRET = "mysecretkey123"; // simple secret for learning


// ===== Connect to MongoDB =====
mongoose.connect("mongodb://127.0.0.1:27017/studentmgmts",{
}).then(()=>
    console.log("Connected to MongoDB")
).catch((err)=>
    console.log("Failed to connect to MongoDB", err)
);


// ===== Setup EJS & static =====
app.set('view engine','ejs');
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));
app.use(cookieParser());


// ===== ROUTES =====

const authMiddleware = async (req,res,next)=>{
    const token = req.cookies.token;
    if(!token) return res.redirect("/login");

    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.teacher = await Teacher.findOne({email: decoded.email});
        if(!req.teacher) return res.redirect("/login");
        next();
    }catch(err){
        return res.redirect("/login");
    }
};


app.get('/home',(req,res)=>{
    res.render('home');
});


app.get("/signup",(req,res)=>{
    res.render("signup");
})


app.post("/signup",async (req,res)=>{
    const {name,email,password} = req.body;
    try{
    const existingTeacher = await Teacher.findOne({email});
    if(existingTeacher){
        return res.status(400).send("Teacher with this email already exists");
    }   

    const hashedPassword = await bcrypt.hash(password,10); 
    await Teacher.create({
        name,
        email,
        password:hashedPassword
    });
    res.redirect("/login");

     }catch (err) {
        console.error(err);
        // Redirect with general error
        res.redirect("/signup");
    }
});     


app.get("/login",(req,res)=>{
    res.render("login");
});


app.post("/login",async (req,res)=>{
    const {email,password} = req.body;
    const teacher = await Teacher.findOne({email});
    if(!teacher) return res.send("No user found <a href='/login'>Try again</a>");

    const match = await bcrypt.compare(password,teacher.password);
    if(!match) return res.send("Wrong password <a href='/login'>Try again</a>");

    const token = jwt.sign({email:teacher.email},JWT_SECRET,{expiresIn:"1h"});
    res.cookie("token",token,{httpOnly:true});
    res.redirect("/dashboard");
})

app.get("/dashboard",authMiddleware,async (req,res)=>{
    const teacher = req.teacher;
    const students = await Student.find({teacherEmail:teacher.email});
    res.render("dashboard",{teacher,students});
});


app.get("/logout",(req,res)=>{
    res.clearCookie("token");
    res.redirect("/home");
})


// ======== Add Student ==========

app.get("/add-student",authMiddleware,(req,res)=>{
    res.render("addstudent",{teacher:req.teacher});
})

app.post("/add-student",authMiddleware,async (req,res)=>{
    const {name,age} = req.body;
    await Student.create({
        name,
        age,
        teacherEmail:req.teacher.email
    });
    res.redirect("/dashboard");
});


// edit student

app.get("/edit-student/:id",authMiddleware,async (req,res)=>{
    const student = await Student.findOne({_id:req.params.id,teacherEmail:req.teacher.email});
    if(!student) return res.redirect("/dashboard");
    res.render("editstudent",{student,teacher:req.teacher});
});


app.post("/update-student/:id",authMiddleware,async (req,res)=>{
    const {name,age} = req.body;
    await Student.findOneAndUpdate({_id:req.params.id,teacherEmail:req.teacher.email},{name,age},{new:true});
    res.redirect("/dashboard");
});


// ===== Delete Student =====
app.get("/delete-student/:id", authMiddleware, async (req,res)=>{
    await Student.findOneAndDelete({_id:req.params.id, teacherEmail:req.teacher.email});
    res.redirect("/dashboard");
});

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
})