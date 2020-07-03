var socket = io("http://localhost:3000");

socket.on("server-send-register-err", function(){
  alert("Dang nhap khong thanh cong! (Ten dang nhap da ton tai)");
});


socket.on("server-send-user-list", function(data){
  $("#boxContent").html("");
  data.forEach(function(i){
    $("#boxContent").append("<div class='User'>" + i + "</div>");
  });
});

socket.on("server-send-OK", function(data){
  $("#currentUser").html(data);
  $("#loginForm").hide(2000);
  $("#chatForm").show(1000);

});

socket.on("server-send-mess", function(data){
  $("#listMessages").append("<div class='ms'>" + data.un + ":" + data.nd + "</div>");
});
socket.on("dang-go-chu", function(data){
  $("#note").html( data + "<img width='20px' src='t.gif'>" );
});
socket.on("dung-go-chu", function(){
  $("#note").html("");
});


$(document).ready(function(){
  $("#loginForm").show();
  $("#chatForm").hide();

  $("#btnRegister").click(function(){
    socket.emit("client-send-Username" , $("#txtUsername").val());
  });
  $("#btnlogout").click(function(){
    socket.emit("logout");
    $("#chatForm").hide(2000);
    $("#loginForm").show(1000);
  });

  $("#btnSendmessages").click(function(){
    socket.emit("user-send-mess", $("#txtMessages").val());
  });

  $("#txtMessages").focusin(function(){
    socket.emit("toi-dang-go");
  });

  $("#txtMessages").focusout(function(){
    socket.emit("dung-go");
  });
});
