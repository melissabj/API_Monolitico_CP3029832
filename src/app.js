const express = require('express');
const app = express();

app.use(express.json());

const userRoutes = require('./routes/user.routes');
app.use(userRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});