let MultiPlayerSuggestion = {description:"Play Multiplayer!", content:"Multiplayer Please!"}
let SinglePlayerSuggestion = {description:"Play Singleplayer!", content:"Singleplayer Please!"}
let DefaultSuggestion = {description: "Play Singleplayer!"}
chrome.omnibox.setDefaultSuggestion(DefaultSuggestion)
chrome.omnibox.onInputChanged.addListener(function (text, suggest) {
    if (isMultiplayer(text)) {
        chrome.omnibox.setDefaultSuggestion({description: MultiPlayerSuggestion.description})
        suggest([SinglePlayerSuggestion])
    }
    else {
        chrome.omnibox.setDefaultSuggestion(DefaultSuggestion)
        suggest([MultiPlayerSuggestion])
    }
})
function isMultiplayer(text) {
    return text.indexOf("Multi") != -1 || text.indexOf("multi") != -1
}
chrome.omnibox.onInputEntered.addListener(function (text, disposition) {
    if (isMultiplayer(text)) {
        chrome.action.setPopup({popup:"/multiplayer.html"})
    }
    else {
        chrome.action.setPopup({popup:"/popup.html"})
    }
    chrome.action.openPopup()
})
function openPage(page) {
    chrome.action.setPopup({popup:page})
    chrome.action.openPopup()
    chrome.action.setPopup({popup:"popup.html"})
}
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.type == "open") {
        sendResponse({type:"close"})
        setTimeout(openPage, 500, message.page)
    }
})