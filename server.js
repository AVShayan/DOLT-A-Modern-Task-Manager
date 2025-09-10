require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const logger = require('./middleware/logEvents')
const mongoose = require('mongoose');
const connectDB = require('./dbConn');
const cors = require('cors');
const PORT = process.env.PORT || 3500;

connectDB();


app.use(logger.logger);

app.use(cors());
app.use(express.json());  // Needed to accept data as JSON

app.use('/',express.static(path.join(__dirname,'views')));   // To serve static files

app.use('/',require('./routes/root'));
app.use('/tasks',require('./routes/API/tasks'));

mongoose.connection.once('open',() => {    // Server will start only if MongoDB connected
    console.log("Connected To MongoDB");
    app.listen(PORT,() => console.log("Server running on PORT 3500"));
});