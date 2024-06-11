import React, { useState } from 'react';
import Editor from './components/editor';
import './App.css';

const App = () => {
    const [documentId, setDocumentId] = useState(''); // Replace with your document ID logic

    const handleInputChange = (event) => {
        setDocumentId(event.target.value);
    };

    const handleJoinDocument = () => {
        if (documentId.trim()) {
            // Logic to join the document
        }
    };

    return (
        <div className="app">
            <h1>Collaborative Editing Tool</h1>
            <input
                type="text"
                value={documentId}
                onChange={handleInputChange}
                placeholder="Enter document ID"
                className="document-input"
            />
            <button onClick={handleJoinDocument} className="join-button">
                Join Document
            </button>
            {documentId && <Editor documentId={documentId} />}
        </div>
    );
};

export default App;
