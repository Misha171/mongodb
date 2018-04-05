var express=require('express');
var app=express();
//забезпечує віддачу статичного контенту з папки Ajax1
app.use(express.static(__dirname))

var bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({ extended: false })) //привязування до express
app.use(bodyParser.json()) //кодування на JSON

var User=require('./user');

app.get('/',function(req,res){ //кореневий запис
	res.sendFile(__dirname+'/main.html')
});


app.get('/allusers',function(req,res){
	User.find(function(err,result){
		console.log(result);
		res.send(result);
	})
})


app.post('/delete',function(req,res){
	var id=req.body.id;
	User.remove({_id:id},function(err,result){;
	console.log(result);
	res.send('delete user');
})
})

app.post('/send',function(req,res){
	console.log(req.body);
	if(req.body.id){
		var id=req.body.id
		User.update({_id:id},{$set:{name:req.body.name, age:req.body.age, salary:req.body.salary}},function(err,result){//set-переписати id, name, age/salary
		console.log(result);
		res.send('update');
	})
	}

	else{
	var user1=new User(req.body)
	user1.save(function(err,result){
		if(err)console.log(err);
		console.log(result);
		res.send(result)
	})
	}
})
app.listen(process.env.PORT||8080);
console.log('Run server!');