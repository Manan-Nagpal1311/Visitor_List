if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mongoose=require('mongoose');
const path=require('path');
const seedDB=require('./seed');
const methodOverride=require('method-override');



mongoose.connect(process.env.MONGO_URL)
.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log(err);
})


// seedDB();

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

const userRoutes=require('./routes/userRoutes');


app.get('/',(req,res)=>{
    res.render('home');
});

app.use(userRoutes);


app.listen(process.env.PORT || 3000,()=>{
    console.log("server started at port 3000");
});