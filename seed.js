const { getMaxListeners } = require('./models/userdata');
const userdata=require('./models/userdata');



const userdataall = [
    {
        name:"Aryan",
        phone_number:"9416465812",
        email:"dr.manannagpal@gmail.com",
        check_in:"9:00",
        check_out:"5:00",
        address:"shanti niketan",
        date:"29 september 2021"
    },
    {
        name:"sanjeev",
        phone_number:"9416465810",
        email:"sanjeev.nagpal1@gmail.com",
        check_in:"10:00",
        check_out:"8:00",
        address:"#877 Dwarkapuri Jagadhri",
        date:"29 september 2021"
    },
    {
        name:"divu",
        phone_number:"9512966740",
        email:"divanshu.nagpal@gmail.com",
        check_in:"9:00",
        check_out:"6:00",
        address:"#877 Dwarkapuri Jagadhri",
        date:"29 september 2021"
    }

];


const seedDB=async()=>{
    await userdata.deleteMany({});
    await userdata.insertMany(userdataall);
    console.log("DB Seeded");
}

module.exports=seedDB;