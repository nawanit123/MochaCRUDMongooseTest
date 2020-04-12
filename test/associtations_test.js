const User = require("../src/user"),
      Comment = require("../src/comment"),
      BlogPost = require("../src/blogPost"),
      assert  =require("assert");

describe("Asscociations",()=>{
    let joe,blogPost,comment;
    beforeEach((done)=>{
        joe = new User({name:"Joe"});
        blogPost = new BlogPost({title:"JS is great",content:"Yep, it really is great!"});
        comment = new Comment({content:"Congrats on the great Post!"});
        
        joe.blogPosts.push(blogPost);
        blogPost.comments.push(comment);
        comment.user = joe;

        Promise.all([joe.save(),blogPost.save(),comment.save()])
        .then(()=>done())
    });

    it("saves a relation between a user and blogpost",(done)=>{
        User.findOne({name:"Joe"})
        .populate({
            path:"blogPosts",
            model: "blogPost",
            populate:{
                path:"comments",
                model:"comment",
                populate:{
                    path:'user',
                    model:"user"
                }
            }
        })
        .then((user)=>{
            assert(user.name === "Joe");
            assert(user.blogPosts[0].title === "JS is great" );
            assert(user.blogPosts[0].comments[0].content === "Congrats on the great Post!");
            assert(user.blogPosts[0].comments[0].user.name === "Joe");
            done();   
        });
    });
});