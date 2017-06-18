let User = require('../models/user');
let helper = require('../helpers/login');

const login = (req,res) => {

  if (typeof req.body.email === 'undefined') res.send({err: 'Email must be filled'})
  else if (typeof req.body.password === 'undefined') res.send({err: 'Password must be filled'})
  else {
    let email = req.body.email;
    let password = req.body.password;
    let token = '';

    // console.log(req.body);
    // console.log('--------------------------------\n\n');
    User.findOne({email:email}, (err,user) => {
      // console.log(err);
      // console.log('---------------------------------------1');
      // console.log(user);

      if (err) res.send({err:err});
      else if (!helper.checkPassword(password,user.password)) res.send({err: 'Invalid Email / Password'})
      else {
        console.log('---------------------------------------2');

        token = generateToken({_id : user._id, email : user.email})
        res.send({token: token})
      }
    })
  }

}

const register = (req,res) => {
  let user = new User({
    email: `${req.body.email}` || '',
    password: req.body.password || '',
    isFb: false
  });

  user.save((err,n_user)=> {
    if (err){
      let err_msg = [];
      if (typeof err.errors != 'undefined')
        for(let key in err.errors) err_msg.push(err.errors[key].message);
      res.send ({err: err_msg.length > 0 ? err_msg : err});
    }
    else res.send(n_user);

  });
}

const fblogin = (req,res) => {
  let email = req.body.email;
  let token = '';
  let finds = {email: email, isFb:true};
  console.log(email)
  User.findOne(finds, (err,user) => {
    if (err || user === null) {
      let user = new User(finds);
      user.save((err_sv,n_user)=> {
        if (err_sv) res.send({err:err_sv});
        else if(n_user === null) res.send({err:'failed to login2'})
        else {
          token = generateToken({_id: n_user._id, email : n_user.email});
          res.send({token:token});
        }
      })
    }
    // else if() res.send({err:'failed to login1'})
    else {
      token = generateToken({_id :user._id, email: user._email});
      res.send({token:token});
    }
  })
}

const checkLogin = (req,res,next) => {

  if (typeof req.headers.token === 'undefined') res.send({err: 'You must login'});
  else {
    helper.getUserDetail(req.headers.token, (err,decoded)=> {
      if (err) res.send({err : err});
      else {
        User.findById(decoded._id, (err,user)=> {
          if (err) res.send({err: 'Invalid Id'});
          else next();
        })
      }
    });
  }
  // if (typeof decoded._id === 'undefined') res.send({err: 'Invalid token'});
  // else {
  //   console.log('mampus')
  //   User.findById(decoded._id, (err,user)=> {
  //     if (err) res.send({err: 'Invalid Id'});
  //     else next();
  //   })
  // }
}

const generateToken = (data) => {
  return helper.createToken(data);
}


module.exports = {
  login,
  fblogin,
  register,
  checkLogin
}