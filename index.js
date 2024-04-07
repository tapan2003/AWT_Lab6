require('dotenv').config(); 
const express = require('express'); 
const mongoose = require('mongoose'); 
const app = express(); 
const PORT = process.env.PORT || 3000; 

console.log(process.env.MONGODB_URI)
// Middleware 
app.use(express.json());
// Connect to MongoDB 
mongoose.connect(process.env.MONGODB_URI) 
.then(() => console.log('Connected to MongoDB')) 
.catch(err => console.error('Error connecting to MongoDB:', err)); 
// Routes 
const usersRouter = require('./routes/users'); 
app.use('/users', usersRouter); 
// Start the server 
app.listen(PORT, () => { 
console.log(`Server is running on port ${PORT}`); 
});