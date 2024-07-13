import {PlayerText} from './text.js'
class player {
    constructor(height, width, renderer, remoteAddress) {
        this.height = height;
        this.width = width;
        this.remoteAddress = remoteAddress
        this.sean = null
        this.x = renderer.width/2;
        this.sidedirection = 0
        this.updirection = 0
        this.y = renderer.height/2;
        this.reloadtime = 60
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
        this.renderer = renderer
        this.playeraim = new playeraim(this,3,10,renderer,remoteAddress)
        renderer.addObject(this)
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
        const XBorderOne = 0
        const XBorderTwo = XBorderOne + this.renderer.width
        const YBorderOne = 0
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

        new bullet(5, CenterX, CenterY, X/10, Y/10, this, this.renderer, ["obstacle","boss","abhinav"],50)
    }
    handleInput(data) {
        this.playeraim.handleInput(data)
        let keys = data.Keys
        if (data.MouseState) {
            this.fireBullet()
        }
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
        let remoteAddress = this.remoteAddress
        this.playeraim.destruct()
        let playertext = new PlayerText(this.renderer, "You died!", remoteAddress)
        let self = this
        setTimeout(function () {
            playertext.destruct()
            let name = self.renderer.playerobjects[remoteAddress].text
            self.renderer.clients[name].close()
        }, 1000)
    }
    distance(ObjectOne,ObjectTwo) {
        return Math.sqrt(Math.pow(ObjectOne.x - ObjectTwo.x,2) + Math.pow(ObjectOne.y - ObjectTwo.y,2))
    }
}
class bullet {
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
class playeraim {
    constructor(player, radius, distance, renderer, remoteAddress){
        this.radius = radius
        this.renderer = renderer
        this.remoteAddress = remoteAddress
        this.shape = "circle"
        this.fillStyle = "rgb(255,0,0)"
        this.priority = 0
        this.angle = 0
        this.distance = distance
        this.player = player
        this.x = 0
        this.y = 0
        this.renderer = renderer
        renderer.addPlayerObject(remoteAddress, this)
    }
    handleInput(data) {
        let MousePos = data["MousePos"]
        this.x = MousePos.X
        this.y = MousePos.Y
    }
    update() {

    }
    collision () {

    }
    destruct() {
        this.renderer.removePlayerObject(this.remoteAddress, this)
    }

}

export const Player = player
export const PlayerAim = playeraim
export const Bullet = bullet