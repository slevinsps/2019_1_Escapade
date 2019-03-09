'use strict';

const express = require('express');
const body = require('body-parser');
const cookie = require('cookie-parser');
const morgan = require('morgan');
const uuid = require('uuid/v4');
const path = require('path');
const app = express();


app.use(morgan('dev'));
app.use(express.static(path.resolve(__dirname, '..', 'public')));
app.use(body.text());
app.use(cookie());


const users = {
  'a.ostapenko@corp.mail.ru': {
    email: '<strong>a.ostapenko@corp.mail.ru</strong>',
    password: 'password',
    score: 72,
  },
  'd.dorofeev@corp.mail.ru': {
    email: '<img src="kek" onerror="console.log(`im watching you`);" />',
    password: 'password',
    score: 100500,
  },
  's.volodin@corp.mail.ru': {
    email: '<iframe src="//example.com" onload="alert(1)">',
    password: 'password',
    score: 72,
  },
  'a.tyuldyukov@corp.mail.ru': {
    email: 'a.tyuldyukov@corp.mail.ru',
    password: 'password',
    score: 72,
  },
};
const ids = {};

app.post('/signup', function(req, res) {
  req.body = JSON.parse(req.body);
  const password = req.body.password;
  const email = req.body.email;
  const username = req.body.username;
  if (users[email]) {
    return res.status(400).json({error: 'Пользователь уже существует'});
  }

  const id = uuid();
  const user = {username, password, email, played: 0};
  ids[id] = email;
  users[email] = user;

  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(201).json({id});
});

app.post('/login', function(req, res) {
  req.body = JSON.parse(req.body);
  const password = req.body.pass;
  const email = req.body.email;
  console.log(email, password);
  if (!password || !email) {
    return res.status(400).json({error: 'Не указан E-Mail или пароль'});
  }
  if (!users[email] || users[email].password !== password) {
    return res.status(400).json({error: 'Не верный E-Mail и/или пароль'});
  }

  const id = uuid();
  ids[id] = email;
  console.log(users.email);
  res.cookie('sessionid', id, {expires: new Date(Date.now() + 1000 * 60 * 10)});
  res.status(200).json(users[email]);
});

app.get('/me', function(req, res) {
  const id = req.cookies['sessionid'];
  const email = ids[id];
  if (!email || !users[email]) {
    return res.status(401).end();
  }

  console.log(users[email]);
  res.status(200).json(users[email]);
});

app.get('/users', function(req, res) {
  const scorelist = Object.values(users)
      .sort((l, r) => r.score - l.score)
      .map((user) => {
        return {
          email: user.email,
          age: user.age,
          score: user.score,
        };
      });

  res.json(scorelist);
});

const port = process.env.PORT || 8080;

app.listen(port, function() {
  console.log(`Server listening port ${port}`);
});
