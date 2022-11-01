const Server = require('./services/server');

const PORT = 8080;

Server.listen(PORT, () => {
    console.log('Server escuchando en el puerto', PORT);
});