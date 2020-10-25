
const express = require("express");
const app = express();
const routes = require('./routes');

routes(app);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
