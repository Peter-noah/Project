import React from "react";
import { Box, Typography, Button } from "@mui/material";
import {useState, useEffect} from "react";
import { createConnection } from './chat.js';

function ChatRoom({roomId}){
    const [serverUrl, setServerUrl] = useState('http://localhost:1234');

    useEffect(() => {
        const connection = createConnection(serverUrl, roomId);
        connection.connect();
        return () => {
            connection.disconnect();
        };
    }, [roomId, serverUrl]);

    return (
        <>
            <label>
                Server URL:{' '}
                <input
                    value= {serverUrl}
                    onChange={e => setServerUrl(e.target.value)}
                />
            </label>
            <h1>Welcome to the {roomId} room!</h1>
        </>
    )
}
export default function App(){
    const [roomId, setRoomId] = useState('general');
    const [show, setShow] = useState(false);
    return (
        <>
            <Box textAlign="center" p={4}>
            <Typography variant="h1" gutterBottom>
                Hello World, this is Page 3
            </Typography>
            <Button variant= "contained" color="primary" href="/">
                Go Back
            </Button>
            </Box>
            <label>
                Choose the chat room:{' '}
                <select
                    value={roomId}
                    onChange={e => setRoomId(e.target.value)}
                >
                    <option value="general">general</option>
                    <option value="traavel">travel</option>
                    <option value="music">music</option>
                </select>
            </label>
            <Button onClick={() => setShow(!show)}>
                {show ? 'Close chat' : 'Open chat'}
            </Button>
            {show && <hr />}
            {show && <ChatRoom roomdId={roomId} />}
        </>
    );
}