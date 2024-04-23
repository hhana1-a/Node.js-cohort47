import express from 'express';
import fetch from 'node-fetch';
import { keys } from "./sources/keys.js";


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended:true }));

app.get('/', (req, res) => {
 
  res.send (`
  <form action="/weather" method="post">
  <label for="cityName">Enter a city name:</label>
  <input type="text" id="cityName" name="cityName">
  <button type="submit">Submit</button>
</form>
  `)
});


app.post('/weather', async (req, res) => {
  try {
    const { cityName } = req.body;

    if (!cityName) {
      res.status(400).send({ error: 'Please enter the name of a city' });
      return;
    }

    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${keys.API_KEY}`);

    if (!response.ok) {
      res.status(404).send({ error: 'City not found!' });
      return;
    }

    const data = await response.json();
    const temp = data.main.temp;

    res.send({ weatherText: `Temperature in ${cityName} is ${temp.toFixed(2)}°F` });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Internal Server Error' });
  }

res.end();
});

export default app;