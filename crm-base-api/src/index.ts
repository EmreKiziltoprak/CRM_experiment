import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/UsersController';

const port = process.env.PORT || 3001;

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
useExpressServer(app, {
  controllers: [UsersController],
  validation: true,
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
