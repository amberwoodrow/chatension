chrome.browserAction.onClicked.addListener(function() {
  chrome.tabs.executeScript({
    code  : 'var injected = window.chatensionInjected; window.chatensionInjected = true; injected;',
    runAt : 'document_start'
  }, function(res) {

    if (res[0]) { return; } // value of `injected` above: don't inject twice

    chrome.tabs.insertCSS({ file: 'main.css' });
    chrome.tabs.executeScript({ file: 'libraries/react.js' });
    chrome.tabs.executeScript({ file: 'libraries/react-dom.min.js' });
    chrome.tabs.executeScript({ file: 'libraries/jquery.min.js' });
    chrome.tabs.executeScript({ file: 'build_output/content.js' });
  });
});