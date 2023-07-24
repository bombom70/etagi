const express = require('express');
const router = require('./routes');
const { seedDBIfEmpty } = require('./db');
const { SERVER_PORT} = require('./config');
const cors = require("cors");

// TODO:: validate incoming data
// Joi, class-validator, yup
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', router);

app.listen(SERVER_PORT, () => {
  seedDBIfEmpty();
});
