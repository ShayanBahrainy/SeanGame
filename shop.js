class DataHandler{
    constructor(reset){
        if (reset) {
            chrome.storage.local.clear()
        }
        this.levelprices = {}
        this.levelprices[2] = 2500
        this.levelprices[3] = 5000
    }
    async HireSean() {
        let data = await chrome.storage.local.get()
        data["HireSean"] = 4
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
        if (type == "GetHealthy") {
            let Value = await this.getValue(type)
            return Math.ceil(Math.pow(Math.pow(Value,1/2) + 2,3))
        }
        if (type == "HireSean") {
            return 1000
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
    let Upgrade = document.getElementById("upgrades").value
    datahandler.getValue(Upgrade).then(function (v) {
        document.getElementById("current").value = v
    })
    datahandler.getPrice(Upgrade).then(function (v) {
        document.getElementById("price").innerText = "Cost: PRICE bling.".replace("PRICE",v)
    })
    datahandler.getValue("bling").then(function (v) {
        document.getElementById("wallet").innerText = "Balance: BALANCE bling.".replace("BALANCE",v)
    })
    datahandler.getLevel().then(function (v) {
        document.getElementById("level").innerText = "You are on stage " + v + "."
    })
}
window.addEventListener("load",function (e) {
    let datahandler = new DataHandler(false)
    this.document.getElementById("upgrades").addEventListener("change", function () {
        UpdateInfo(datahandler)
    })
    this.document.getElementById("buy").addEventListener("click",function () {
        let type = document.getElementById("upgrades").value
        datahandler.getPrice(type).then(function (v) {
            datahandler.decreaseBling(v).then(function (success) {
                if (success) {
                    datahandler.upgrade(type)
                    UpdateInfo(datahandler)
                }
            })
        })
    })
})