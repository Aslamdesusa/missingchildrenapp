const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var modelSchema = new Schema({
	comment:String,
});

const Comment = mongoose.model('Comment', modelSchema);

module.exports = Comment;