const assert=require('assert'),
    User = require("../src/user");

describe("Reading users out of the database",()=>{
    let joe,alex,maria,zach;
    beforeEach(done=>{
         alex = new User({name:"Alex"});
         maria = new User({name:"Maria"});
         zach = new User({name:"Zach"});
         joe= new User({name:"Joe"});
         Promise.all([alex.save(),maria.save(),zach.save(),joe.save()])
         .then(()=>done());
    });
    it("finds all users with name Joe",(done)=>{
         User.find({name:"Joe"})
        .then((users)=>{
            console.log(JSON.stringify(users));
            assert(users[0]._id.toString() ===joe._id.toString());
            done();
        });
    });
    it("find a user with a particular id",(done)=>{
        User.findOne({_id:joe._id})
        .then((user)=>{
            assert(user.name ==="Joe")
            done();
        });
    });

    it("can skip and limit the result set",(done)=>{
        User.find({})
        .sort({name:1})
        .skip(1)
        .limit(2)
        .then((users)=>{
            assert(users.length === 2);
            assert(users[0].name === "Joe");
            assert(users[1].name === "Maria");
            done();
        });
    });

});