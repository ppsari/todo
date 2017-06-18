let Todo = require('../models/todo');
let User = require('../models/user');
let helper = require('../helpers/login')

const getUserId = (token) => {
  return helper.getUserId(token);
}

const getAllTodo = (req,res) => {
  let userid = getUserId(req.headers.token);
  Todo.find({_user: userid}, (err,todos)=>{
    res.send(err? {err:err} : todos);
  })
}
const getOneTodo = (req,res) => {
  let id = req.params.id;
  let decoded = getUserId(req.headers.token);
  Todo.findById( id , (err,todo)=> {
    if (err) res.send({err:err})
    else if (todo._user != decoded._id) res.send({err:'You are not authorized'});
    else res.send(todo);
  })
}

const updateTodo = (req,res) => {
  let decoded = getUserId(req.headers.token);
  let id = req.params.id;
  let er_msg = '';

  Todo.findById( id, (err,todo)=>{
    if (err) res.send({err:'Invalid todo'});
    else if (todo['_user'] != decoded._id) res.send({err:'You are not authorized'});
    else {
      for (let key in req.body) todo[key] = req.body[key];
      todo.save((err,utodo)=> {
        if (err) {
          if (typeof err.errors === 'undefined') res.send({err:err});
          else {
            for (let er in err.errors) er_msg += err.errors[er];
            // console.log(er_msg);
            res.send({err:er_msg});
          }
        }
        else res.send(utodo)
      })
    }
  })

}
const deleteTodo = (req,res) => {
  let decoded = getUserId(req.headers.token);
  let id = req.params.id;
  Todo.findById( id, (err,todo)=>{
    if (err) res.send({err:'Invalid todo'});
    else if (todo['_user'] != decoded._id) res.send({err:'You are not authorized'});
    else
      todo.remove((err,todo)=> {
        res.send(err? err : todo)
      })
  });
}
const createTodo = (req,res) => {
  let todo = new Todo(req.body);
  todo._user = getUserId(req.headers.token)._id;

  todo.save( (err,todo) => {
    if (err) {
      let err_msg = '';
      if (typeof err.errors != 'undefined')
        for(let key in err.errors) err_msg+= (err.errors[key].message);

        console.log(err_msg)
      res.send ({err : err ? err_msg : err});
    } else {
      // console.log('---------------------------------saveTodo');
      User.findById( todo._user, (err,user)=> {
        if (err) res.send({err: 'Invalid user'});
        else {
          // console.log(user);
          // console.log('-----------------------------printUser');

          let idx = user.todoList.findIndex(todo => todo == todo._id);
          // console.log(idx);
          // console.log('------------------------------idx');
          if (idx === -1) {

            user.todoList.push(`${todo._id}`);

            // console.log(user.todoList);

            // console.log(';----------------------------------userafterpush');
            user.save((err_us,uuser) => {
              // console.log('----------------------------------saveUser');
              // console.log(err_us)
              res.send(err_us? { err : 'Failed to insert todo'} : todo)
            });
          }

        }
      })

      // res.send(todo);
    }
  })
}


module.exports = {
  getAllTodo,
  getOneTodo,
  // getMonthlyTodo,
  // searchTodo,
  updateTodo,
  deleteTodo,
  createTodo
}
