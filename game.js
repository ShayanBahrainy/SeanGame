let renderer
let player
let obstacle
let sean
let keyhandler
let datahandler
let boss
let abhinav
let GAMEMODE
let Config = {
    MultiplayerClient: "https://sean.aurorii.com"
}
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
            let self = this
            this.destruct().then(function () {
                self.renderer.FlashMessage("You defeated Bryce! Congratulations, you earned 500 bling!",6000)
            })
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
    collision (collider,collidee) {
        if (collidee.constructor.name == "Player") {
            collidee.health -= 25
        }
    }
    async destruct() {
        this.renderer.removeObject(this.renderer,this)
        let self = this
        await datahandler.addBling(500)
        if (self.sean) {
            self.sean.destruct()
        }
        else {
            self.player.destruct()
        }
    }
}
class Abhinav {
    constructor(radius, player, renderer, datahandler) {
        this.radius = radius
        this.x = renderer.width/2;
        this.y = renderer.height - 40;
        this.sean = null
        this.datahandler = datahandler
        this.priority = 10
        this.cooldowntime = 20
        this.cooldown = this.cooldowntime
        this.maxhealth = 4200
        this.health = this.maxhealth
        this.healtime = 150
        this.heal = this.healtime
        this.fillStyle = "rgb(0,0,0)"
        this.shape = "circle"
        this.renderer = renderer
        this.player = player
        this.text = "Greedy Abhinav: " + this.health + "/" + this.health
        renderer.addObject(this)
    }
    update(){
        this.text = "Greedy Abhinav: " + this.health + "/" + this.maxhealth
        if (this.health <= 0) {
            this.destruct()
            this.renderer.FlashMessage("Abhinav Died! (You score " + this.player.score + " Camerons' worth :D )",6000)
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
            if (object.constructor.name == "Player" || object.constructor.name == "Sean"){
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
            new Bullet(5, this.x, this.y, X/40, Y/40, this, this.renderer, ["Player","Sean"],50)
        } 
    }
    distance(enemy) {
        return Math.sqrt((enemy.x - this.x)^2 + (enemy.y - this.y)^2)
    }
    collision (collider,collidee) {
        if (collidee.constructor.name == "Player") {
            collidee.health -= 25
        }
    }
    destruct() {
        this.renderer.removeObject(this.renderer,this)
        datahandler.addBling(1000).then(function () {
            if (this.sean) {
                this.sean.destruct()
            }
            else {
                this.player.destruct()
            }
        })
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
        this.shape = "texture"
        this.texture = "images/sean.png"
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
            this.renderer.FlashMessage("Sean Died! Your score: " + this.player.score + " Sean's Score: " + this.score,6000)
        }

        this.cooldown -= 1
        let objects = renderer.objects
        let enemies = new Array()

        for (let object in objects){
            object = objects[object]
            if (object.constructor.name == "Obstacle" || object.constructor.name == "Boss" || object.constructor.name == "Abhinav"){
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
            new Bullet(5, this.x, this.y, X/20, Y/20, this, this.renderer, ["Obstacle","Boss","Abhinav"], 50)
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
        this.datahandler.getLevelMultiplier(GAMEMODE).then(function (Multiplier) {
            this.datahandler.addBling(this.player.score * Multiplier)
        })
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
class Hat {
    constructor(type, player, renderer){
        this.radius = 5
        this.shape = ""
        this.texture = ""
        this.type = type
        this.priority = 0
        this.player = player
        this.x = 0
        this.y = 0
        this.renderer = renderer
        this.r = 0
        this.g = 0
        this.b = 0
        switch (type) {
            case ("WhiteHat"):
                this.shape = "circle"
                this.r = 255, this.b = 255, this.g = 255
                break;
            case ("GreenHat"):
                this.shape = "circle"
                this.fillStyle = "rgb(0,255,0)"
                this.g = 255
                break;
            case ("BlueHat"):
                this.shape = "circle"
                this.fillStyle = "rgb(0,0,255)"
                this.b = 255
                break;
            case ("BeaconHat"):
                this.shape = "circle"
                this.fillStyle = "rgb(0,0,0)"
                break;
            case ("PurpleHat"):
                this.shape = "circle"
                this.fillStyle = "rgb(255,0,255)"
                this.r = 255
                this.b = 255
                break;
            case ("RainbowHat"):
                this.shape = "circle"
                this.fillStyle = "rgb(0,0,0)"
                break;
        }
        renderer.addObject(this)
    }
    update() {
        if (this.type == "BeaconHat") {
            this.r >= 255 ? this.r = 0 : this.r += 1
            this.g >= 255 ? this.g = 0 : this.g += 1
            this.b >= 255 ? this.b = 0 : this.b += 1
        }
        if (this.type == "RainbowHat") {
            this.r >= 255 ? this.r = 0 : this.r += 1
            this.g >= 255 ? this.g = 0 : this.g += 2
            this.b >= 255 ? this.b = 0 : this.b += 3
        }
        this.x = player.x + player.width/2
        this.y = player.y - 2
        this.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")"
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
            datahandler.getPlayerHealth().then(function (v) {
                player.maxhealth = v
            })
        }
        this.timer = 0
        this.priority = 10
        this.fillStyle = "rgb(0,0,255)"
        this.maxhealth = 255
        this.health = this.maxhealth
        this.speed = 1.5
        this.healtime = 600
        this.heal = this.healtime
        this.score = 0
        this.shape = "rectangle"
        let self = this
        if (datahandler) {
            datahandler.getSelectedHat().then(function (hat) {
                if (hat) {
                    self.hat = new Hat(hat, self, renderer)
                    switch(hat) {
                        case "WhiteHat":
                            self.healtime /= 1.25
                            break;
                        case "GreenHat":
                            self.speed *= 1.5
                            break;
                        case "BlueHat":
                            self.setBulletSpeed(self.reloadtime/2)
                            break;
                        case "BeaconHat":
                            self.healtime /= 3
                            break;
                        case "PurpleHat":
                            self.healtime /= 2.5
                            self.speed *= 1.5
                            break;
                        case "RainbowHat":
                            self.healtime /= 2.5
                            self.speed *= 1.5
                            self.setBulletSpeed(self.reloadtime/1.5)
                            break;
                    }
                }
            })
        }
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
            if (GAMEMODE == "3") {
                //chrome.windows.create({url:"https://www.highcpmgate.com/s43q8bu05t?key=bfe39054fb71db060815f1650c4f9fac"})
            }
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
        if (this.distance(this,this.playeraim) < 25){
            return
        }
        this.timer = this.reloadtime
        let CenterX = this.x + this.width/2
        let CenterY = this.y + this.height/2

        let Y = this.playeraim.y - CenterY
        let X = this.playeraim.x - CenterX

        new Bullet(5, CenterX, CenterY, X/10, Y/10, this, this.renderer, ["Obstacle","Boss","Abhinav"],50)
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
    distance(ObjectOne,ObjectTwo) {
        return Math.sqrt(Math.pow(ObjectOne.x - ObjectTwo.x,2) + Math.pow(ObjectOne.y - ObjectTwo.y,2))
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
        this.collided = []
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
        if (self.collided.indexOf(collidee) != -1) {
            return
        }
        if (collidee.constructor.name != "Boss") {
            if (!collidee.killvalue) {
                self.owner.score += 1
            }
            else {
                self.owner.score += collidee.killvalue
            }
        }
        else {
            this.lifetime = 0
        }
        collidee.health -= this.damage
        collidee.lastenemy = this.owner
        self.collided.push(collidee)
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
        this.renderer = renderer
        this.damagetimer = this.damagetime
        this.datahandler = datahandler
        renderer.addObject(this)
        if (!(player.score && player.reloadtime <= 30)) {
            return
        }
        if (200 > player.score && player.score > 100){
            this.fillStyle = "rgb(255, 158, 61)"
            this.speed *= 2
            return
        }
        if (player.score > 200 && GAMEMODE > 1) {
            this.fillStyle = "rgb(0,255,0)"
            this.speed *= 2
            this.health *= 3
            this.killvalue = 2
            if (abhinav == undefined && GAMEMODE == 3 && player.score > 250) {
                abhinav = new Abhinav(20, player, this.renderer, this.datahandler)
            }
            return
        }
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
            new Obstacle(10, 10, self.renderer, self.lastenemy ? self.lastenemy : self.target, self.datahandler)
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
            if (object.shape == "texture") {
                let img = new Image(object.width,object.height)
                img.src = object.texture
                context.drawImage(img,object.x,object.y)
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
    async getLevelMultiplier(Level) {
        let Multipliers = {
            "1" : 1,
            "2" : 1.5,
            "3" : 2
        }
        return Multipliers[Level]
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
function PracticeMode() {
    let menu = document.getElementById("menu")
    menu.remove()
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = 400
    canvas.height = 300
    keyhandler = new KeyHandler(renderer)
    renderer = new Renderer(canvas,60,canvas.width,canvas.height,keyhandler)
    player = new Player(10,10,renderer,keyhandler)
    let x = 0
    while (x < 5){
        new Obstacle(10,10,renderer, player)
        x +=1
    }
}
function SeanMode(datahandler) {
    let menu = document.getElementById("menu")
    menu.remove()
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = 400
    canvas.height = 300
    keyhandler = new KeyHandler(renderer)
    renderer = new Renderer(canvas,60,canvas.width,canvas.height,keyhandler)
    player = new Player(10,10,renderer,keyhandler, datahandler)
    sean = new Sean(5,player,renderer,datahandler)
    player.sean = sean
    let x = 0
    while (x < 7){
        new Obstacle(10,10,renderer, player)
        x +=1
    }
}
function BossMode(datahandler) {
    let menu = document.getElementById("menu")
    menu.remove()
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = 400
    canvas.height = 300
    keyhandler = new KeyHandler(renderer)
    renderer = new Renderer(canvas,60,canvas.width,canvas.height,keyhandler)
    player = new Player(10,10,renderer,keyhandler, datahandler)
    boss = new Boss(15,player,renderer, datahandler)
    datahandler.getSeanStatus().then(function (bool) {
        if (bool) {
            sean = new Sean(5,player,renderer,datahandler)
            player.sean = sean
            boss.sean = sean
        }
    })
    let x = 0
    while (x < 3){
        new Obstacle(10, 10, renderer, player)
        x += 1
    }
}
function LevelTwo(datahandler) {
    let menu = document.getElementById("menu")
    menu.remove()
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = 400
    canvas.height = 300
    keyhandler = new KeyHandler(renderer)
    renderer = new Renderer(canvas,60,canvas.width,canvas.height,keyhandler)
    player = new Player(10,10,renderer,keyhandler, datahandler)
    sean = new Sean(5,player,renderer,datahandler)
    player.sean = sean
    let x = 0
    while (x < 7){
        new Obstacle(10,10,renderer, player)
        x += 1
    }
}
function LevelThree(datahandler) {
    let menu = document.getElementById("menu")
    menu.remove()
    let canvas = document.createElement("canvas")
    canvas.id = "canvas"
    document.body.appendChild(canvas)
    canvas.width = 400
    canvas.height = 300
    keyhandler = new KeyHandler()
    renderer = new Renderer(canvas,60,canvas.width,canvas.height,keyhandler)
    player = new Player(10,10,renderer,keyhandler, datahandler)
    sean = new Sean(5,player,renderer,datahandler)
    player.sean = sean
    let x = 0
    while (x < 7){
        new Obstacle(10,10,renderer, player, datahandler)
        x += 1
    }
}
function openPage(page) {
    chrome.runtime.sendMessage({type:"open", page:page}, function (response) {
        if (response.type == "close") {
            window.close()
        }
    })
}
function processEvents() {
    let modes = document.getElementById("modes")
    for (let child of modes.children) {
        if ('eventRange' in child.dataset) {
            let EventTime = JSON.parse(child.dataset['eventRange'])
            let now = new Date()
            if (EventTime['day']) {
                if (EventTime['day'].indexOf('-') != -1){
                    let start = Number(EventTime['day'].split("-")[0])
                    let end = Number(EventTime['day'].split("-")[1])
                    if (!(start <= now.getDate() && now.getDate() <= end)) {
                        continue
                    }
                }
                else if (now.getDate() != EventTime['day']){
                        continue
                }
            }
            if (EventTime['month']) {
                if (EventTime['month'].indexOf('-') != -1) {
                    let start = Number(EventTime['month'].split("-")[0])
                    let end = Number(EventTime['month'].split("-")[1])
                    if (!(start <= now.getMonth() && now.getMonth() <= end)) {
                        continue
                    }
                }
                else if (EventTime['month'] != now.getMonth()){
                    continue
                }
            }
            if (EventTime['year']){
                if (EventTime['year'].indexOf('-') != -1) {
                    let start = Number(EventTime['year'].split("-")[0])
                    let end = Number(EventTime['year'].split("-")[1])
                    if (!(start <= now.getFullYear() && now.getFullYear() <= end)) {
                        continue
                    } 
                }
                else if (EventTime['year'] != now.getFullYear()){
                    continue
                }
            }
            child.removeAttribute('hidden')
        }
    }
}
window.addEventListener("load", function (){
    processEvents()
    datahandler = new DataHandler(false)
    this.document.getElementById("play").addEventListener("click",function (){
        let modes = document.getElementById("modes")
        let selectedmode = modes.value
        GAMEMODE = selectedmode
        switch(selectedmode){
            case "practice":
                PracticeMode(datahandler)
                break;
            case "1":
                SeanMode(datahandler)
                break;
            case "boss":
                BossMode(datahandler)
                break;
            case "2":
                datahandler.handleLevel(2).then(function (v) {
                    if (v) {
                        LevelTwo(datahandler)
                    }
                    else {
                        alert("You don't own this level! Buy it from the shop.")
                    }
                })
                break;
            case "3":
                datahandler.handleLevel(3).then(function (v) {
                    if (v) {
                        LevelThree(datahandler)
                    }
                    else {
                        alert("You don't own this level! Buy it from the shop.")
                    }
                })
                break;
            case "multiplayer":
                if (Config.MultiplayerClient != "local") {
                    window.open(Config.MultiplayerClient)
                }
                else {
                    openPage("multiplayer.html")
                }
                break;
        }
    })
    datahandler.getBling().then(function (v) {
        this.document.getElementById("coincounter").innerText = "You have " + v + " bling."
    })
    this.document.getElementById("shop").addEventListener("click",function () {
        openPage("shop.html")
    })
})