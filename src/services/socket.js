const socketIo = require("socket.io");
const path = require("path");
const { formatMessages } = require("../utils/messages");
const { ProductsController } = require('../controllers/contenedor')
const messageObj = require("../controllers/message");

const MessagesFileFolderPath = path.resolve(__dirname, "../../messages.json");

messageObj.fileName = MessagesFileFolderPath;

let io;

const initWsServer = (server) => {
    io = socketIo(server);

    io.on("connection", (socket) => {
    console.log("New Connection!");

    socket.on("NewConnection", async () => {
        socket.emit("welcome", "Bienvenido!");
    });

    //Listen for new product
    socket.on("addProduct", async (element) => {
        const newProduct = {
            title: element.title,
            price: element.price,
            id: id
        }
        ProductsController.save(newProduct);
        io.emit('addProduct', ProductsController)
    });

    //Listen for chat messages
    socket.on("sendMesssage", async (message) => {
        io.emit("lastMessage", formatMessages(message));

        try {
            let exist = await messageObj.validateExistFile();
        if (exist) {
            console.log("El archivo ya existe!");
        }
        await messageObj.saveMessage(formatMessages(message));
        } catch (error) {
            console.log(error);
        }
    });
});

    return io;
};

const getWsServer = () => {
    return io;
};

module.exports = {
    initWsServer,
    getWsServer,
};