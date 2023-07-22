const express = require('express');
const faltRouter = require('./routes/flat.routes');
const DB = require('./utils');
const cors = require("cors")

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', faltRouter);

app.listen(PORT, () => {
  DB.isEmptyBD().then(res => {
    if (res) {
      DB.initDB();
    }
  });
});
