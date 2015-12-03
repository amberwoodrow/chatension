var theirBody = document.getElementsByTagName("body")[0].innerHTML;
var theirNewBody = "<div id='theirBody'>" + theirBody + "</div>";
document.getElementsByTagName("body")[0].innerHTML = theirNewBody;

var elemDiv = document.createElement('div');
elemDiv.id = 'chatension-sidebar';
document.body.insertBefore(elemDiv, document.body.firstChild);

// puts together the chatbox and name page

var Chatension = React.createClass({
  nameHandler: function(name) {
    this.setState({name: name});
  },
  showChatBoxHandler: function() {
    this.setState({displayChatBox: {display: 'block'}});
  },
  getInitialState: function() {
    return {displayChatBox: {display: 'none'}, name: ''};
  },
  render: function() {
    return (
      <div className="Chatension">
        <h1 className="logo">Chatension</h1>
        <NamePage url={this.props.url} showChatBoxHandler={this.showChatBoxHandler} nameHandler={this.nameHandler}/>
        <ChatBox url={this.props.url} pollInterval={this.props.pollInterval} displayChatBox={this.state.displayChatBox} name={this.state.name}/>
      </div>
    );
  }
});

// Username page

var NamePage = React.createClass({ // creates a new react component
  handleNameSubmit: function(name) {
    this.props.nameHandler(name.name)
    this.props.showChatBoxHandler()
    this.setState({displayNamePage: {display: 'none'}});
  },
  getInitialState: function() {
    return {displayNamePage: {display: 'block'}};
  },
  render: function() {
    return (
      <div style={this.state.displayNamePage} className="nameBox">
        <NameForm onNameSubmit={this.handleNameSubmit} />
      </div>
    );
  }
});

var NameForm = React.createClass({
  getInitialState: function() {
    return {name: ''};
  },
  handleNameChange: function(e) {
    this.setState({name: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var name = this.state.name.trim();
    if (!name && name.trim() === "") {
      return;
    }
    this.props.onNameSubmit({name: name});
    this.setState({name: ''});
  },
  render: function() {
    return (
      <form className="nameForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="nameInput"
          placeholder="Your name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        <input className="nameSubmitBtn" type="submit" value="Enter room" />
      </form>
    );
  }
});

// Chat box page

var Message = React.createClass({
  render: function() {
    return (
      <div className="message">
        <span className="messagename">{this.props.name}: </span>
        <span>{this.props.children}</span>
      </div>
    );
  }
});

var ChatBox = React.createClass({
  loadMessagesFromServer: function() {
    $.ajax({ 
      url: this.props.url, // this function's url? set at bottom as /api/comments
      dataType: 'json',
      cache: false, // no cache because data changes
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleMessageSubmit: function(message) {
    var messages = this.state.data;
    message.id = Date.now();
    message.name = this.props.name;
    var newMessages = messages.concat([message]);
    this.setState({data: newMessages});
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type: 'POST',
      data: message,
      success: function(data) {
        this.setState({data: data});
        console.log(this.state.data)
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data: message});
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadMessagesFromServer();
    setInterval(this.loadMessagesFromServer, this.props.pollInterval);
  },
  render: function() { // messageList print names
    return (
      <div style={this.props.displayChatBox} className="chatBox">
        <h1>Messages</h1>
        <MessageList data={this.state.data} />
        <MessageForm onMessageSubmit={this.handleMessageSubmit} />
      </div>
    );
  }
});

var MessageList = React.createClass({ // messageNodes print names
  render: function() {
    var messageNodes = this.props.data.map(function(message) {
      return (
        <Message name={message.name} key={message.id}>
          {message.text}
        </Message>
      );
    });
    return (
      <div className="messageList">
        {messageNodes}
      </div>
    );
  }
});

var MessageForm = React.createClass({
  getInitialState: function() {
    return {text: ''};
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onMessageSubmit({text: text});
    this.setState({text: ''});
  },
  render: function() {
    return (
      <form className="messageForm" onSubmit={this.handleSubmit}>
        <input
          type="text"
          className="messageInput"
          placeholder="Say something..."
          value={this.state.text}
          onChange={this.handleTextChange}
        />
        <input type="submit" value="Post" />
      </form>
    );
  }
});

React.render(
  <Chatension url="http://localhost:3000/api/messages" pollInterval={2000} />,
  document.getElementById('chatension-sidebar')
);