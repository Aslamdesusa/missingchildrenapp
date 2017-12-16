const mongoose = require('mongoose');


const Schema = mongoose.Schema;

var modelSchema = new Schema({
	Comment:String,
});

const Comment = mongoose.model('Comment', modelSchema);

module.exports = Comment;