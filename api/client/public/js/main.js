











































// $(function() {
//   var socket = io();
//   var username;
//   $('.pages').addClass('border-radius');

//   $(".name-form").submit(function(e) {
//     e.preventDefault();
//     // console.log($(".usernameInput").val());
//     username = $(".usernameInput").val().trim();
//     $('.login').hide();
//     $('.pages').removeClass('border-radius');
//     $('.message-area').addClass('border-radius');
//     $('.message-area').show();
//     $('.chat-container').show();
//     $("#someone-entered").fadeOut("slow");
//   });

//   $('#form').submit(function(event) {
//     event.preventDefault();
//     var userAndMessage = {'chatMessage': $('#m').val(), 'username': username};
//     socket.emit('userAndMessage', userAndMessage);
//     $('#m').val("");
//   });

//   socket.on('data', function (frogs) { // use jquery instead of raw html pass message to .text
//     console.log(frogs);
//     // $("#messages").append('<li><span class="color">'+frogs.username+": </span>"+frogs.chatMessage+'</li>');
//     // $("#messages").append($("li").text(frogs.username, ": ", frogs.chatMessage));
//     $("ul").append($("<li>").text(frogs.username+": "+frogs.chatMessage));
//     $(function() {
//       var scroll = $('#scroll');
//       var height = scroll[0].scrollHeight;
//       scroll.scrollTop(height);
//     });
//   });

//   // var element = $("#chat")[0];
//   // element.scrollTop = element.scrollHeight;

// });

// // satiler angular specific



// html {
//   background-color: #ffc973;
// }

// body {
//   background-color: #ffc973;
//   font-size: 30px;
//   padding: 30px;
// }

// form { 
//   background: #f66f89; 
//   padding: 3px; 
//   bottom: 0; 
//   width: 100%; 
// }

// form input {
//   border: 0;
//   padding: 10px;
//   width: 100%; 
//   margin-right: .5%;
// }

// #messages { 
//   list-style-type: none; 
//   margin: 0; 
//   padding: 0; 
// }

// #messages li { 
//   padding: 5px 10px; 
// }

// .messages-container {
//   background-color: white;
// }

// #someone-entered {
//   position: fixed;
//   top: 0px;
// }

// .message-area {
//   bottom: 0; 
//   right: 0;
//   left: 0;
//   width: 75%;
//   background-color: white;
//   margin: auto;
//   display: none;
// }

// .chat-container {
//   display: none;
// }

// .chat.page {
//   display: none;
// }

// .pages {
//   background-color: white;
//   position: relative;
//   margin-top: 40px;
//   width: 75%;
//   margin: auto;
//   overflow: scroll;
//   height: 500px;
//   border-top-left-radius: 10px;
//   border-top-right-radius: 10px;
// }

// .border-radius {
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
// }

// .arrow {
//   position: relative;
// }

// .arrow:before {
//   content: '';
//   position: absolute;
//   top: -10px;
//   left: 50%;
//   display: block;
//   width: 0;
//   height: 0;
//   margin-left: -10px;
//   border-left: 10px solid transparent;
//   border-bottom: 10px solid white;
//   border-right: 10px solid transparent;
// }

// .name-form {
//   margin: auto;
//   width: 75%;
// }

// .title {
//   color: #f66f89;
//   text-align: center;
// }

// .content {
//   margin-top: 50px;
// }

// .color {
//   color: #f66f89;
//   font-weight: bold;
// }

// #m {
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
// }

// .login {
//   margin-top: 50px;
// }

// input[type=text]{
//   border-radius:10px;
// }

// #form {
//   border-bottom-left-radius: 10px;
//   border-bottom-right-radius: 10px;
// }

// #scroll {
//   height: 500px;
//   overflow-y: scroll;
// }

