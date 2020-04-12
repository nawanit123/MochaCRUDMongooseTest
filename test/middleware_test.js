const assert = require("assert"),
        User = require("../src/user"),
        BlogPost =require("../src/blogPost");

describe("Middleware",()=>{
    let joe,blogPost;
    beforeEach((done)=>{
        joe = new User({name:"Joe"});
        blogPost = new BlogPost({title:"JS is great",content:"Yep, it really is great!"});
        
        joe.blogPosts.push(blogPost);

        Promise.all([joe.save(),blogPost.save()])
        .then(()=>done())
    });

    it("user cleanup dangling blogposts on remove(event)",(done)=>{
        joe.remove()
        .then(()=>BlogPost.countDocuments())
        .then((count)=>{
            assert(count === 0 );
            done();
        });
    });
})