chrome.action.onClicked.addListener(async (tab) => {
      chrome.windows.create({
        url: chrome.runtime.getURL("popup.html"),
        type: "panel",
        width: 1000,
        height: 1000
      });
});
