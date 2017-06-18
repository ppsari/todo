let User = require('../models/user');

const getAllUser = (req,res) => {
  User.find({},(err,users)=>{
    res.send(err ? {err:err} : users);
  })
}
const getOneUser = (req,res) => {
  User.findById(req.params.id)
  .populate('todoList')
  .exec((err,user)=>{
    res.send(err? {err:err} : user)
  })
}
const updateUser = (req,res) => {
  User.findById(req.params.id, (err,user)=>{
    if (err) res.send({err:err});
    else {
      if (typeof req.body.name !== 'undefined') user['name'] = req.body.name;
      if (typeof req.body.password !== 'undefined') user['password'] = req.body.password;
      user.save((err,user)=>{
        if (err) {
          let err_msg = '';
          for (let error in err.errors) err_msg += err.errors[error].message+'\n';
          res.send({err:err_msg})
        }
        else res.send(user);
      });
    }
  });
}
const deleteUser = (req,res) => {
  User.findById(req.params.id, (err,user)=>{
    if (err) res.send({err:err});
    else {
      user.remove((err,user)=>{
        user.send(err? {err:err} : user);
      })
    }
  })
}
const createUser = (req,res) => {
  let user = new User();
  for(let key in req.body) user[key] = req.body[key];
  user.save((err,user)=>{
    if (err) {
      let err_msg = '';
      for (let error in err.errors) err_msg += err.errors[error].message+'\n';
      res.send({err:err_msg})
    }
    else res.send(user);
  })
}

module.exports = {
  getAllUser,
  getOneUser,
  updateUser,
  deleteUser,
  createUser
}
