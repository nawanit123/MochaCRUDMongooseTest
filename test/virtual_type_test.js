const assert = require("assert"),
      User    = require("../src/user.js");

describe("Virtual Types",()=>{

    it("postCount returns number of objects",(done)=>{
        const joe = new User({
            name:"Joe",
            posts:[{title:"Post One"}]
        });
        joe.save()
        .then(()=>User.findOne({name:"Joe"}))
        .then((user)=>{
            console.log(JSON.stringify(user.posts));
            assert(user.postCount === 1);
            done();
        })
    });

});