var express = require("express");
var app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");

var server = require("http").Server(app);
var io = require("socket.io")(server);
server.listen(3000);

var userArray=[];

io.on("connection", function(socket){
  console.log("co nguoi ket noi" + socket.id);

  socket.on("client-send-Username", function(data) {
    if(userArray.indexOf(data)>=0){
      //fail
      socket.emit("server-send-register-err");
    }else{
      //true
      userArray.push(data);
      socket.Username = data;
      socket.emit("server-send-OK", data);
      io.sockets.emit("server-send-user-list", userArray);
    }
  });

  socket.on("logout", function(){
    userArray.splice(
      userArray.indexOf(socket.Username), 1
    );
    socket.broadcast.emit("server-send-user-list", userArray);
  });
  socket.on("user-send-mess", function(data){
    io.sockets.emit("server-send-mess", {un:socket.Username, nd:data});
  });

  socket.on("toi-dang-go", function(){
    var s=socket.Username;
    io.sockets.emit("dang-go-chu",s);
  });
  socket.on("dung-go", function(){
    io.sockets.emit("dung-go-chu");
  });

});


app.get("/", function(req, res){
  res.render("trangchu");
});
