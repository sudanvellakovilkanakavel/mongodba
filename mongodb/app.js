var connect = require('connect');                      //nesaary for middleware.
var http = require('http');
var app = connect();
var express = require('express');                       //express node.js framework (server side scipting).
var http= require('http');
var path= require('path');
var mongoose=require('mongoose');                       //mongoose module.
var app = express();




//all environments

app.set('port',process.env.PORT || 3000);           //port  in which index.html form will be displayed.
app.set('view',__dirname+'/views');
app.set('vew engine','jade');

var bodyParser = require('body-parser');                        //middleware.
app.use(bodyParser.urlencoded({ extended: true }));



var methodOverride = require('method-override')              //middleware.
app.use(methodOverride('X-HTTP-Method-Override'))


app.use(express.static(path.join(__dirname,'public')));


mongoose.connect('mongodb://localhost/Company');             // Company is the database name.

var Schema = new mongoose.Schema({                          //Form data's  schema.
 _id   :String,
name:String,
age:Number


});

var user=mongoose.model('emp',Schema);

app.get('/index.htm', function (req, res) {                    //routing.
   res.sendFile( __dirname + "/" + "index.htm" );
})

app.use(express.static('public'));   

app.get('/process_get', function (req, res) {            //app.get (data from form to server ).

   // Prepare output in JSON format
   response = {
       id: req.body.email,
name:req.body.name,
age:req.body.age
   };
   console.log(response);
   res.end(JSON.stringify(response));
})

app.post('/new',function(req,res){                //app.post (data from form to database).

new user({
_id: req.body.email,
name:req.body.name,
age:req.body.age

}).save(function(err,doc){

if(err)res.json(err);
else res.send('Sucessfully inserted');

});


});



var server = http.createServer(app).listen(app.get('port'),function(){
  console.log('Express server listening on port' + app.get('port'));
});