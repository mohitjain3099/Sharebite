import express from 'express';
import dotenv from 'dotenv';
import initialize from './app/app.js';
import mailService from './mailService.js'; // import the mailService

//initialize dotenv
dotenv.config();
//initialize express
const app = express();
//set port
const PORT = process.env.PORT || 3008;
//initialize app
initialize(app);

// use the mailService as middleware
app.use(mailService); // use mailService without prefix

//listen to port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));