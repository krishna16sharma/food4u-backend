const express = require('express');
const bodyParser = require('body-parser');
const knex = require('knex');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const register = require('./controllers/register');
const signin = require('./controllers/signin');

const db = knex({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'test',
    database : 'food4u'
  }
});

//db.select('*').from('customers').then(data=>{console.log(data)});
const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req,res)=>{
    res.send(db.users);
})

app.post('/signin', (req,res) => { signin.handleSignin(req,res,db,bcrypt)} )
app.post('/register', (req,res) => {register.handleRegister(req,res,db,bcrypt)})

app.listen( 3000 , ()=>{
    console.log('App running');
})
