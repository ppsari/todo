const express = require('express');
const path = require('path');
let bodyParser = require('body-parser');
const cors = require('cors');
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todofancy')
var index = require('./routes/index');
// var users = require('./routes/users');
var todos = require('./routes/todos');

var app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);
// app.use('/users', users);
app.use('/api/todos', todos);
app.listen(3001);
module.exports = app;
