const express = require('express');

const app = express();
const PORT = process.env.PORT;


const routes = require('./frontendRoutes.js');

// Designate the static folder as serving static resources
app.use(routes);




// As our server to listen for incoming connections
app.listen(PORT, () => console.log(`Server listening on port: ${PORT}`));