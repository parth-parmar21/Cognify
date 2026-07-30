import "dotenv/config"
import app from "./src/app.js";
import { connectToDb } from "./src/configs/database.js";
import { generateResponse } from "./src/services/ai.service.js";
import http from "http"
import { initSocket } from "./src/sockets/server.socket.js";
const httpServer = http.createServer(app)

initSocket(httpServer)
await connectToDb()

httpServer.listen(3000, () => {
    console.log("Server is running on port 3000");
});
