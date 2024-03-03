const express = require('express');
const app = express();
const users = require('./Controllers/Users/User.js');
const reservas = require('./Controllers/Reservas/Reserva.js');

const PORT = process.env.PORT || 3000;

app.use('/api/users', users);
app.use('/api/reservas', reservas);

app.listen(PORT, () => { console.log(`♥ server listening on port ${PORT} ♥`)});
