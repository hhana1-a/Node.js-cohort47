
const express = require('express')
const app = express();
const fs = require('fs');
 
app.use(express.json());


// YOUR CODE GOES IN HERE
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.post('/blogs', (req, res) => {

  const {title, content} = req.body;
  fs.writeFileSync(title, content);
  res.end('ok')
})

app.put('/posts/:title', (req, res) => {
  const { title } = req.params;
  const { content } = req.body;

  if (fs.existsSync(title)) {
    fs.writeFileSync(title, content);
    return res.send('ok');
} else {
    return res.status(404).send('This post does not exist!');
}
})
app.delete('/blogs/:title', (req, res) => {
  const { title } = req.params;
  if (fs.existsSync(title)) {
    fs.unlinkSync(title);
    res.end('ok');
  } else {
    res.status(404).send('This post does not exist!');
  }
});

app.get('/blogs/:title', (req, res) => {
  const { title } = req.params;

  if (fs.existsSync(`${title}.json`)) {
      const post = fs.readFileSync(`${title}.json`, 'utf8');
      res.json(JSON.parse(post));
  } else {
      res.status(404).send('This post does not exist!');
  }
});



app.listen(3000)





// const express = require('express');
// const app = express();
// const fs = require('fs');

// app.use(express.json());

// app.get('/', function (req, res) {
//   res.send('Hello World');
// });

// app.post('/blogs', (req, res) => {
//   const { title, content } = req.body;
//   const jsonData = JSON.stringify({ title, content }); 
//   fs.writeFileSync(`${title}.json`, jsonData); 
//   res.send('ok');
// });

// app.put('/posts/:title', (req, res) => {
//   const { title } = req.params;
//   const { content } = req.body;

//   if (fs.existsSync(`${title}.json`)) {
//     fs.writeFileSync(`${title}.json`, JSON.stringify({ title, content }));
//     return res.send('ok');
//   } else {
//     return res.status(404).send('This post does not exist!');
//   }
// });
