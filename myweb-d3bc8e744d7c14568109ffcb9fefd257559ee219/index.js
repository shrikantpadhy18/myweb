'use strict';

var jsalert=require('js-alert');
var developerNameDefault="SHRIKANT PADHY";
var developerCountryDefault="INDIA";
var express=require('express');
var app=express();
var handlebars=require('express-handlebars').create({defaultLayout:'main'});
var nodemailer=require('nodemailer');


app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname + '/assets'));
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




var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/addname", (req, res) => {
  var{Name,Email,Subject,Message}=req.body;
  var transporter= nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prashantpadhy21@gmail.com',
      pass: '21052003'
    }
  })
  var mailoptions={
    from:'prashantpadhy21@gmail.com',
    to:'shrikantpadhy18@gmail.com',
    subject:'Name='+JSON.stringify(Name)+JSON.stringify(Subject),
    text:'My Message='+JSON.stringify(Message)+' My Email='+JSON.stringify(Email)

  };
  
  
  transporter.sendMail(mailoptions, function(error, info){
    if (error) {
      jsalert.alert("Something Gone Wrong.");
    } else {
      jsalert.alert("Email Sent.");
      console.log('Email sent: ' + info.response);
    }
  });

  });


app.listen(process.env.PORT || 3000);
