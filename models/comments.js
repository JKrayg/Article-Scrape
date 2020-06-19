var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
    body: String
});

var Comment = mongoose.model("comment", CommentSchema);

module.exports = Comment;