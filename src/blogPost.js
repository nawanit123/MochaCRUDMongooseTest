const mongoose = require("mongoose"),
        Schema = mongoose.Schema,
        BlogPostSchema = new Schema({
            title:String,
            content:String,
            comments:[{
                        type:Schema.Types.ObjectID,
                        ref: 'comment'
                    }]
        }); 

const BlogPost = mongoose.model("blogPost",BlogPostSchema);

module.exports = BlogPost;