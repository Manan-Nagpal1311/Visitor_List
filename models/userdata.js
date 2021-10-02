const mongoose=require('mongoose');



const DataSchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    // },
    // current_status:{
    //     type:Boolean,
    //     required:true
    },
    phone_number:{
        type:String
        
    },
    email:
    {
        type:String,
      
        trim:true
    },
    check_in:{
        type:String,
      
        trim:true
    },
    
    check_out:{
        type:String,
      
        trim:true
    },
    address:{
        type:String,
        trim:true

    },
    date:{
        type:String,
    }
});


const UserData=mongoose.model('UserData',DataSchema);
module.exports=UserData;
