var theirBody = document.getElementsByTagName("body")[0].innerHTML;
var theirNewBody = "<div id='theirBody'>" + theirBody + "</div>";
document.getElementsByTagName("body")[0].innerHTML = theirNewBody;

var elemDiv = document.createElement('div');
elemDiv.id = 'chatension-sidebar';
document.body.insertBefore(elemDiv, document.body.firstChild);

// var NamePage = React.createClass({ // creates a new react component
//   render: function() {
//     return (
//       <form className="nameForm" onSubmit={this.handleSubmit}>
//         <input
//           type="text"
//           placeholder="Your name"
//           value={this.state.author}
//         />
//         <input type="submit" value="Post" />
//       </form>
//     );
//   }
// });

var Message = React.createClass({
  displayName: "Message",
  // creates a new react component
  render: function () {
    return React.createElement(
      "div",
      { className: "message" },
      React.createElement(
        "span",
        { className: "messageAuthor" },
        this.props.author,
        ": "
      ),
      React.createElement(
        "span",
        null,
        this.props.children
      )
    );
  }
});

var ChatBox = React.createClass({
  displayName: "ChatBox",

  loadMessagesFromServer: function () {
    $.ajax({
      url: this.props.url, // this function's url? set at bottom as /api/comments
      dataType: 'json',
      cache: false, // no cache because data changes
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  handleMessageSubmit: function (message) {
    var messages = this.state.data;
    message.id = Date.now();
    var newMessages = messages.concat([message]);
    this.setState({ data: newMessages });
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: (function (data) {
        this.setState({ data: data });
      }).bind(this),
      error: (function (xhr, status, err) {
        this.setState({ data: message });
        console.error(this.props.url, status, err.toString());
      }).bind(this)
    });
  },
  getInitialState: function () {
    return { data: [] };
  },
  componentDidMount: function () {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render: function () {
    // messageList print authors
    return React.createElement(
      "div",
      { className: "chatBox" },
      React.createElement(
        "h1",
        null,
        "Messages"
      ),
      React.createElement(MessageList, { data: this.state.data }),
      React.createElement(MessageForm, { onMessageSubmit: this.handleMessageSubmit })
    );
  }
});

var MessageList = React.createClass({
  displayName: "MessageList",
  // messageNodes print authors
  render: function () {
    var messageNodes = this.props.data.map(function (message) {
      return React.createElement(
        Message,
        { author: message.author, key: message.id },
        message.text
      );
    });
    return React.createElement(
      "div",
      { className: "messageList" },
      messageNodes
    );
  }
});

var MessageForm = React.createClass({
  displayName: "MessageForm",

  getInitialState: function () {
    return { text: '' };
  },
  handleTextChange: function (e) {
    this.setState({ text: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onMessageSubmit({ text: text });
    this.setState({ text: '' });
  },
  render: function () {
    return React.createElement(
      "form",
      { className: "messageForm", onSubmit: this.handleSubmit },
      React.createElement("input", {
        type: "text",
        placeholder: "Say something...",
        value: this.state.text,
        onChange: this.handleTextChange
      }),
      React.createElement("input", { type: "submit", value: "Post" })
    );
  }
});

React.render(React.createElement(ChatBox, { url: "http://localhost:3000/api/messages", pollInterval: 2000 }), document.getElementById('chatension-sidebar'));