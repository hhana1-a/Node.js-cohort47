import express from "express";
import { hash, compare } from 'bcrypt';
import fs from 'fs';
// import { usersDatabase } from './users.js';

import { fileURLToPath } from 'url';
import path from 'path';



const app = express();

const SALT_ROUNDS = 12;
const sessions = {};

const users = []; 


app.use(express.json());

app.use(express.urlencoded({extended: false}))

app.post('/register', async (req, res) => {


  try {
    const usersData = await fs.promises.readFile('./users.json', 'utf-8');
    let users = JSON.parse(usersData);

    const hashedPassword = await hash(req.body.password, SALT_ROUNDS)
    users.push ({
      id: Date.now().toString(),
      name: req.body.username,
      password: hashedPassword,
    })

console.log(users)
await fs.promises.writeFile('./users.json', JSON.stringify(users, null, 2));

    res.redirect('/login')
  } catch (error) {
    console.error('Error reading or writing users.json:', error);
    res.status(500).send('Internal Server Error');

  }
})

app.post('/login', async (req, res) => {


  try {

   const usersData = await fs.promises.readFile('./users.json', 'utf-8');
    const users = JSON.parse(usersData);
    
      if (!users) {
        res.status(204).send('No content');
      }


      async function login(username, password) {
        const user = users.find(user => user.username === username);
        if (!user) {
          return false;
        }
      
        const isPasswordCorrect = await compare(password, user.password);
        return isPasswordCorrect;
      }
      
      
      const loggedIn = await login(username, isPasswordCorrect);
      
      if(loggedIn) {
        console.log('User logged in');
      } else {
        console.log('Invalid username or password');
      }
  

    res.redirect('/profile')
  } catch (error) {
    res.status(500).send('Internal Server Error');

  }
})




// async function addUser(username, password) {
//   const userId = usersDatabase.length + 1;
//   const hashedPassword = await hash(password, SALT_ROUNDS);
//   const newUser = { userId, username, password: hashedPassword };
//   usersDatabase.push(newUser);

//   return { userId, username, password: hashedPassword };
// }


app.get ('/', (req, res) => {

  res.render("index.ejs")
})

app.get('/login', (req, res) => {

  res.render('login.ejs')
})

app.get('/register', (req, res) => {

  res.render('register.ejs')
})


app.listen(3000);