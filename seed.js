var express = require("express"),
    app     = express(),
    mongoose = require("mongoose"),
    Post     = require("./models/post");

var data = [
    {
        title:"this is rams test post 1",
        image:"https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwjM1N2r2tvcAhUV148KHbWzB_8QjRx6BAgBEAU&url=http%3A%2F%2Fhomeland.wikia.com%2Fwiki%2FFile%3ANazanin_boniadi_general_hospital_night_shift_DrMx2JP.sized.jpg&psig=AOvVaw2Uno9SN00hRAVQVne1t9sv&ust=1533757559324162",
        content:"test data is inserted to test the db",
    },
    {
        title:"this is rams test post 2",
        image:"https://www.google.co.in/url?sa=i&source=images&cd=&cad=rja&uact=8&ved=2ahUKEwiQyoG72tvcAhUXbo8KHXcoC8EQjRx6BAgBEAU&url=https%3A%2F%2Fwww.pinterest.com%2Fpin%2F335588609705477189%2F&psig=AOvVaw2Uno9SN00hRAVQVne1t9sv&ust=1533757559324162",
        content:"test data is inserted to test the db",
    }
]

function seedDB(data){

    Post.remove({},function(err){
        if(err){
            console.log(err);
        }
        console.log("posts removed");
        data.forEach(function(seed){
            Post.create(seed,function(err,post){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("successful post")
                }
            })
        })
    })

   
}

module.exports = seedDB();