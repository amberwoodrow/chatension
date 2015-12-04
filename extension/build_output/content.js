// lines 2 to 9 should probably be a componenet
var theirBody = document.getElementsByTagName("body")[0].innerHTML;
var theirNewBody = "<div id='theirBody'>" + theirBody + "</div>";
document.getElementsByTagName("body")[0].innerHTML = theirNewBody;

var elemDiv = document.createElement('div');
elemDiv.id = 'chatension-sidebar';
document.body.insertBefore(elemDiv, document.body.firstChild);

// set url var
var url = document.URL;
console.log(url);

// puts together the chatbox and name page

var Chatension = React.createClass({
  displayName: "Chatension",

  nameHandler: function (name) {
    this.setState({ name: name });
  },
  showChatBoxHandler: function () {
    this.setState({ displayChatBox: { display: 'block' } });
  },
  getInitialState: function () {
    return { displayChatBox: { display: 'none' }, name: '' };
  },
  render: function () {
    return React.createElement(
      "div",
      { className: "Chatension" },
      React.createElement(
        "h1",
        { className: "chatensionLogo" },
        "Chatension"
      ),
      React.createElement(NamePage, { url: this.props.url, showChatBoxHandler: this.showChatBoxHandler, nameHandler: this.nameHandler }),
      React.createElement(ChatBox, { url: this.props.url, pollInterval: this.props.pollInterval, displayChatBox: this.state.displayChatBox, name: this.state.name })
    );
  }
});

// Username page

var NamePage = React.createClass({
  displayName: "NamePage",
  // creates a new react component
  handleNameSubmit: function (name) {
    this.props.nameHandler(name.name);
    this.props.showChatBoxHandler();
    this.setState({ displayNamePage: { display: 'none' } });
  },
  getInitialState: function () {
    return { displayNamePage: { display: 'block' } };
  },
  render: function () {
    return React.createElement(
      "div",
      { style: this.state.displayNamePage, className: "chatensionNameBox" },
      React.createElement(NameForm, { onNameSubmit: this.handleNameSubmit })
    );
  }
});

var NameForm = React.createClass({
  displayName: "NameForm",

  getInitialState: function () {
    return { name: '' };
  },
  handleNameChange: function (e) {
    this.setState({ name: e.target.value });
  },
  handleSubmit: function (e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name && name.trim() === "") {
      return;
    }
    this.props.onNameSubmit({ name: name });
    this.setState({ name: '' });
  },
  render: function () {
    return React.createElement(
      "form",
      { className: "chatensionNameForm", onSubmit: this.handleSubmit },
      React.createElement("input", {
        type: "text",
        className: "chatensionNameInput",
        placeholder: "Your name",
        value: this.state.name,
        onChange: this.handleNameChange
      }),
      React.createElement("input", { className: "chatensionNameSubmitBtn", type: "submit", value: "Enter room" })
    );
  }
});

// Chat box page

var Message = React.createClass({
  displayName: "Message",

  render: function () {
    return React.createElement(
      "div",
      { className: "chatensionMessage" },
      React.createElement(
        "span",
        { className: "chatensionMessageName" },
        this.props.name,
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
      url: this.props.url, // set at bottom
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
    var url = document.URL;

    // add to message object for post request
    message.id = Date.now();
    message.name = this.props.name;
    message.url = url;

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
    // messageList print names
    return React.createElement(
      "div",
      { style: this.props.displayChatBox, className: "chatensionChatBox" },
      React.createElement(MessageList, { data: this.state.data }),
      React.createElement(MessageForm, { onMessageSubmit: this.handleMessageSubmit })
    );
  }
});

var MessageList = React.createClass({
  displayName: "MessageList",
  // messageNodes print names
  render: function () {
    var messageNodes = this.props.data.map(function (message) {
      return React.createElement(
        Message,
        { name: message.name, key: message.id },
        message.text
      );
    });
    return React.createElement(
      "div",
      { className: "chatensionMessageList" },
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
      "div",
      { className: "chatensionMessageFormDiv" },
      React.createElement(
        "form",
        { className: "chatensionMessageForm", onSubmit: this.handleSubmit },
        React.createElement("input", {
          type: "text",
          className: "chatensionMessageInput",
          placeholder: "Say something...",
          value: this.state.text,
          onChange: this.handleTextChange
        }),
        React.createElement("input", { type: "submit", className: "chatensionMessageSubmitBtn", value: "+" })
      )
    );
  }
});

React.render(React.createElement(Chatension, { url: "http://localhost:3000/api/chatension", pollInterval: 2000 }), document.getElementById('chatension-sidebar'));