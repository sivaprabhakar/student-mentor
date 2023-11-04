const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const mentorRoutes = require('./src/routes/mentorRoutes');
const studentRoutes = require('./src/routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://sivaprabhakaran94:Siva153@cluster0.zl5zlfx.mongodb.net/b50wdt', {
 
});



// Use Routes
app.use('/api', mentorRoutes);
app.use('/api', studentRoutes);

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
