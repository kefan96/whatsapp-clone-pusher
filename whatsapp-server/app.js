const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const {
    Message
} = require("./dbMessages");
const Pusher = require('pusher');
const cors = require('cors');

const connection_url = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.mhbxn.mongodb.net/whatsapp?retryWrites=true&w=majority`;
const PORT = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const pusher = new Pusher({
    appId: '1079850',
    key: '8266ec487bf4b078233c',
    secret: '7d01ac5edc6a2dd5340f',
    cluster: 'us2',
    useTLS: true
});

const db = mongoose.connection;

db.once('open', function(){
    console.log("DB connected");

    const msgCollection = db.collection("messagecontents");
    const changeStreamm = msgCollection.watch();

    changeStreamm.on('change', (change) => {
        console.log(change);

        if (change.operationType === 'insert') {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages', 'inserted', {
                name: messageDetails.name,
                message: messageDetails.message,
                timestamp: messageDetails.timestamp,
                received: messageDetails.received,
                email: messageDetails.email
            })
        } else {
            console.log('Error triggering pusher');
        }
    });
})

pusher.trigger('my-channel', 'my-event', {
    'message': 'hello world'
});

app.get("/", (req, res) => {
    res.status(200).send('hello world');
});

app.get("/api/v1/messages/sync", (req, res) => {
    Message.find((err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(data);
        }
    })
});

app.post("/api/v1/messages/new", (req, res) => {
    const dbMessage = req.body;

    Message.create(dbMessage, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
});

app.listen(PORT, function () {
    console.log("the server listening on port " + PORT);
});