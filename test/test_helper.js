const mongoose = require("mongoose");
mongoose.Promise= global.Promise;

before((done)=>{
    mongoose.connect("mongodb://localhost:27017/users_test",{useNewUrlParser:true,
    useUnifiedTopology:true, useFindAndModify:false });
    mongoose.connection
    .once("open",()=>{done();})
    .on("error",error=>console.warn("Error", error));
});

beforeEach((done)=>{
    mongoose.connection.collections.users.drop(()=>{
        //Ready to run the next Test
        done();
    });
});