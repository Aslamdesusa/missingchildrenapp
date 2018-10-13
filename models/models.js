const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var modelSchema = new Schema({
	missingChildName:{type: String, required:true},
	Description:{type: String, required:true}
});

const misschildren = mongoose.model('misschildren', modelSchema);

module.exports = misschildren;