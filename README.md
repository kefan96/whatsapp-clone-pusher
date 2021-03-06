﻿# whatsapp-clone-pusher

> A full stack whatsapp clone using NodeJs EXPRESS for backend, React for frontend, and MongoDB for databse. The technology for message transfering and instance showing is Pusher.js and MongoDB upstream.

## Installation and Running

Clone this repo by 

```shell
git clone https://github.com/kefan96/whatsapp-clone-pusher.git
```

Frontend codes will be in `whatsapp-mern` and backend codes will be in `whatapp-server`

### Backend

To run the server, you will need to install the packages by 

```shell
npm install
```

And then add a `.env` file and write in your mongoDB connection url

```
MONGO_URL = {your connection url}
```

Then run the command

```shell
node app.js
```

You will see the server running!

### Frontend

To run the frontend, go into `whatsapp-mern` directory and type the command

```shell
npm install
npm start
```

The react app will be running in your browser.

## Screenshots

<img src="./whatsapp-mern/public/Login.png">

You can login with your google account

<img src="/whatsapp-mern/public/Chat.png">

There is currently one room available only, but enjoy chatting!

