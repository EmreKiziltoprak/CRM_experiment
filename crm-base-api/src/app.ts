import * as dotenv from 'dotenv';

import express from 'express';
import mysql from 'mysql';
require('dotenv').config();

dotenv.config();
console.log(process.env.DB_USER);      // Should output 'root'
console.log(process.env.DB_PASSWORD);  // Should output '12345'
console.log(process.env.DB_DATABASE);  // Should output 'operational_database'

// Create Express application
const app = express();

// Middleware
app.use(express.json());

// Database connection setup
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: 3306
}
);

// Connect to the database
connection.connect((err: mysql.MysqlError | null) => {
    if (err) {
        console.error('Error connecting to database: ' + err.stack);
        return;
    }
    console.log('Connected to database as id ' + connection.threadId);
});
app.get('/users', (req, res) => {
    connection.query('SELECT * FROM users', (err: mysql.MysqlError | null, results: any[], fields: mysql.FieldInfo[]) => {
        if (err) {
            console.error('Error querying database: ' + err.stack);
            res.status(500).send('Internal Server Error');
            return;
        }
        res.json(results);
    });
});

// Close the database connection when the Node.js process exits
process.on('SIGINT', () => {
    connection.end((err?: mysql.MysqlError) => {
        if (err) {
            console.error('Error closing database connection: ' + err.stack);
            process.exit(1);
        }
        console.log('Database connection closed.');
        process.exit(0);
    });
});

// Export the Express application
export default app;
