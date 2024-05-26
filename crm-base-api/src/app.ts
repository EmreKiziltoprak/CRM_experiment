import * as dotenv from 'dotenv';
const swaggerUi = require('swagger-ui-express');
const swaggerSpec =  require("./swaggerConfig");

import * as express from 'express';
import * as mysql from 'mysql';
import { createConnection } from 'typeorm';
import { errorHandler } from './errors/errorHandler';
var cors = require('cors')
const router = express.Router();


require('dotenv').config();
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(express.json());

//Add Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(cors())


// Connect to the database using TypeORM
createConnection()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.error('Database connection error:', error);
  });

// Export the Express application
export default app;
