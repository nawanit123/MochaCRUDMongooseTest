const assert = require("assert"),
        User = require("../src/user");

describe("Updating records",()=>{
  let joe;
  beforeEach((done)=>{
    joe = new User({name:"Joe",postCount:0});
    joe.save()
        .then(()=>{
            done();
        });
    });
    function setAssert(query,done){
        query
        .then(()=> User.find({}))
        .then((users)=>{
            assert(users.length === 1);
            assert(users[0].name === "Alex");
            done();
        });
    }

  it("instance type using set and save",(done)=>{
    joe.set('name','Alex');
    setAssert(joe.save(),done);
  });

  it("A model instance update",(done)=>{
      setAssert(joe.updateOne({name:"Alex"}),done);
  });

  it("Model class update",(done)=>{
      setAssert(User.updateMany({name:"Joe"},{name:"Alex"}),done);
  });

  it("Model class update by findOneAndUpdate",(done)=>{
      setAssert(User.findOneAndUpdate({name:"Joe"},{name:"Alex"}),done);
  });

  it("model class update by findByIdAndUpdate",(done)=>{
      setAssert(User.findByIdAndUpdate({_id:joe._id},{name:"Alex"}),done);
  });

  it("A user can have its postCount updated by 1 ",(done)=>{
      User.updateMany({name:"Joe"},{$inc : {postCount:1}})
      .then(()=>User.findOne({name:"Joe"}))
      .then((user)=>{
        assert(user.postCount === 1);
        done();
      });
  });
});