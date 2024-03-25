const express = require('express');
const cors = require('cors');
const filesRoutes = require('./routes/filesRoutes');

const app = express();
const PORT = 5555;

// Middleware to allow external request
app.use(cors());

// Middleware to parse incoming JSON-formatted request bodies 
app.use(express.json());

// Sets the route
app.use('/files', filesRoutes);

// Starts the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = {
    app
}