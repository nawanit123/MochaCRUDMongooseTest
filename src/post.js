const mongoose = require("mongoose"),
      Schema   = mongoose.Schema,
      PostSchema = new Schema({
          title:String
      });

module.exports = PostSchema;