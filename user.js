var mongoose=require('./mongoose') //підключення модуля
var userSchema=new mongoose.Schema({ //обмеження на колекцію
	name:{type:String, 
		unique:true, //унікальне
		require:true //наявність (що імя будо введене, якщо ні - то не внесеться в базу)
	},
	age:{
		type:Number,
		require:true
	},
	salary:{
		type:Number,
		min:3200,
		max:50000
	}
})
var User=mongoose.model("User",userSchema);
module.exports=User;