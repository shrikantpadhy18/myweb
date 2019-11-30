'use strict';
var developerNameDefault="SHRIKANT PADHY";
var developerCountryDefault="INDIA";
var express=require('express');
var app=express();
var handlebars=require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars',handlebars.engine);
app.set('view engine','handlebars');
app.set('port',process.env.PORT || 3000);
app.use(express.static(__dirname +'/clark'));
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

app.listen(app.get('port'),function(){
console.log('Express started on http://localhost:'+app.get('port'));

});