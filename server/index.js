const express = require("express");
const SERVER_PORT = 4000;
const app = express();

app.use(express.json());

app.listen(SERVER_PORT, () => console.log(`Listening on port ${SERVER_PORT}`));
