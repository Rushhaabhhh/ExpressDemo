const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URL). then (() => 
    console.log('Connected to MongoDB')).
    catch(err => console.error('Failed due to ', err)
);

app.listen(3001, () => {
    console.log('Server listening on port 3001');
});







