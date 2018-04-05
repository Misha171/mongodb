var mongoose=require('mongoose')
mongoose.connect('mongodb://test:123@ds145750.mlab.com:45750/mydata')
console.log('mongodb connect...');
module.exports=mongoose;