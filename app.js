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
        
        console.log('userName',userName);
        $("#name").val('');
        fireChatEngine();
        event.preventDefault();
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
  // app.get('/', function(req, res){
  //   res.sendFile('index.html');
  // });

  // var server = http.createServer(app);
  // server.listen(3000);
  
