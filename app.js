var express = require('express'),
app = express(),
bodyParser = require('body-parser'),
mongoose = require('mongoose'),
Companie = require('./companies.model'),
port = 8080;
db = 'mongodb://localhost/example',
http = require("http");

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended:true
}));

// app.get('/',function(req,res){
	// res.send('COMPANIES COLLECTION');
	// Companie.find({})
	// .exec(function(err,companies){
	// 	if(err){
	// 		res.send('error has occured');
	// 	}else{
	// 		console.log(companies);
	// 		res.json(companies);  
	// 	}
	// });

// });



app.get('/test',function(req,res){
	// res.send('COMPANIES COLLECTION');
	Companie.find({})
	.exec(function(err,companies){
		if(err){
			res.send('error has occured');
		}else{
			console.log(companies);
			res.json(companies);  
		}
	});
	
});

app.get('/one/:name',function(req,res){
	Companie.findOne({
		name:req.params.name
	})
	.exec(function(err,comp){
		if(err){
			res.send('error occured');
		}else{
			console.log(comp);
			res.json(comp);
		}
	});
});


app.get('/companies',function(req,res){
	console.log('get all');
	Companie.find({})
	.exec(function(err,companies){
		if(err){
			res.send('error has occured');
		}else{
			console.log(companies);
			res.json(companies);  
		}
	});
});

app.get('/companies/:id',function(req,res){
	console.log('gettiing company');
	Companie.findOne({
		_id:req.params.id
	})
	.exec(function(err,comp){
		if(err){
			res.send('error occured');
		}else{
			console.log(comp);
			res.json(comp);
		}
	});
});

app.post('/companies',function(req,res){
	var newComp =new Companie();
	newComp.name = req.body.name;
	newComp.value = req.body.value;
	newComp.parent = req.body.parent;

	newComp.save(function (err,comp) {
		if(err){
			res.send('error saving company');
		}else{
			console.log(comp);
			res.send(comp);
;		}
	});
});

/*app.post('/companies',function(req,res){
	Companie.create(req.body,function(err,comp){
		if(err){
			res.send('error saving book');
		}else{
			console.log(comp);
			res.send(comp);
		}
	});
});*/
/*app.put('/companies/:id',function(req,res){
	Companie.findOneAndUpdate({
		_id:req.params.id
	},
	{$set:{name:req.body.name},
		{upset:true},
		function(err,newComp){
			if(err){

			}
		}
})
})*/
app.get('/', function(request, response){
    response.sendfile('index.html');
});

app.listen(port,function(){
	console.log('app listening on port '+port);
}); 