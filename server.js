const express = require('express');
const app = express();
const server = require('http').createServer(app);
// const io = require('socket.io').listen(server).sockets;
const io = require("socket.io")(server, {cors: {origin: '*'}});
var cors = require('cors');
// app.use(cors())
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
});

let connected_user=[];


//socket.io connect
io.on('connection',(socket)=>{
    console.log("User connected");
    update_username()
    let username=''

    //login
    socket.on('login',(name,callback)=>{
        if(name.trim().length===0){
            return;
        }
        // console.log(callback);
        callback(true);
        username=name;
        connected_user.push(username);
        console.log(connected_user);
        update_username();

    })
    //recieve msg
    socket.on('chat message',msg=>{
        console.log(msg)
        io.emit('output',{
            name:username,
            msg:msg,
            time:new Date().toLocaleTimeString()
        })
    })

    //disconnect
    socket.on('disconnect',()=>{
        console.log("User disconnected");
        let index = connected_user.indexOf(username);
        if (index !== -1) {
            connected_user.splice(index, 1);
        }
        // console.log(connected_user);
        update_username();
    })

    function update_username(){
        io.emit('loaduser',connected_user)
    }

})

const port=process.env.PORT|3000;

server.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})