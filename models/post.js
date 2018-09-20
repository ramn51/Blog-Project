var mongoose = require("mongoose");

var postSchema = new mongoose.Schema({
    title:String,
    image:String,
    content:String,
    created:{type:Date,default:Date.now},


    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Comments"
    }]

});

var Post = mongoose.model("Post",postSchema);

module.exports = Post;