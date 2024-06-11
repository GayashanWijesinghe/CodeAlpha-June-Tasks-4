const express = require('express');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const documentRoutes = require('./routes/documents');
const setupWebsockets = require('./websockets');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose.connect('mongodb://localhost:27017/collabedit', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(express.json());
app.use('/api/documents', documentRoutes);

setupWebsockets(io);

const port = 3001;
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
