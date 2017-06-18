const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const login = require('../helpers/login');

let userSchema = new Schema({
  email: {
    type : String,
    lowercase: true,
    required: [true, `{PATH} must be filled`],
    validate: {
      validator : function(val) { return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(val);},
      message: `Invalid {PATH}`
    },
    unique: true
  },
  password: {
    type : String,
    validate:
    {
      validator: function(val){
        // console.log(this._doc);
        if (val === this.password) return true;
        else return (this._doc.isFb === true || val.length >= 10  && val.length <= 20 )
      },
      message: `{PATH}'s length must be between 10 and 20 char`
    }
  },
  isFb: {type: Boolean, default: false},
  todoList: [{type:Schema.Types.ObjectId, ref: 'Todo'}]
});

userSchema.pre('validate', function (next) {
  if (this._doc.isFb === false && this._doc.password === '') {
    // console.log('eh')
    this.invalidate('password', 'Password must be filled', this._doc.password);
  }

  next();
});

userSchema.pre('save', function(next) {
  if (!this._doc.isFb && this.isModified('password')) {
    this._doc.password = login.hashPassword(this._doc.password);
  }

  next();
});

let User = mongoose.model('User',userSchema);

module.exports = User