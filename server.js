import express from 'express';
import db from './config/connection.js';
import routes from './routes/index.js';

// Create Express application
const app = express();

// Setup PORT
const PORT = process.env.PORT || 3001;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use(routes);

// Wait for Mongoose connection to open before starting the server
const startServer = () => {
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`Application is listening on port: ${PORT}`);
    });
  });
};

// Invoke startServer function
startServer();
