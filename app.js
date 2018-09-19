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
            res.render("index", {
                posts: post
            });
        }
    })

})

//render new form
app.get("/blogs/new", function (req, res) {
    res.render("new");
})

//Create post - post request to post to create a post 
app.post("/blogs", function (req, res) {

    console.log(req.body.blog);

    Post.create(req.body.blog, function (err, post) {

        if (err) {
            res.render("new");
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
            console.log(data);
            res.render("show",{post:data});
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
            res.render("edit", {
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
app.delete("blogs/:id", function (req, res) {
    Post.findByIdAndRemove(req.params.id, function (err) {
        if (err) {

            res.redirect("/blogs");
            console.log(err);
        } else {
            console.log("deleted");
            res.redirect("/blogs");
        }
    })
})

//====Comments routes=====

app.get("/blogs/:id/comment/new", function (req, res) {
    Post.findById(req.params.id, function (err, post) {
        if (err) {
            console.log(err);
            res.redirect("/blogs");
        } else {
            res.render("comment", {
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



//===start server
app.listen("5000", function (req, res) {
    console.log("server has started");
})