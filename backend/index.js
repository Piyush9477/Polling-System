const http = require("http");
const app = require("./app");
const {port} = require("./config/keys");
const {Server} = require("socket.io");

//Create server
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

//Listen server
server.listen(port, () => {console.log(`Server is running on port ${port}`)});