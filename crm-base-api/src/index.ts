import "reflect-metadata";
import { useContainer, useExpressServer } from 'routing-controllers';
import { UsersController } from './controllers/UsersController';
import app from './app';
import Container from 'typedi';
import { CustomErrorHandler, errorHandler } from "./errors/errorHandler";
import { MenusController } from "./controllers/MenuController";

// Set up Dependency Injection container
useContainer(Container);

// Set up routing-controllers to use Express server and controllers
useExpressServer(app, {
  controllers: [UsersController, MenusController],
  middlewares: [CustomErrorHandler], 
  defaultErrorHandler: false

});

// Apply error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.NODE_PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
