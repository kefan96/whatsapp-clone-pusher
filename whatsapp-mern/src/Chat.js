import { Avatar, IconButton } from "@material-ui/core";
import SearchOutlined from "@material-ui/icons/SearchOutlined";
import AttachFile from "@material-ui/icons/AttachFile";
import MoreVert from "@material-ui/icons/MoreVert";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import React, { useState } from 'react';
import "./Chat.css";
import axios from "./axios";

const Chat = ({ messages, user }) => {
    const [input, setInput] = useState('');


    const sendMessage = async (e) => {
        e.preventDefault();

        await axios.post("/api/v1/messages/new", {
            message: input,
            name: user?.displayName,
            timestamp: `${new Date().toLocaleTimeString()}`,
            received: false,
            email: user?.email
        });

        setInput('')
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={user?.photoURL}/>  

                <div className="chat__headerInfo">
                    <h3>Room name</h3>
                    <p>Last seen at...</p>
                </div>

                <div className="chat__headerRight">
                    <IconButton>
                        <SearchOutlined />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert/>
                    </IconButton>
                </div>
            </div>

            <div className="chat__body">
                {messages.map((message, index) => (
                    <p 
                        className={`chat__message ${message.email === user.email && "chat__receiver"}`}
                        key = {index}
                    >
                        <span className="chat__name">{message.name}</span>
                            {message.message}
                        <span className="chat__timestamp">{message.timestamp}</span>
                    </p>
                ))}
            </div>

            <div className="chat__footer">
                <IconButton>
                    <InsertEmoticonIcon />
                </IconButton>
                <form>
                    <input value={input} onChange={e => setInput(e.target.value)} placeholder="Type a message" type="text"/>
                    <button type="submit" onClick={sendMessage}>Send a message</button>
                </form>
                <IconButton>
                    <MicIcon />
                </IconButton>
            </div>
        </div>
    )
}

export default Chat
