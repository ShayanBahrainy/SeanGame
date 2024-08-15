class DataHandler{
    constructor(reset){
        if (reset) {
            chrome.storage.local.clear()
        }
        this.levelprices = {}
        this.levelprices[2] = 2500
        this.levelprices[3] = 10000
        this.hatprices = {}
        this.hatprices["WhiteHat"] = 1000
        this.hatprices["GreenHat"] = 2500
        this.hatprices["BlueHat"] = 5000
        this.hatprices["BeaconHat"] = 20000
        this.hatprices["PurpleHat"] = 50000
        this.hatprices["RainbowHat"] = 100000
    }
    async HireSean() {
        let data = await chrome.storage.local.get()
        data["HireSean"] = 4
        await chrome.storage.local.set(data)
    }
    async giveHat(type) {
        let data = await chrome.storage.local.get()
        if (!data["hats"]) {
            data["hats"] = []
        }
        if (data["hats"].indexOf(type) == -1) {
            data["hats"].push(type)
        }
        await chrome.storage.local.set(data)
        UpdateInfo(this)
        return false
    }
    async ownsHat(type) {
        let data = await chrome.storage.local.get()
        if (!data["hats"]) {
            data["hats"] = []
        }
        return data["hats"].indexOf(type) != -1
    } 
    async PlayerHealth() {
        let data = await chrome.storage.local.get()
        if (data["PlayerHealth"]) {
            data["PlayerHealth"] += 50
        }
        else {
            data["PlayerHealth"] = 300
        }
        await chrome.storage.local.set(data)
    }
    async upgrade(type) {
        let data = await chrome.storage.local.get()
        if (type.indexOf("Exponential") == -1) {
            type = type.replace("Exponential","")
            this[type]()
            return
        }
        type = type.replace("Exponential","")
        let Value = data[type]
        if (Value && Value < 4 ) {
            Value += Math.ceil(Math.pow(Math.pow(Value,3) + 1,1/3))
            data[type] = Value
            await chrome.storage.local.set(data)
        }
        UpdateInfo(this)
    }
    async decreaseBling(amount) {
        let data = await chrome.storage.local.get()
        let Bling = data["bling"]
        if (Bling && Bling >= amount) {
            Bling -= amount
            data["bling"] = Bling
            await chrome.storage.local.set(data)
            return true
        }
        return false
    }
    async getValue(type) {
        if (type.indexOf("Exponential") != -1){
            type = type.replace("Exponential","")
        }
        let data = await chrome.storage.local.get()
        let Value = data[type]
        if (Value) {
            return Value
        }
        return 1
    }
    async getPrice(type) {
        if (type == "PlayerHealth") {
            let Value = await this.getValue(type)
            let X
            if (Value > 250){
                X = (Value - 250)/50 + 1
            }
            else {
                X = 2
            }
            return ((Math.pow(X,2)) * 2000) + 2
        }
        if (type == "HireSean") {
            return 1000
        }
        if (type.indexOf("Hat") != -1) {
            return this.hatprices[type]
        }
        if (type.indexOf("Exponential") != -1) {
            type = type.replace("Exponential","")
            let Value = await this.getValue(type)
            return Math.ceil(Math.pow(Math.pow(Value,1/2) + 2,3))
        }
        if (type == "BuyLevel") {
            return this.levelprices[await this.getLevel() + 1] ? this.levelprices[await this.getLevel() + 1] : Infinity
        }
    }
    async BuyLevel() {
        let data = await chrome.storage.local.get()
        if (!data["level"]) {
            data["level"] = 1
        }
        data["level"] += 1
        await chrome.storage.local.set(data)
        UpdateInfo(this)
        return true
    }
    async getLevel() {
        let data = await chrome.storage.local.get()
        if (!data["level"]) {
            return 1
        }
        return data["level"]
    }
}
function UpdateInfo(datahandler) {
    let type
    if (document.getElementById("shoptoggle").innerText == "Hats") {
        type = document.getElementById("upgrades").value
    }
    else {
        type = document.getElementById("hats").value
    }
    if (type.indexOf("Hat") != -1) {
        datahandler.ownsHat(type).then(function (v) {
            document.getElementById("buy").disabled = v
        })
    }
    datahandler.getPrice(type).then(function (v) {
        document.getElementById("price").innerText = "Cost: PRICE bling.".replace("PRICE",v)
    })
    datahandler.getValue("bling").then(function (v) {
        document.getElementById("wallet").innerText = "Balance: BALANCE bling.".replace("BALANCE",v)
    })
    datahandler.getLevel().then(function (v) {
        document.getElementById("level").innerText = "You are on stage " + v + "."
    })
}
function ToggleShop() {
    let toggle = document.getElementById("shoptoggle")
    let buy = document.getElementById("buy")
    let toShow = document.getElementsByClassName(toggle.innerText)
    for (let element of toShow){
        element.className = element.className.replaceAll(" hidden","")
    }
    if (toggle.innerText == "Upgrades") {
        toggle.innerText = "Hats"
        buy.innerText = "Upgrade"
    }
    else {
        toggle.innerText = "Upgrades"
        buy.innerText = "Buy"
    }
    let toHide = document.getElementsByClassName(toggle.innerText)
    for (let element of toHide){
        element.className += " hidden"
    }
}
function openPage(page) {
    chrome.runtime.sendMessage({type:"open", page:page}, function (response) {
        if (response.type == "close") {
            window.close()
        }
    })
}
window.addEventListener("load",function (e) {
    let datahandler = new DataHandler(false)
    this.document.getElementById("shoptoggle").addEventListener("click", ToggleShop)
    this.document.getElementById("inventory").addEventListener("click", function () {
        openPage("inventory.html")
    })
    this.document.getElementById("upgrades").addEventListener("change", function () {
        UpdateInfo(datahandler)
    })
    this.document.getElementById("hats").addEventListener("change", function () {
        UpdateInfo(datahandler)
    })
    this.document.getElementById("buy").addEventListener("click",function () {
        let type 
        if (document.getElementById("shoptoggle").innerText == "Hats") {
            type = document.getElementById("upgrades").value
        }
        else {
            type = document.getElementById("hats").value
        }
        datahandler.getPrice(type).then(function (v) {
            datahandler.decreaseBling(v).then(function (success) {
                if (success) {
                    if (type.indexOf("Hat") == -1) {
                        datahandler.upgrade(type)
                    }
                    else {
                        datahandler.giveHat(type)
                    }
                    UpdateInfo(datahandler)
                }
            })
        })
    })
})