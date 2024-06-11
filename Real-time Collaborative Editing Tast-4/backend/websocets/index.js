const Document = require('../models/document');

module.exports = (io) => {
    io.on('connection', (socket) => {
        socket.on('join-document', async (documentId) => {
            socket.join(documentId);
            const document = await Document.findById(documentId);
            socket.emit('load-document', document.content);

            socket.on('send-changes', (delta) => {
                socket.broadcast.to(documentId).emit('receive-changes', delta);
            });

            socket.on('save-document', async (content) => {
                await Document.findByIdAndUpdate(documentId, { content, updatedAt: Date.now() });
            });
        });
    });
};
