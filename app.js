var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Post = require("./models/post");
var Comments = require("./models/comment");
var methodOverride = require("method-override");
//var seedDB = require("./seed");
mongoose.connect("mongodb://localhost/blogger_app");

//initial setup of all application configs
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(methodOverride("_method"));
//seedDB();

//index route - the main page 
app.get("/blogs", function (req, res) {
    Post.find({}, function (err, post) {
        if (err) {
            console.log(err);
        } else {
            console.log(post);
            res.render("Post/index", {
                posts: post
            });
        }
    })

})

//render new form
app.get("/blogs/new", function (req, res) {
    res.render("Post/new");
})

//Create post - post request to post to create a post 
app.post("/blogs", function (req, res) {

    console.log(req.body.blog);

    Post.create(req.body.blog, function (err, post) {

        if (err) {
            res.render("Post/new");
            console.log(err);
        } else {
            console.log("succesfful post in");
            console.log(post);
            res.redirect("/blogs");
        }
    })


});
//show specific post
app.get("/blogs/:id", function (req, res) {
    /*Post.findById(req.params.id,function(err,post){
        if(err){
            console.log(err);
            res.redirect("/blogs");
        }
        else{
            console.log("success");
            console.log(post);
            res.render("show",{post:post});
        }
    })*/

    Post.findById(req.params.id).populate("comments").exec(function (err, data) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            console.log('found post');
            res.render("Post/show", {
                post: data
            });
        }
    })

})



//edit post -render the form
app.get("/blogs/:id/edit", function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            console.log(post);
            res.render("Post/edit", {
                post: post
            });
        }
    })

})
//update post  - update the form (PUT request)
app.put("/blogs/:id", function (req, res) {
    Post.findByIdAndUpdate(req.params.id, req.body.blog, function (err, foundPost) {
        if (err) {
            res.redirect("/blogs");
            console.log(err);
        } else {
            console.log("update success");
            res.redirect("/blogs/" + req.params.id);
        }
    })
})
//delete post 
<<<<<<< HEAD
app.delete("/blogs/:id",function(req,res){
    Post.findByIdAndRemove(req.params.id,function(err){
        if(err){
            
=======
app.delete("blogs/:id", function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if (err) {

>>>>>>> 0fa848447de8ac6a6324b16070d3933d24cf6f0d
            res.redirect("/blogs");
            console.log(err);
        } else {
            console.log("deleted");
            res.redirect("/blogs");
        }
    })
})

//====Comments routes=====

//Comment Creation
app.get("/blogs/:id/comment/new", function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("Comment/new", {
                post: post
            });
        }

    })
})

app.post("/blogs/:id/comment", function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err)
            console.log(err);
        else {
            Comments.create(req.body.Blog, function (err, comment) {
                if (err)
                    console.log(err);

                else {
                    post.comments.push(comment);
                    post.save();
                    res.redirect("/blogs/" + post._id);
                    console.log("comment saved");
                }
            })
        }
    })
})

//Comment Edit==
app.get("/blogs/:id/comment/:comment_id/edit", function (req, res) {
    Comments.findById(req.params.comment_id, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("/blogs/" + req.params.id);
        } else {
            console.log(comment);
            res.render("Comment/edit", {
                post_id: req.params.id,
                comment: comment
            });
        }
    })
})

app.put("/blogs/:id/comment/:comment_id", function (req, res) {
    Comments.findByIdAndUpdate(req.params.comment_id, req.body.Comment, function (err, comment) {
        if (err) {
            console.log(err);
            res.redirect("/blogs/" + req.params.id);
        } else {
            console.log('comment found and updated\n' + comment);
            res.redirect("/blogs/" + req.params.id);
        }
    })
})

//Comment Delete === (To be used after designing)

// app.delete("/blogs/:id/comment/:comment_id",function(req,res){
//     Comments.findByIdAndRemove(req.param.comment_id,function(err){
//         if(err)
//             {console.log(err); res.redirect("/blogs/"+req.params.id);}
//         else
//             console.log('comment deleted');
//     })
// })



//===start server
app.listen("5000", function (req, res) {
    console.log("server has started");
})