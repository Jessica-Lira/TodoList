//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");

const app = express();

const items = ["Buy Food", "Cook Food","Eat Food"];
const workItems = [];

//ejs
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: true})); //request do form
app.use(express.static("public")); //css file

app.get("/", function(req, res){

	let day = date.getDate();
	
	//ejs
	res.render("lists", {listTitle: day, newListItems: items});

});

//request do form
app.post("/", function(req, res){
	
	let item = req.body.newItem;

	if(req.body.lists === "Work List"){
		workItems.push(item);
		res.redirect("/work");
	}else{
		items.push(item);
		res.redirect("/");
	}
});


//new page work
app.get("/work", function(req,res){
	res.render("lists", {listTitle:"Work List", newListItems: workItems});
})

app.post("/work", function(req, rest){
	let item = req.body.newItem;
	workItems.push(item);
	res.redirect("/work");
})

//about page
app.get("/about", function(req, res){
	res.render("about");
})

app.listen(3000, function(){
	console.log("Server started on port 3000");
});