import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar.js';
import Chat from "./Chat.js"
import Pusher from  "pusher-js"
import axios from "./axios";
import Login from "./Login.js";
import { useStateValue } from "./StateProvider";


function App() {
  const [{ user }, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('/api/v1/messages/sync')
      .then(response => {
        setMessages(response.data)
      })
  }, []);

  useEffect(() => {
    Pusher.logToConsole = true;

    var pusher = new Pusher('8266ec487bf4b078233c', {
      cluster: 'us2'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', function(newMessage) {
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages]);

  // console.log(messages);

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (  
        <div className="app__body">
          <Sidebar user={user}/>
          <Chat messages={messages} user={user} />
        </div>
      )}
    </div>
  );
}

export default App;
