const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;

// mongoose
//     .connect(db, { useNewUrlParser: true })
//     .then(() => console.log('DB connected'))
//     .catch(err => console.log(err));

const app = express();

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`)
});
