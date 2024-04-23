
import express from 'express';
import supertest from 'supertest';
import fetch from 'node-fetch'; 
import app from '../app.js'; 

jest.mock('node-fetch'); 

const request = supertest(app);

describe('POST /weather', () => {
  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('responds with temperature when a valid city name is provided', async () => {
    const cityName = 'London';

    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ main: { temp: 15 } }) 
    });

    const response = await request
      .post('/weather')
      .send({ cityName });

    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain('Temperature in London is 15.00°F');
  });

  it('responds with 400 error when no city name is provided', async () => {
    const response = await request
      .post('/weather')
      .send({}); 

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Please enter the name of a city');
  });

  it('responds with 404 error when the provided city name is not found', async () => {
    const cityName = 'NonexistentCity';


    fetch.mockResolvedValueOnce({
      ok: false,
      status: 404
    });

    const response = await request
      .post('/weather')
      .send({ cityName });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe('City not found!');
  });

  
});