import * as dotenv from 'dotenv';

import * as express from 'express';
import * as mysql from 'mysql';
import { createConnection } from 'typeorm';
require('dotenv').config();
dotenv.config();

// Create Express application
const app = express();

// Middleware
app.use(express.json());

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
