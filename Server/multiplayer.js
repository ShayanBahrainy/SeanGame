let renderer
let player
let obstacle
let sean
let keyhandler
let datahandler
let networkingclient
let boss
let abhinav
let GAMEMODE
class DataHandler {
    constructor(reset) {
        if (reset){
            chrome.storage.local.clear()
        }
    }
    async getSelectedHat() {
        let data = await chrome.storage.local.get()
        if (data["hat"]) {
            return data["hat"]
        }
        return null
    }
    async getBling() {
        let data = await chrome.storage.local.get()
        if (data["bling"]) {
            data["bling"] = parseInt(data["bling"])
            return data["bling"]
        }
        return 0;
    }
    async getPlayerHealth() {
        let data = await chrome.storage.local.get()
        if (data["PlayerHealth"]){
            return data["PlayerHealth"]
        }
        else {
            return 250
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
    async getPlayerBullet() {
        let data = await chrome.storage.local.get()
        if (data["PlayerBullet"]) {
            return data["PlayerBullet"]
        }
        data["PlayerBullet"] = 1
        await chrome.storage.local.set(data)
        return 1
    }
    async getSeanBullet() {
        let data = await chrome.storage.local.get()
        if (data["SeanBullet"]) {
            return data["SeanBullet"]
        }
        data["SeanBullet"] = 1
        await chrome.storage.local.set(data)
        return 1
    }
    async getSeanStatus() {
        let data = await chrome.storage.local.get()
        if (data["HireSean"]) {
            return true
        }
        return false
    }
    async subtractBling(amount) {
        let data = await chrome.storage.local.get()
        if (!data["bling"] || data["bling"] < amount){
            return false
        }
        data["bling"] -= amount
        await chrome.storage.local.set(data)
        return true
    }
    async handleLevel(level) {
        let data = await chrome.storage.local.get()
        if (!data["level"]) {
            return false
        }
        if (data["level"] < level) {
            return false
        }
        return true
    }
    async handleAdView() {
        let data = await chrome.storage.local.get()

        if (!data["rewardreset"]) {
            data["rewardreset"] = Date.now()
            data["reward"] = 260
        }

        let lastreset = new Date()
        lastreset.setTime(data["rewardreset"])
        let now = new Date()
        now.setTime(Date.now())

        if (lastreset.getUTCDate() != now.getUTCDate() || lastreset.getUTCMonth() != now.getUTCMonth()) {
            data["rewardreset"] = Date.now()
            data["reward"] = 260
        }

        if (data["reward"] > 10) {
            data["reward"] -= 10
        }
        await chrome.storage.local.set(data)
        await this.addBling(parseInt(data["reward"]) + 10)
    }
}
class NetworkingClient {
    constructor(server, canvas, width, height) {
        this.server = server

        this.width = width
        this.height = height
        this.canvas = canvas
        this.checkinterval = setInterval(this.checkConnection, 100, this)
        this.keys = []
        this.mousex = 0
        this.mousestate = false
        this.mousey = 0

        this.statustext = "Connecting..."

        this.connection = new WebSocket(this.server)

        this.connection.addEventListener("close", this)
        this.connection.addEventListener("message", this)
        this.connection.addEventListener("open", this)
        this.connection.addEventListener("error", this)

        document.addEventListener("mousemove",this)
        document.addEventListener("pointerdown",this)
        document.addEventListener("pointerup", this)
        document.addEventListener("keydown",this)
        document.addEventListener("keyup",this)
    }
    socketClose(saveStatus) {
        clearInterval(this.tick)
        clearInterval(this.checkinterval)
        this.clearListeners()
        if (!saveStatus) {
            this.statustext = "Disconnected :("
        }
    }
    checkConnection () {
        if (!self.connection) {
            return
        }
        let Time = new Date().getTime()
        if (self.connection.readyState > WebSocket.CONNECTING && (Time - self.lastMessage > 3000)) {
            self.connection.close()
            self.socketClose()
        }
    }
    clearListeners() {
        document.removeEventListener("mousemove",this)
        document.removeEventListener("pointerdown",this)
        document.removeEventListener("pointerup", this)
        document.removeEventListener("keydown",this)
        document.removeEventListener("keyup",this)
    }
    draw(data) {
        const context = this.canvas.getContext("2d")
        context.clearRect(0,0,this.width,this.height)
        for (let key in data) {
            let object = data[key]
            if (object.type == "text"){
                context.font = "18px Times New Roman"
                context.textAlign = "center"
                context.textBaseline = "middle"
                context.fillStyle = "#8aea92"
                context.fillText(object.text,object.x,object.y)
            }
            context.fillStyle = object.fillStyle
            if (object.type == "rectangle"){
                context.fillRect(object.x,object.y,object.width,object.height)
            }
            if (object.type == "circle"){
                context.beginPath()
                context.arc(object.x,object.y,object.radius,0,360,false)
                context.closePath()
                context.fill()
            }
            if (object.shape == "texture") {
                let img = new Image(object.width,object.height)
                img.src = object.texture
                context.drawImage(img,object.x,object.y)
            }
        } 
    }
    set statustext(value) {
        this._statustext = value
        const context = this.canvas.getContext("2d")
        context.clearRect(0,0,this.width,this.height)
        context.font = "18px Times New Roman"
        context.textAlign = "center"
        context.textBaseline = "middle"
        context.fillStyle = "#8aea92"
        context.fillText(value,this.width/2,this.height/2)
        
    }

    reconnect(self) {
        networkingclient = new NetworkingClient(self.server, self.canvas, self.width, self.height)
    }

    recieveUpdate(request) {
        if (request.type == "frame") {
            this.draw(request.data)
        }
        if (request.type == "kick") {
            this.statustext = request.reason
            this.clearListeners()
        }
        if (request.type == "reconnect") {
            setTimeout(this.reconnect, request.time, this)
            this.socketClose(true)
            this.connection.close()
            this.connection.removeEventListener("close", this)
            this.connection.removeEventListener("message", this)
            this.connection.removeEventListener("open", this)
            this.connection.removeEventListener("error", this)
            this.statustext = "Reconnecting..."
        }
        if (request.type == "bling") {
            var editorExtensionId = "cjklkcpgnmdcnkepkndbmnajaibdmcaj"
            chrome.runtime.sendMessage(editorExtensionId, {type:"bling", amount:amount})
        }
    }
    handleEvent(ev) {
        if (ev.type == "pointerdown") {
            this.mousestate = true
        }
        if (ev.type == "pointerup") {
            this.mousestate = false
        }
        if (ev.type == "mousemove") {
            const canvas = this.canvas
            const rect = canvas.getBoundingClientRect()
            this.mousex = ev.clientX - rect.left
            this.mousey = ev.clientY - rect.top
        }
        if (ev.type == "message") {
            this.recieveUpdate(JSON.parse(ev.data))
            this.lastMessage = new Date().getTime()
        }
        if (ev.type == "open") {
            this.statustext = ""
            this.tick = setInterval(this.sendUpdate, 1000/60, this)
        }
        if (ev.type == "close") {
            this.socketClose()
        }
        if (ev.type == "error") {
            console.log(ev)
            this.socketClose()
        }
        if (ev.type == "keydown") {
            if (this.keys.indexOf(ev.key) == -1) {
                this.keys.push(ev.key)   
            }
        }
        if (ev.type == "keyup") {
            let index = this.keys.indexOf(ev.key)
            if (index > -1) {
                this.keys.splice(index,1)
            }
        }
    }
    sendUpdate(self) {
        let Input = {
            Keys: self.keys,
            MousePos: {X: self.mousex, Y: self.mousey},
            MouseState: self.mousestate
        }
        self.connection.send(JSON.stringify(Input))
    }
}
window.addEventListener("load", function (){
    datahandler = new DataHandler(false)
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let server = "localhost"
    let port = 690
    let protocol = window.location.protocol == "https:" ? "wss://" : "ws://"
    networkingclient = new NetworkingClient(protocol + server + ":" + port, canvas, window.innerWidth, window.innerHeight)
    this.window.networkingclient = networkingclient
})
window.onbeforeunload = function() {
    networkingclient.connection.close()
};