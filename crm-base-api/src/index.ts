import "reflect-metadata";

import  { Request, Response } from 'express';
import { useContainer, useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/UsersController';
import app from './app';
import Container from 'typedi';
import { UsersRepository } from "./repositories/UsersRepository";

const port = process.env.NODE_PORT || 3001;

useContainer(Container);

// Start server
useExpressServer(app, {
  controllers: [UsersController],
  validation: true,
}).listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
