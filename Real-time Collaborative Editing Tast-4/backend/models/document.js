const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
    content: { type: String, default: '' },
    updatedAt: { type: Date, default: Date.now }
});

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;
