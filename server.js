console.log("------starting server.js--------");

const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine','hbs');

hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear();
});

hbs.registerHelper('goodbye',(name)=>{
	return `goodbye ${name}`;
});

app.use((req,res,next)=>{
	res.render('maintenance.hbs');
});

// Define my first middleware
app.use((req,res,next)=>{
	//get a time stamp, to know when the user logged in <3
	var now = new Date().toString(); // the toString method enables us to have a human readable timestamp
	var log = req.url;
	var method = req.method;

	fs.appendFile('fileSystem.log',`${now}: ${method} ${log} \n`,(err)=>{
		if(err) res.render('maintenance.hbs');
		console.log('unable to update server.log');
		
	});

	next();
});

// 1st approach to serve a web page: is by sending it using res.send()
app.get('/',(req,res,err)=>{
	res.send('<h1>hello world</h1>');
});

// 2nd approach is using express.js to send a static web page, the way we do that is by defining an express midleware
app.use(express.static(__dirname+'/public'));

// 3rd approach to render an html page is by using a templating engine: handlebars.js
// Craete a directory called views in which we define our handlebars pages
// Install and load hbs npm library
app.get('/about.html/2about',(req,res,err)=>{
	res.render('about.hbs',{
		pageTitle: 'the 2nd about page',
		paragraph:'<section>Hi, my name is Yosra, and I an a fullstack software engineer</section>'
	});
});

app.get('/about.html/home',(req,res,err)=>{
	res.render('home.hbs',{
		pageTitle:'home page',
		name: 'yosra',
		job: 'fullstack software engineer'
	});
}); 

app.listen(8080,()=>{
	console.log('server listening to port 8080');
});