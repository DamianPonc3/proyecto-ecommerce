import server from "./services/server.js";
import { initWsServer } from "./services/socket.js";
import { DBService } from "./class/db.js";

const port = 8080;

const init = async () => {
  await DBService.init();
  initWsServer(server);
  server.listen(port, () => console.log(`Server up port ${port}`));
  server.on("error", (error) => {
    console.log("Server catch!", error);
  });
};

init();