const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');


const Schema = mongoose.Schema;

var modelSchema = new Schema({
	Name:String,
	Description:String
});

const misschildren = mongoose.model('misschildren', modelSchema);

module.exports = misschildren;