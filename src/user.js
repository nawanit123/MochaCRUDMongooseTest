const mongoose   = require("mongoose"),
      PostSchema = require("./post"),
          Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type:String,
        validate:{
            validator(name){
                return name.length>2
            },
            message:"Name must be longer than 2 characters"
        },
        required:[true,"Name is required"]
    },
    posts:[PostSchema],
    likes:Number
});

UserSchema.virtual('postCount').get(function(){
    return this.posts.length;
});

const User = mongoose.model("user",UserSchema);

module.exports = User;
