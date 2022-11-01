const server = require('./services/server');
const { initWsServer, getWsServer } = require('./services/socket')
const PORT = 8080;

// server.listen(PORT, () => {
//     console.log('Escuchando servidor en puerto: ', PORT)
// })

const init = async () => {
    initWsServer(server);
    server.listen(PORT, () => console.log(`Escuchando servidor en puerto: ${PORT}`));
    server.on('error', (error) =>{
        console.log('Server Error', error)
    });
};


init()