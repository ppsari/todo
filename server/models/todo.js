const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  title : {
    type : String,
    required : [true, '{PATH} must be filled'],
    minlength : [5, `{PATH}'s must be longer than 5 character`]
  },
  created_date : { type: Date, default : new Date() },
  completed_date: Date,
  _user : { type:Schema.Types.ObjectId, ref:'User' }
});



let Todo = mongoose.model('Todo',todoSchema);

module.exports = Todo