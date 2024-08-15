class DataHandler{
    constructor(reset){
        if (reset) {
            chrome.storage.local.clear()
        }
    }
    async getHats() {
        let data = await chrome.storage.local.get()
        return data["hats"]
    }
    async getSelectedHat() {
        let data = await chrome.storage.local.get()
        return data["hat"]
    }
    async selectHat(hat) {
        let data = await chrome.storage.local.get()
        data["hat"] = hat
        await chrome.storage.local.set(data)
    }
}
let datahandler
function UpdateInventory(hats){
    let container = document.getElementById("container")
    container.innerHTML = ""
    for (let hat of hats){
        let img = new Image(64,64)
        img.src = "images/hats/" + hat + ".png"
        img.className = "hat"
        img.innerText = hat
        img.addEventListener("click", function () {
            datahandler.selectHat(hat)
            let selected = document.getElementsByClassName("selected")
            for (e of selected) {
                e.className = ""
            }
            img.className = "selected"
        })
        container.appendChild(img)
    }
}
function openPage(page) {
    chrome.runtime.sendMessage({type:"open", page:page}, function (response) {
        if (response.type == "close") {
            window.close()
        }
    })
}
window.addEventListener("load",function () {
    datahandler = new DataHandler(false)
    datahandler.getHats().then(UpdateInventory)
    this.document.getElementById("backbutton").addEventListener("click", function (ev) {
        openPage("shop.html")
    })
})