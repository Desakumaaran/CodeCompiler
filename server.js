//port ongo 27017
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 8723;

var MongoClient = require('mongodb').MongoClient;
var format = require('util').format;


var app = express();
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static(path.normalize(__dirname + '/')));

//app.use(express.static('public'));
//app.use(express.static('files'));
//app.use(express.static(__dirname + '/libs/css/bootsrap.min.css'));
//app.use(express.static(__dirname + '/libs/js/bootsrap.min.js'));
//app.use(express.static(__dirname + '/libs/css/jquery.min.js'));
//app.use('/node_modules', express.static(__dirname + '/node_modules'));

//connect away



app.get('/', function(req, res) {
    res.sendFile(__dirname + '/views/index.html');

})

app.post('/register', function(req, res) {
    //res.sendFile(__dirname +'/views/index.html');
    var fname = req.body.FirstName;
    var lname = req.body.LastName;
    var email = req.body.Email;
    var pass = req.body.Password;


    console.log(fname);

    MongoClient.connect('mongodb://127.0.0.1:27017/codecompiler', function(err, db) {
        if (err) throw err;
        console.log("Connected to Database");


        var document = {
            FirstName: fname,
            LastName: lname,
            Email: email,
            Password: pass
        };

        //insert record
        db.collection('userdetails').insert(document, function(err, records) {
            if (err) throw err;
            console.log("Record added Successfully");
        });

    });

    res.end("Success");

})


app.post('/login', function(req, res) {
    var email = req.body.Email;
    var pass = req.body.Password;




    MongoClient.connect('mongodb://127.0.0.1:27017/codecompiler', function(err, db) {
        if (err) throw err;
        console.log("Connected to Database");


        //var document = {FirstName:fname,LastName:lname, Email:email,Password:pass};
        //Working
        //	var col = db.collection('userdetails');
        //        
        //        col.find({$and:[{"Email":"desa@gmail.com"},{"Password": "desa"}]}).toArray(function(err, records) {
        //		if (err) throw err;
        //		console.log("Login Sccess "+records[0].Email);
        //	});
        //working End
        var col = db.collection('userdetails');
        col.find({
            $and: [{
                "Email": email
            }, {
                "Password": pass
            }]
        }).toArray(function(err, docs)

            {

                if (err) {
                    console.log(err);
                } else {



                    docs.forEach(function(doc) {
                        //console.log("Doc from Array ");
                        //console.dir(doc);
                        res.jsonp(doc);
                        //res.end("Success");
                        console.log("Doc sent to ctrl");

                    });
                }


            });

    });



})


app.post('/code', function(req, res) {
    //res.sendFile(__dirname +'/views/index.html');
    var lang = req.body.language;
    var code = req.body.code;
    var input = req.body.input;
    var userid = req.body.UserID;
    var timelimit = 1;
    //console.log("lang:"+lang+"code:"+code+"input:"+input);

    //var object = lang+"~"+code+"~"+input+"~"+timelimit;
    //console.log(object);




    var codedocument = {
        ProgramCode: code,
        Language: lang,
        input: input,
        UserID: userid
    };

    MongoClient.connect('mongodb://127.0.0.1:27017/codecompiler', function(err, db) {
        if (err) throw err;
        console.log("Connected to Database");

        //insert record
        db.collection('submission_master').insert(codedocument, function(err, docsInserted) {
            if (err) throw err;
            //res.jsonp(records);
            var CodeobjectId = codedocument._id;

            console.log("Record added Successfully Object ID :-" + codedocument);

            var object = lang + "~" + CodeobjectId + "~" + input + "~" + timelimit;
            //TCP CODE
            var client = new net.Socket();
            client.connect(PORT, HOST, function() {

                console.log('CONNECTED TO: ' + HOST + ':' + PORT);
                // Write a message to the socket as soon as the client is connected, the server will receive it as message from the client 
                client.write(object);

            });

            // Add a 'data' event handler for the client socket
            // data is what the server sent to this socket
            client.on('data', function(data) {

                console.log('DATA: ' + data);
                res.end(data);
                // Close the client socket completely
                client.destroy();

            });

            // Add a 'close' event handler for the client socket
            client.on('close', function() {
                console.log('Connection closed');
            });

            //res.end("Success");

        });

    });




})



app.listen(9000);
console.log("Server Started");
//console.log(__dirname);