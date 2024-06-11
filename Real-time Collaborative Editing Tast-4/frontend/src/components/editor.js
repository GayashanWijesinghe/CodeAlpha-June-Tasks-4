import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import './Editor.css';

const Editor = ({ documentId }) => {
    const [content, setContent] = useState('');
    const [users, setUsers] = useState([]);
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:3001');

        socketRef.current.emit('join-document', documentId);

        socketRef.current.on('load-document', (documentContent) => {
            setContent(documentContent);
        });

        socketRef.current.on('receive-changes', (delta) => {
            setContent((prevContent) => prevContent + delta);
        });

        socketRef.current.on('user-joined', (userId) => {
            setUsers((prevUsers) => [...prevUsers, userId]);
        });

        socketRef.current.on('user-left', (userId) => {
            setUsers((prevUsers) => prevUsers.filter((id) => id !== userId));
        });

        return () => {
            socketRef.current.disconnect();
        };
    }, [documentId]);

    const handleChange = (event) => {
        const { value } = event.target;
        const delta = value.slice(content.length);
        setContent(value);
        socketRef.current.emit('send-changes', delta);
    };

    const saveDocument = () => {
        socketRef.current.emit('save-document', content);
    };

    return (
        <div className="editor">
            <div className="editor-header">
                <h1>Collaborative Editing Tool</h1>
                <div className="user-presence">
                    {users.map((userId, index) => (
                        <span key={index} className="user-indicator">
                            {userId}
                        </span>
                    ))}
                </div>
            </div>
            <textarea
                value={content}
                onChange={handleChange}
                placeholder="Start editing..."
                className="editor-textarea"
            />
            <button onClick={saveDocument} className="editor-button">
                Save
            </button>
        </div>
    );
};

export default Editor;
