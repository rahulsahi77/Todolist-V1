const express = require("express");
const bodyParser = require("body-parser");

const date = require(__dirname + "/date.js");

const app = express();

const items = ["But Food", "Cook Food", "Eat Food"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
    // bound to the date.js module
    let day = date.getDate();

    res.render("list", { listTitle: day, newListItems: items });
});

// look through body of post request, search for value of newItem
app.post("/", (req, res) => {
    let item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
});


app.get("/work", function (req, res) {
    res.render("list", { listTitle: "Work List", newListItems: workItems });
});

app.post("/work", function (req, res) {
    
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect("/work");
});


app.get("/about", function(req, res){
    res.render("about");
})

app.listen(3000, () => {
    console.log("Server started on port 3000");
});