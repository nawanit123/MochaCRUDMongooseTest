const assert = require("assert"),
      User   = require("../src/user");

describe("Subdocuments",()=>{
    it("can create a subdocument",(done)=>{
        const joe = new User({
            name:"Joe",
            posts:[
                {title: "Post One"}
            ]
        });
            joe.save()
            .then(()=>User.findOne({name:"Joe"}))
            .then(user=>{
                assert(user.posts[0].title === "Post One");
                done();
            });
    });

    it("can add subdocuments to existing record",(done)=>{
        const joe =new User({
            name:"Joe",
            posts:[]
        });

        joe.save()
        .then(()=>User.findOne({name:"Joe"}))
        .then(user=> {
            user.posts.push({title:"New Post"});
            return user.save();
        })
        .then(()=>User.findOne({name:"Joe"}))
        .then((user)=>{
            assert(user.posts[0].title ==="New Post");
            done();
        });
    });

        it("can remove an existing subdocument",(done)=>{
            const joe = new User({
                name:"Joe",
                posts:[{title:"New Post"}]
            });
            joe.save()
            .then(()=>User.findOne({name:"Joe"}))
            .then((user)=>{
                const post = user.posts[0];
                post.remove();
                return user.save();
            })
            .then(()=>User.findOne({name:"Joe"}))
            .then((user)=>{
                assert(user.posts.length === 0);
                done();
            });
        });
});