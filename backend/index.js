const http = require("http");
const app = require("./app");
const {port} = require("./config/keys");
const {Server} = require("socket.io");

//Create server
const server = http.createServer(app);

//Socket connections
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('join_poll', ({ pollId, userId, role }) => {
      socket.join(pollId);
      io.to(pollId).emit('user_joined', { userId, role });
    });

    socket.on('new_question', ({ pollId, question }) => {
      io.to(pollId).emit('new_question', question);
    });

    socket.on('answer_submitted', ({ pollId, answer }) => {
      io.to(pollId).emit('answer_update', answer);
    });

    socket.on('end_question', ({ pollId }) => {
      io.to(pollId).emit('question_ended');
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
});


//Listen server
server.listen(port, () => {console.log(`Server is running on port ${port}`)});