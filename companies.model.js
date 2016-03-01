var mongoose  = require('mongoose'),
Schema = mongoose.Schema,
CompaniesSchema = new Schema({
	name:String,
	value:String,
	parent:[]
});

module.exports = mongoose.model('Companies',CompaniesSchema);