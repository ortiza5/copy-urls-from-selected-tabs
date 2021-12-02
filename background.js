function copySelectedTabUrls() {
  // Get selected tabs
  chrome.tabs.query({ highlighted: true }, (selectedTabs) => {
    let outputString = "";
    chrome.storage.local.get({ separatorChars: ", \n" }, (items) => {
      const separator = items.separatorChars.toString();

      // get the url of each tab
      selectedTabs.forEach((tab, idx, tabs) => {
        outputString += tab.url;
        if (idx !== tabs.length - 1) {
          outputString += separator;
        }
      });

      // output to clipboard
      copyTextToClipboard(outputString);

      // notify completion
      flashBadge("✓", 3000);
    });
  });
}

// https://stackoverflow.com/a/18455088
function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to.
  var copyFrom = document.createElement("textarea");
  copyFrom.textContent = text;
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");

  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}

function flashBadge(symbol, duration) {
  chrome.browserAction.setBadgeText({ text: symbol }, () => {
    setTimeout(() => {
      chrome.browserAction.setBadgeText({ text: "" });
    }, duration);
  });
}

// Keyboard shortcut listner
chrome.commands.onCommand.addListener(function (command) {
  if (command === "copy-urls") {
    copySelectedTabUrls();
  }
});

// Extension icon click listener
chrome.browserAction.onClicked.addListener(copySelectedTabUrls);
