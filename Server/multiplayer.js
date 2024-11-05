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
    static CONNECTING = 0
    static CONNECTED = 1
    static RECONNECTING = 2
    static DISCONNECTED = 3
    constructor(server, canvas, width, height, connectingtext) {
        this.server = server
        window.networkingclient = this
        this.width = width
        this.height = height
        this.canvas = canvas
        this.checkinterval = setInterval(this.checkConnection, 100, this)
        this.keys = []
        this.mousex = 0
        this.mousestate = false
        this.mousey = 0

        this.statustext = connectingtext != null ? connectingtext : "Connecting..."
        this.status = NetworkingClient.CONNECTING

        this.connection = new WebSocket(this.server)

        this.connection.addEventListener("close", this)
        this.connection.addEventListener("message", this)
        this.connection.addEventListener("open", this)
        this.connection.addEventListener("error", this)

        window.addEventListener("message", this)

        document.addEventListener("mousemove", this)
        document.addEventListener("pointerdown",this)
        document.addEventListener("pointerup", this)
        document.addEventListener("keydown", this)
        document.addEventListener("keyup",this) 
    }
    socketClose() {
        clearInterval(this.tick)
        clearInterval(this.checkinterval)
        this.clearListeners()
        if (this.status == NetworkingClient.DISCONNECTED) {
            this.statustext = "Disconnected :("
        }
    }
    checkConnection () {
        if (!self.connection) {
            return
        }
        let Time = new Date().getTime()
        if (self.connection.readyState == WebSocket.CONNECTING && ((Time - self.lastMessage) > 3000)) {
            self.status = NetworkingClient.DISCONNECTED
            self.connection.close()
            self.socketClose()
        }
    }
    clearListeners() {
        document.removeEventListener("mousemove", this)
        document.removeEventListener("pointerdown", this)
        document.removeEventListener("pointerup", this)
        document.removeEventListener("keydown", this)
        document.removeEventListener("keyup", this)
        window.removeEventListener("message", this)
    }
    static calculatePoints(vertexQuantity, apothemLength, X, Y, rotation) {
        //Circle equation: (x-X)^2 + (y-Y)^2 = apothemLength^2
        //Point on path of circle: x = r * sin(rotation), y = r * cos(rotation)
        //Rotation = 360/vertexQuantity
        let Points = []
        const RotationIncrements = 360/vertexQuantity
        let StartingOffset = Math.PI/vertexQuantity
        if (rotation) {
            StartingOffset += rotation * Math.PI/180
        }
        let currentRotation = 0
        while (currentRotation < 360) {
            let x = apothemLength * Math.cos((currentRotation * Math.PI/180) + StartingOffset) + X
            let y = apothemLength * Math.sin((currentRotation * Math.PI/180) + StartingOffset) + Y
            Points.push([x,y])
            currentRotation += RotationIncrements
        }
        return Points
    }
    drawConvex (context, vertexes, apothem, x, y, rotation) {
        let points = NetworkingClient.calculatePoints(vertexes, apothem, x, y, rotation)
        context.beginPath()
        context.moveTo(points[0][0],points[0][1])
        for (let point of points.toSpliced(0,1)) {
            context.lineTo(point[0],point[1])
        }
        context.lineTo(points[0][0],points[0][1])
        context.fill()
        context.closePath()
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
            if (object.type == "texture") {
                let img = new Image(object.width,object.height)
                img.src = object.texture
                context.drawImage(img,object.x,object.y)
            }
            if (object.type != "polygon") {
                continue
            }

            this.drawConvex(context, object.vertexes, object.apothem, object.x, object.y, object.rotation)
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

    reconnect(self, connectingtext) {
        networkingclient = new NetworkingClient(self.server, self.canvas, self.width, self.height, connectingtext)
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
            setTimeout(this.reconnect, request.time, this, request.text ? request.text : null)
            this.status = NetworkingClient.RECONNECTING
            this.socketClose()
            this.connection.close()
            this.connection.removeEventListener("close", this)
            this.connection.removeEventListener("message", this)
            this.connection.removeEventListener("open", this)
            this.connection.removeEventListener("error", this)
            this.statustext = request.text ? request.text : "Reconnecting..."
        }
        if (request.type == "bling") {
            window.postMessage({type:"bling", amount:request.amount},"*")
        }
        if (request.type == "win") {
            window.postMessage({type:"win", players:request.players},"*")
        }
    }

    requestEquipData() {
        window.postMessage({type:"equipRequest"})
    }

    sendEquip(hat) {
        let Equip = {
            Type: "Equip",
            Hat: hat
        }
        this.connection.send(JSON.stringify(Equip))
    }

    receiveMessage(message) {
        if (message.type == "equipData") {
            this.sendEquip(message.hat)
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
            if (ev.target instanceof Window) {
                this.receiveMessage(ev.data)
            }
            if (ev.target instanceof WebSocket) {
                this.recieveUpdate(JSON.parse(ev.data))
                this.lastMessage = new Date().getTime()
            }
        }
        if (ev.type == "open") {
            this.statustext = ""
            this.status = NetworkingClient.CONNECTED
            this.requestEquipData()
            this.tick = setInterval(this.sendUpdate, 1000/60, this)
        }
        if (ev.type == "close") {
            if (this.status != NetworkingClient.RECONNECTING) {
                this.status = NetworkingClient.CLOSED
            }
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
            Type: "Play",
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
    let server = window.location.hostname
    let port = 2096
    let protocol = window.location.protocol == "https:" ? "wss://" : "ws://"
    networkingclient = new NetworkingClient(protocol + server + ":" + port, canvas, window.innerWidth, window.innerHeight)
})
window.addEventListener("pagehide", function() {
	    networkingclient.connection.close()
	    this.window.close()
})
