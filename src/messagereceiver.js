class DataHandler {
    constructor(reset) {
        if (reset){
            chrome.storage.local.clear()
        }
    }
    async addBling(amount) {
        let data = await chrome.storage.local.get()
        if (data["bling"]){
            data["bling"] = parseInt(data["bling"])
            data["bling"] += amount
        }
        else {
            data["bling"] = amount
        }
        await chrome.storage.local.set(data)
    }
    async getMultiplayerFactor() {
        const data = await chrome.storage.local.get()
        if (data["MultiplayerFactor"]) {
            return data["MultiplayerFactor"]
        }
        else {
            return 1
        }
    }
    async getSelectedHat() {
        let data = await chrome.storage.local.get()
        if (data["hat"]) {
            return data["hat"]
        }
        return null
    }
}

const datahandler = new DataHandler(false)
window.addEventListener("message", function(event) {
    // We only accept messages from ourselves
    if (event.source != window)
        return

    if (event.data.type) {
        switch (event.data.type) {
            case "bling":
                datahandler.addBling(event.data.amount)
                break
            case "win":
                datahandler.getMultiplayerFactor().then(function (factor) {
                    datahandler.addBling((event.data.players * 100 * factor) + 200 * factor)
                })
                break
            case "equipRequest":
                datahandler.getSelectedHat().then(function (hat) {
                    event.source.postMessage({type:"equipData", hat: hat}, "*")
                })
            break
        }
    }
});