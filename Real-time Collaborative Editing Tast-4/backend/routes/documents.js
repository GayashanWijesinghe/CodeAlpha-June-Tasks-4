const express = require('express');
const router = express.Router();
const Document = require('../models/document');

// Get a document by ID
router.get('/:id', async (req, res) => {
    try {
        const document = await Document.findById(req.params.id);
        if (!document) {
            return res.status(404).send('Document not found');
        }
        res.send(document);
    } catch (err) {
        res.status(500).send(err);
    }
});

// Create a new document
router.post('/', async (req, res) => {
    try {
        const document = new Document();
        await document.save();
        res.status(201).send(document);
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;
