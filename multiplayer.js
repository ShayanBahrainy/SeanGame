let renderer
let player
let obstacle
let sean
let keyhandler
let datahandler
let boss
class Boss {
    constructor(radius, player, renderer, datahandler) {
        this.radius = radius
        this.x = renderer.width/2;
        this.y = renderer.height - 40;
        this.sean = null
        this.datahandler = datahandler
        this.priority = 10
        this.cooldowntime = 0
        this.maxhealth = 0
        let boss = this
        datahandler.getPlayerBullet().then(function (v) {
            boss.cooldowntime = 300/v
            boss.cooldown = 300
            boss.maxhealth = 1200 * v 
            boss.health = boss.maxhealth
            boss.healtime = v + 150
            boss.heal = boss.healtime
        })
        this.health = this.maxhealth
        this.fillStyle = "rgb(255,0,0)"
        this.shape = "circle"
        this.renderer = renderer
        this.player = player
        this.text = "Bryce: " + this.health + "/" + this.health
        renderer.addObject(this)
    }
    update(){
        this.text = "Bryce: " + this.health + "/" + this.maxhealth
        if (this.health <= 0) {
            this.destruct()
            this.renderer.FlashMessage("Bryce Died! (You shot " + this.player.score + " of his Sulaymaans! :D )",6000)
        }

        this.cooldown -= 1
        this.heal -= 1
        if (this.heal <= 0 && this.health < this.maxhealth) {
            this.health += 100
            this.heal = this.healtime
        }
        let objects = renderer.objects
        let enemies = new Array()

        for (let object in objects){
            object = objects[object]
            if (object.constructor.name == "Player"){
                enemies.push(object)
            }
        } 

        let enemy = enemies[Math.floor(Math.random() * enemies.length)]

        if (!enemy) {
            return
        }

        if (this.cooldown <= 0){
            this.cooldown = this.cooldowntime
            let PositiveNegative = [1,-1]
            let Y = (enemy.y - this.y) + Math.random() * 45 * PositiveNegative[Math.round(Math.random())]
            let X = (enemy.x - this.x) + Math.random() * 45 * PositiveNegative[Math.round(Math.random())]
            new Bullet(5, this.x, this.y, X/20, Y/20, this, this.renderer, ["Player"],100)
        } 
    }
    distance(enemy) {
        return Math.sqrt((enemy.x - this.x)^2 + (enemy.y - this.y)^2)
    }
    collision () {

    }
    destruct() {
        this.renderer.removeObject(this.renderer,this)
        datahandler.addBling(500)
        if (this.sean) {
            this.sean.destruct()
        }
        else {
            this.player.destruct()
        }
    }
}
class Sean {
    constructor(radius, player, renderer, datahandler) {
        this.radius = radius
        this.x = renderer.width/2;
        this.y = 10;
        this.datahandler = datahandler
        this.priority = 10
        this.cooldowntime = 0
        let sean = this 
        datahandler.getSeanBullet().then(function (v) {
            sean.cooldowntime = 60/v
        })
        this.cooldown = this.cooldowntime
        this.fillStyle = "rgb(0,255,255)"
        this.maxhealth = 400
        this.health = this.maxhealth
        this.shape = "circle"
        this.renderer = renderer
        this.player = player
        this.score = 0
        this.text = "Sean: " + this.maxhealth + "/" + this.maxhealth
        renderer.addObject(this)
    }
    update(){
        this.text = "Sean: " + this.health + "/" + this.maxhealth
        
        if (this.health <= 0) {
            this.destruct()
            this.renderer.FlashMessage("Sean Died! You killed: " + this.player.score + " Sean killed: " + this.score,6000)
        }

        this.cooldown -= 1
        let objects = renderer.objects
        let enemies = new Array()

        for (let object in objects){
            object = objects[object]
            if (object.constructor.name == "Obstacle" || object.constructor.name == "Boss"){
                enemies.push(object)
            }
        } 

        let enemy = enemies[Math.floor(Math.random() * enemies.length - 1)]

        if (!enemy) {
            return
        }

        if (this.cooldown <= 0){
            this.cooldown = this.cooldowntime
            let Y = enemy.y - this.y
            let X = enemy.x - this.x
            new Bullet(5, this.x, this.y, X/20, Y/20, this, this.renderer, ["Obstacle","Boss"], 50)
        } 
    }
    distance(enemy) {
        return Math.sqrt((enemy.x - this.x)^2 + (enemy.y - this.y)^2)
    }
    collision () {

    }
    destruct() {
        this.renderer.removeObject(this.renderer,this)
        this.player.destruct()
        this.datahandler.addBling(this.player.score)
        let datahandler = this.datahandler
        let score = this.score
        datahandler.getSeanStatus().then(function (bool) {
            if (bool) {
                datahandler.addBling(score)
            }
        })
    }
}
class PlayerAim {
    constructor(player, radius, distance, renderer){
        this.radius = radius
        this.renderer = renderer
        this.shape = "circle"
        this.fillStyle = "rgb(255,0,0)"
        this.priority = 0
        this.angle = 0
        this.distance = distance
        this.player = player
        this.x = 0
        this.y = 0
        this.renderer = renderer
        document.addEventListener("mousemove",this)
        renderer.addObject(this)
    }
    handleEvent(e) {
        if (e.type != "mousemove"){
            return
        }
        const canvas = this.renderer.getCanvas()
        const rect = canvas.getBoundingClientRect()
        this.x = e.clientX - rect.left
        this.y = e.clientY - rect.top
    }
    update() {
        let x = (this.player.x + this.player.width/2) + this.distance * Math.cos(this.angle * (Math.PI/180))
        let y = (this.player.y + this.player.height/2) + this.distance * Math.sin(this.angle * (Math.PI/180))
        //this.x = x 
        //this.y = y
    }
    collision () {

    }

}
class Player {
    constructor(height, width, renderer, keyhandler, datahandler) {
        this.height = height;
        this.width = width;
        this.sean = null
        this.keyhandler = keyhandler
        this.x = renderer.width/2;
        this.sidedirection = 0
        this.updirection = 0
        this.y = renderer.height/2;
        this.reloadtime = 60
        if (datahandler) {
            let player = this
            datahandler.getPlayerBullet().then(function (v) {
                player.reloadtime = 60/v
            })
        }
        this.timer = 0
        this.priority = 1
        this.fillStyle = "rgb(0,0,255)"
        this.maxhealth = 255
        this.health = this.maxhealth
        this.speed = 1.5
        this.healtime = 600
        this.heal = this.healtime
        this.score = 0
        this.shape = "rectangle"
        this.renderer = renderer
        this.playeraim = new PlayerAim(this,3,10,renderer)
        renderer.addObject(this)
        keyhandler.add(this)
        document.addEventListener("pointerdown",this)
    }
    setBulletSpeed(v) {
        this.reloadtime = v
    }
    collision(self,object) {
        if (self.health <= 0) {
            if (self.sean){
                self.sean.destruct()
            }
            else {
                self.destruct()
            }
        }
    }
    update() {
        if (this.health <= 0) {
            if (this.sean){
                this.sean.destruct()
            }
            else {
                this.destruct()
            }
        }
        const rect = this.renderer.canvas.getBoundingClientRect()
        const XBorderOne = rect.left
        const XBorderTwo = XBorderOne + this.renderer.width
        const YBorderOne = rect.top
        const YBorderTwo = YBorderOne + this.renderer.height

        if (this.x < XBorderOne){
            this.x = XBorderTwo
        }
        if (this.x > XBorderTwo) {
            this.x = XBorderOne
        }
        if (this.y < YBorderOne) {
            this.y = YBorderTwo
        }
        if (this.y > YBorderTwo) {
            this.y = YBorderOne
        }
        this.timer -= 1
        this.heal -= 1
        if (this.heal <= 0 && this.health < this.maxhealth) {
            this.health += 50
            this.heal = this.healtime
        }
        this.fillStyle = "rgb(red,0,blue)".replace("red",255-this.health).replace("blue",this.health)
    }
    fireBullet() {
        if (this.timer >= 0) {
            return
        }
        this.timer = this.reloadtime
        let CenterX = this.x + this.width/2
        let CenterY = this.y + this.height/2

        let Y = this.playeraim.y - CenterY
        let X = this.playeraim.x - CenterX

        new Bullet(5, CenterX, CenterY, X/10, Y/10, this, this.renderer, ["Obstacle","Boss"],50)
    }
    handleEvent(e) {
        if (e.type != "pointerdown"){
            return
        }
        if (e.type == "pointerdown"){
            this.fireBullet()
            return
        }
    }
    keyPress(keys) {
        if (keys.indexOf("w") != -1 || keys.indexOf("ArrowUp") != -1) {
            this.y -= this.speed
        }
        if (keys.indexOf("a") != -1 || keys.indexOf("ArrowLeft") != -1) {
            this.x -= this.speed
        }
        if (keys.indexOf("s") != -1|| keys.indexOf("ArrowDown") != -1) {
            this.y += this.speed
        }
        if (keys.indexOf("d") != -1 || keys.indexOf("ArrowRight") != -1) {
            this.x += this.speed
        }
        if (keys.indexOf("f") != -1) {
            this.fireBullet()
        }
        if (keys.indexOf("k") != -1){
            this.health = 0
        }
    }
    destruct() {
        this.renderer.removeObject(this.renderer,this)
        this.renderer.FlashMessage("You Died! Score: " + this.score,600)
    }
}
class Bullet {
    constructor(radius, x, y, xrate, yrate, owner, renderer, targets, damage){
        this.x = x
        this.y = y
        this.damage = damage
        this.lifetime = 120
        this.xrate = xrate
        this.yrate = yrate
        this.priority = 5
        this.radius = radius
        this.shape = "circle"
        this.owner = owner
        this.fillStyle = "rgb(255,0,0)"
        this.renderer = renderer
        this.targets = targets 
        renderer.addObject(this)
    }
    update() {
        this.lifetime -= 1
        if (this.lifetime == 0) {
            this.renderer.removeObject(this.renderer,this)
        }
        this.x += this.xrate
        this.y += this.yrate
    } 
    collision(self, collidee) {
        if (!self.targets.includes(collidee.constructor.name)){
            return
        }
        self.owner.score += 1
        collidee.health -= this.damage
        if (collidee.constructor.name == "Boss") {
            this.lifetime == 0
        }
    }
}
class Obstacle{
    constructor(height, width, renderer, target, datahandler) {
        this.height = height;
        this.width = width;
        this.target = target
        this.x = this.generateX();
        this.sidedirection = 0
        this.updirection = 0
        this.y = this.generateY();
        this.priority = 0
        this.fillStyle = "rgb(255,0,255)"
        this.speed = .4
        this.shape = "rectangle"
        this.damagetime = 60
        this.health = 50
        this.damage = 50
        if (datahandler) {
            let obstacle = this
            datahandler.getPlayerBullet().then(function (v) {
                obstacle.health = v * 50
            })
        }
        if (target.score && target.score > 100 && target.reloadtime <= 30) {
            this.fillStyle = "rgb(255, 158, 61)"
            this.speed *= 2
            this.damage *= 2
        }
        this.renderer = renderer
        this.damagetimer = this.damagetime
        renderer.addObject(this)
    }
    generateX() {
        let X = Math.floor(Math.random() * renderer.width)
        while ((this.target.x - 10 < X && X < this.target.x + 10)) {
            X = Math.floor(Math.random() * renderer.width);
        }
        return X
    }
    generateY() {
        let Y = Math.floor(Math.random() * renderer.height)
        while ((this.target.y - 10 < Y && Y < this.target.y + 10)) {
            Y = Math.floor(Math.random() * renderer.height);
        }
        return Y
    }
    update(self) {
        if (this.health <= 0) {
            self.renderer.removeObject(self.renderer,self)
            new Obstacle(10, 10, self.renderer, self.target)
        }
        if (self.target == null) {
            return;
        }
        if (self.target.x > self.x){
            self.sidedirection = 1
        }
        if (self.target.x < self.x) {
            self.sidedirection = -1
        }
        if (self.target.x == self.x) {
            self.sidedirection = 0
        }
        if (self.target.y > self.y) {
            self.updirection = 1
        }
        if (self.target.y < self.y) {
            self.updirection = -1
        }
        if (self.target.y == self.y) {
            self.updirection = 0
        }
        self.x += self.sidedirection * self.speed
        self.y += self.updirection * self.speed
        this.damagetimer -= 1
    }
    collision (self,object){
        if (object.constructor.name == "Player") {
            self.target = object
            object.updirection = -object.updirection
            object.sidedirection = -object.sidedirection
        }
        if (object.constructor.name == self.target.constructor.name && self.damagetimer < 0 ) {
            object.health -= self.damage
            self.damagetimer = self.damagetime
        }
    }
}
class Renderer {
    constructor(canvas,fps,width,height,keyhandler) {
        this.canvas = canvas
        this.width = width
        this.height = height
        this.objects = new Array()
        this.message = null
        this.frames = -1
        this.keyhandler = keyhandler
        this.intervalId = setInterval(this.draw,Math.round(1000/fps),this)
    } 
    destruct() {
        clearInterval(this.intervalId)
    }
    draw(self) {
        self.collisonChecks(self)
        self.keyhandler.callListeners()
        const context = this.canvas.getContext("2d")
        context.clearRect(0,0,self.width,self.height)
        let renderObjects = Renderer.sortObjects(self.objects)
        for (let key in renderObjects) {
            let object = renderObjects[key] 
            object.update(object)
            if (Object.hasOwn(object, "text")){
                context.font = "18px Times New Roman"
                context.textAlign = "center"
                context.textBaseline = "middle"
                context.fillStyle = "#8aea92"
                context.fillText(object.text,object.x,object.y + 20)
            }
            context.fillStyle = object.fillStyle
            if (object.shape == "rectangle"){
                context.fillRect(object.x,object.y,object.width,object.height)
            }
            if (object.shape == "circle"){
                context.beginPath()
                context.arc(object.x,object.y,object.radius,0,360,false)
                context.closePath()
                context.fill()
            }
        }
        if (self.frames > 0 ){
            context.clearRect(0,0,self.width,self.height)
            let size
            if (self.message.length >= 36){
                size = 16
            } 
            else {
                size = 36
            }
            context.font = "sizepx Times New Roman".replace("size",size)
            context.textAlign = "center"
            context.textBaseline = "middle"
            context.fillStyle = "#8aea92"
            context.fillText(self.message,self.width/2,self.height/2)
            self.frames -= 1
        }
    }
    collisonChecks(self) {
        let cewidth 
        let ceheight
        let crwidth
        let crheight
        for (let collidee in self.objects) {
            collidee = self.objects[collidee]
            if (collidee.shape == "rectangle"){
                cewidth = collidee.width
                ceheight = collidee.height
            }
            if (collidee.shape == "circle"){
                cewidth = collidee.radius * 2
                ceheight = collidee.radius * 2
            }
            for (let collider in self.objects) {
                collider = self.objects[collider]
                if (collidee == collider) {
                    continue
                }
                if (collider.shape == "rectangle"){
                    crwidth = collider.width
                    crheight = collider.height
                }
                if (collider.shape == "circle"){
                    crwidth = collider.radius * 2
                    crheight = collider.radius * 2 //Radius is already the "half" width so multiply by two
                }
                //Implementation of Separating Axis Theorem
                let AverageXCollidee = (collidee.x + collidee.x + cewidth)/2
                let AverageXCollider = (collider.x + collider.x + crwidth)/2
                let AverageYCollidee = (collidee.y + collidee.y + ceheight)/2
                let AverageYCollider = (collider.y + collider.y + crheight)/2

                let HorizontonalLength  = Math.abs(AverageXCollidee - AverageXCollider)
                let VerticalLength = Math.abs(AverageYCollidee - AverageYCollider)

                HorizontonalLength -= cewidth/2 + crwidth/2
                VerticalLength -= ceheight/2 + crheight/2

                if (HorizontonalLength <= 0 && VerticalLength <= 0) {
                    collider.collision(collider,collidee)
                }
            }
        }
    }
    FlashMessage(Message, Frames) {
        this.message = Message
        this.frames = Frames
    }
    getCanvas() {
        return this.canvas
    }
    getObjects() {
        return this.objects
    }
    removeObject(self, object){
        var index = self.objects.indexOf(object)
        if (index != -1){
            delete self.objects[index]
        }
    }
    addObject(object){
        this.objects[this.objects.length] = object
    }
    static sortObjects(objects) {
        let sorted = []
        for (let object in objects) {
            object = objects[object]
            let priority = object.priority
            let isSlotEmpty = sorted[priority] == null
            while (!isSlotEmpty) {
                priority++;
                isSlotEmpty = sorted[priority] == null
            }
            sorted[priority] = object
        }
        return sorted
    }
}
class DataHandler {
    constructor(reset) {
        if (reset){
            chrome.storage.local.clear()
        }
    }
    async getBling() {
        let data = await chrome.storage.local.get()
        if (data["bling"]) {
            data["bling"] = parseInt(data["bling"])
            return data["bling"]
        }
        return 0;
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
        let data = await chrome.storage.local.get("PlayerBullet")
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
}
class KeyHandler {
    constructor () {
        this.keys = []
        this.listeners = []
        document.addEventListener("keydown",this)
        document.addEventListener("keyup",this)
    }
    add(Listener) {
        if (this.listeners.indexOf(Listener) > -1){
            return
        }
        this.listeners.push(Listener)
    }
    remove(Listener) {
        this.listeners.forEach(function (value, index, array) {
            if (value == Listener){
                delete array[index]
            }
        })
    }
    callListeners() {
        for (let listener in this.listeners) {
            listener = this.listeners[listener]
            listener.keyPress(this.keys)
        }
    }
    handleEvent(e) {
        if (e.type == "keydown") {
            if (this.keys.indexOf(e.key) == -1) {
                this.keys.push(e.key)   
            }
        }
        if (e.type == "keyup") {
            let index = this.keys.indexOf(e.key)
            if (index > -1) {
                delete this.keys[index]
            }
        }
    }

}
class Networker {
    constructor(mode, player) {
        this.server = "http://localhost:8080"
        this.socket = io(this.server)
        this.player = player
        this.firebullet = false
    }
    update() {
        this.socket.emit("position",{x: this.player.x, y: this.player.y})
        if (this.firebullet) {
            this.socket.emit("firebullet")
            this.firebullet = false
        }
    }
    firebullet() {
        this.firebullet = true
    }
}
function ShareStuff(){
    window.open("https://mail.google.com/mail/u/0/?fs=1&su=Look+At+My+Score!&body=Look+at+my+score+below.&to=bahrainyshayan@gmail.com&tf=cm")
}
window.addEventListener("load", function (){
    datahandler = new DataHandler(false)
    chrome.action.setPopup({popup: chrome.runtime.getURL("popup.html")})
})