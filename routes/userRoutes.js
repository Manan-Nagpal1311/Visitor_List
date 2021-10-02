const express=require('express');
const UserData = require('../models/userdata');
const router=express.Router();
const methodOverride=require('method-override');
const sgMail=require('@sendgrid/mail');
const API_KEY=process.env.API_KEY;

sgMail.setApiKey(API_KEY);



router.get('/userlist',async(req,res)=>{
   const userdataall = await UserData.find({});
    res.render('./index',{userdataall});
});


router.get('/userlist/new',(req,res)=>{
    console.log(req.params);
    res.render('./new');
});

router.get('/userlist/:id/edit',async (req,res)=>{
    const {id}=req.params;
    console.log(id);
    const user=await UserData.findById(id);
    // console.log(user);
    res.render('./edit',{user});
});



router.post('/userlist',async(req,res)=>{
    // console.log(req.body);
    const newuser = {
        ...req.body
    }
    console.log(newuser);
    await UserData.create(newuser);
    const s=newuser.email;
    const sn=newuser.name;
    const message={
        to:s,
        from:'dr.manannagpal@gmail.com',
        subject:'Check_In Alert',
        text:`Hello! ${sn} You have Checked In`,
        html:`<h1>Hello! ${sn} You Have Checked In </h1>`
    
    };
    
    sgMail.send(message)
    .then(()=>{
        console.log("email gayi");
    })
    .catch((err)=>{
        console.log(err);
    })

    res.redirect('/userlist');
})
router.get('/userlist/:id/patch' , async(req,res)=>{
    const {id}=req.params;
    const user=await UserData.findById(id);
    res.render('./patch',{user});
})
router.patch('/userlist/:id',async (req,res)=>{
    const { id } = req.params;
    console.log(id);
    const updateddata = req.body;

    await UserData.findByIdAndUpdate(id, updateddata);
    
    res.redirect('/userlist');
});
router.delete('/userlist/:id',async(req,res)=>{
    const {id}=req.params;
    // console.log(id);

    const user=await UserData.findByIdAndDelete(id);
    // console.log({user});
    //sendemail(user);
    // console.log({user});
    // console.log(user.email);
    const s=user.email;
    const sn=user.name;
    const message={
        to:s,
        from:'dr.manannagpal@gmail.com',
        subject:'Check_Out Alert',
        text:`Hello! ${sn} You have Checked Out`,
        html:`<h1>Hello! ${sn} You Have Checked Out </h1>`
    
    
    };
    
    sgMail.send(message)
    .then(()=>{
        console.log("email gayi");
    })
    .catch((err)=>{
        console.log(err);
    })
    
    res.redirect('/');
})
router.get('/userlist/:id',async(req,res)=>{
    const {id}=req.params;
    const user=await UserData.findById(id);
    res.render('./show',{user});
})


module.exports=router;


