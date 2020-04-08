const assert = require("assert"),
    User = require("../src/user");

describe("deleting a User",()=>{
    let joe;
    beforeEach(done=>{
        joe = new User({name:"Joe"});
        joe.save()
        .then(()=>{
            done();
        });
    });

    function setAssert(query,done){
        query
        .then(()=>{
            User.findOne({name:"Joe"})
        })
        .then((user)=>{
            assert(!user);
            done();
        });
    }

    it("model instance remove",(done)=>{
        setAssert(joe.remove(),done);
    });

    it("Class method remove",(done)=>{
        //Remove a bunch of record
        setAssert(User.deleteMany({name:"Joe"}),done);
    });
    it("Class method findAndRemove",(done)=>{
        setAssert(User.findOneAndRemove({name:"Joe"}),done);
    });
    it("Class method findByIdAndRemove",(done)=>{
        setAssert(User.findByIdAndRemove({_id:joe._id}),done);
    });
});