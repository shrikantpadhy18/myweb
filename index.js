'use strict';
var developerNameDefault="SHRIKANT PADHY";
var developerCountryDefault="INDIA";
var express=require('express');
var app=express();
var handlebars=require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/clark'));
app.get('/',function(req,res,next)
{
    res.render(
        'home',{
            layout:'main',
            developerName:developerNameDefault,
            countryName:developerCountryDefault
        }
    );
}
);


var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/mycustomer",{ useUnifiedTopology: true , useNewUrlParser: true });

var nameSchema = new mongoose.Schema({
  Name: String,
    Email: String,
    Subject:String,
    Message:String
    
});
var User = mongoose.model("User", nameSchema);

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addname", (req, res) => {
  var myData = new User(req.body);
  myData.save()
    .then(item => {
      res.send("MESSAGE SENT");
      
    })
    .catch(err => {
      res.status(400).send("UNABLE TO SENT MESSAGE");
    });
});


app.listen(process.env.PORT || 3000);
