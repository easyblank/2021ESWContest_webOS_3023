const socketio = require("socket.io");
const express = require("express");
const http = require("http");

const app = express();



// app.use(express.static(src+'/'));
app.get("/client",(req, res)=>res.sendFile('/Users/admin/Desktop/embeddedSW/0729/src/views/client.html'));
const server = http.createServer(app);

// app.get('/', (req,res)=>{res.send('<h1>hello</h1>')});


const io = socketio(server);
io.on("connection", (socket) => {
    const {url} = socket.request;
    console.log('connected: ${url}');
});

server.listen(5500, ()=> console.log("###서버 시작###"));

