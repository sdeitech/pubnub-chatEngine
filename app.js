// var ChatEngineCore = require('chat-engine');
// var http = require('http');
// var express = require('express');
// var app = express();
// var __dirname = '/home/anubhavg/Desktop/pubnub-chat-node/node_modules';
// app.use('/scripts', express.static(__dirname + '/node_modules/jquery/dist/jquery.js'));


//var $ = require('jquery');
//var $ = require('jquery')(require("jsdom").jsdom().parentWindow);


//  var jsdom = require('jsdom');
//  const { JSDOM } = jsdom;
//  const { window } = new JSDOM(`<!DOCTYPE html>`);
//  const $ = require('jquery')(window);
 

//var $ = require('jquery');


ChatEngine = ChatEngineCore.create({
  publishKey: 'pub-c-57cb5ab5-8fe3-4592-978c-40ec9bdad3bf',
  subscribeKey: 'sub-c-5f3ae6c6-ff5c-11e7-b290-a263d5bf97a8'
});
var userName;
var sessionName;
var dialToUser;
  //console.log('chatEn',ChatEngine);
  // const getUsername = () => {
  //   const animals = ['zebra', 'goat', 'cow', 'pig', 'tiger', 'wolf', 'pony', 'antelope'];
  //   return animals[Math.floor(Math.random() * animals.length)];
  // };
  const getUsername = () => {
    return userName;
  };
  const getColor = () => {
    const colors =   ["Red", "Orange", "Yellow", "Green", "Blue", "Purple", "Teal"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  
  const appendMessage = (username, text) => {
  
    let message =
      $(`<div class="list-group-item" />`)
        .append($('<strong>').text(username + ': '))
        .append($('<span>').text(text));
  
    $('#log').append(message);
    $("#log").animate({ scrollTop: $('#log').prop("scrollHeight") }, "slow");
  };
  $("#name").keypress(function(event) {
    if (event.which == 13) {
        userName = $("#name").val();
        $("#message").prop('disabled', false);
        $("#name").prop('disabled', true);        
        
        console.log('userName2',userName);
        $("#name").val('');
        login(userName);
        fireChatEngine();       
        event.preventDefault();
    }
  });

  $("#login").click(function(event) {
    sessionName = $("#session_name").val();
    //$("#session_name").val('');    
    console.log('sessionName',sessionName);
    $("#call").prop('disabled', false);        
    
    login(sessionName);
  });

  $("#call").click(function(event) {
    console.log('ddddd',$("#call").val());
    dialToUser = $("#user_name").val();
   // $("#user_name").val('');        
    console.log('userName',dialToUser);
    if( $("#call").val() == 'Call'){
      $("#call").val('HangUp');   
      makeCall(dialToUser);      
    }else{
      $("#call").val('Call');   
      hangup();   
    }
  });
  
  
  function fireChatEngine(){
    let me = ChatEngine.connect(getUsername());
    ChatEngine.on('$.ready', (data) => {
    
        let me = data.me;
    
        let chat = new ChatEngine.Chat('new-chat');
    
        chat.on('$.connected', (payload) => {
          appendMessage(me.uuid , 'Connected to chat!');
        });
    
        chat.on('$.online.here', (payload) => {
          appendMessage('Status', payload.user.uuid + ' is in the channel!');
        });
    
        chat.on('$.online.join', (payload) => {
          appendMessage('Status', payload.user.uuid + ' has come online!');
        });
    
        chat.on('message', (payload) => {
          appendMessage(payload.sender.uuid, payload.data.text);
        });
    
        $("#message").keypress(function(event) {
          if (event.which == 13) {
              chat.emit('message', {
                      text: $('#message').val()
              });
              $("#message").val('');
              event.preventDefault();
          }
        });

    
    });
  }

function login(sessionName) {
  console.log('login called',sessionName);
  var video_out = document.getElementById("vid-box");  
  var phone = window.phone = PHONE({
      number        : sessionName || "Anonymous", // listen on username line else Anonymous
      publish_key   : 'pub-c-9db329d4-3c99-4301-af2b-615d4932e74c',
      subscribe_key : 'sub-c-02b4d60e-e08b-11e7-8b5d-3e564a31a465',
  }); 
  console.log('phone',phone);
  phone.ready(function(){
  console.log('Ready ! Go green');
   //form.username.style.background="#55ff5b"; });
   $("#call").css({'background-color' : '#008000'});
  phone.receive(function(session){
      session.connected(function(session) { video_out.appendChild(session.video); });
      session.ended(function(session) { video_out.innerHTML=''; });
  });
  return false; 
});
}

function makeCall(number){
  if (!window.phone) alert("Login First!");
  else phone.dial(number);
  //$('#Button').removeAttr('disabled');
  return false;
}

function hangup(){
  console.log('call ended');
  phone.hangup();
}
  // app.get('/', function(req, res){
  //   res.sendFile('index.html');
  // });

  // var server = http.createServer(app);
  // server.listen(3000);
  
