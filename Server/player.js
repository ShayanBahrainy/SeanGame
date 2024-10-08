import {PlayerText} from './text.js'
import { Game } from './server.js';
class player {
    static KillStreakIncrement = 2
    constructor(height, width, renderer, remoteAddress, name) {
        this.height = height;
        this.width = width;
        this.remoteAddress = remoteAddress
        this.sean = null
        this.x = Game.width/2;
        this.sidedirection = 0
        this.updirection = 0
        this.y = Game.height/2;
        this.reloadtime = Game.instance.fps / 2
        this.timer = 0
        this.priority = 10
        this.fillStyle = "rgb(0,0,255)"
        this.maxhealth = 255
        this.health = this.maxhealth
        this.speed = 1.5
        this.healtime = 10 * Game.instance.fps
        this.heal = this.healtime
        this.score = 0
        this.scoretext = new PlayerText(renderer, "0", remoteAddress, (Game.width/10) * 9, 0, false, false)
        this.nametag = new PlayerText(renderer, name, remoteAddress, (Game.width/10) * 1, 0, false, false)
        this.text = name
        this.shape = "rectangle" 
        this.renderer = renderer
        this.playeraim = new playeraim(this,3,10,renderer,remoteAddress)
        this.streak = 0
        renderer.addObject(this)
    }
    set subtitle(playertext) {
        if (this._subtitle) {
            this._subtitle.destruct()
        }
        this._subtitle = playertext 
    }
    setBulletSpeed(v) {
        this.reloadtime = v
    }
    collision(self,object) {
        return
    }
    update() {
        if (this.health <= 0 && !this.paused) {
            this.pause()
        }
        if (this.paused && this.pausetimer <= 0) {
            this.unpause()
        }
        if (this.paused && this.pausetimer > 0){
            this.pausetimer -= 1
            this.pausetext.text = this.text + " (You) died! Rejoining in " + Math.round(this.pausetimer/Game.instance.fps) + " seconds."
            return
        }
        this.scoretext.text = this.score
        const XBorderOne = 0
        const XBorderTwo = XBorderOne + Game.width
        const YBorderOne = 0
        const YBorderTwo = YBorderOne + Game.height

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
        if (this.score > 125) {
            this.fillStyle = "rgb(255, 215, 0)"
        }
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

        new bullet(5, CenterX, CenterY, X/20, Y/20, this, this.renderer, ["obstacle","boss","abhinav", "player"],50)
    }
    handleInput(data) {
        if (this.paused) {
            return
        }
        this.playeraim.handleInput(data)
        let keys = data.Keys
        if (data.MouseState) {
            this.fireBullet()
        }
        if (keys.indexOf("w") != -1 || keys.indexOf("ArrowUp") != -1 || keys.indexOf("W") != -1) {
            this.y -= this.speed
        }
        if (keys.indexOf("a") != -1 || keys.indexOf("ArrowLeft") != -1 || keys.indexOf("A") != -1) {
            this.x -= this.speed
        }
        if (keys.indexOf("s") != -1|| keys.indexOf("ArrowDown") != -1 || keys.indexOf("S") != -1) {
            this.y += this.speed
        }
        if (keys.indexOf("d") != -1 || keys.indexOf("ArrowRight") != -1 || keys.indexOf("D") != -1) {
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
        this.playeraim.destruct()
        this.renderer.removeObject(this.renderer, this)
        delete this
    }
    getStreakText () {
        if (this.score % player.KillStreakIncrement == 0) {
            return "You have a " + this.score + " kill streak 🔥"
        }
        return ""
    }
    pause() {
        this.fillStyle = "rgb(0,0,0)"
        let seconds = 10
        if (this.lastenemy && this.lastenemy.constructor.name == "player") {
            this.lastenemy.score += 50
            this.lastenemy.streak += 1
            this.lastenemy.subtitle = new PlayerText(this.renderer, "You killed " + this.text + " 💀 " + this.lastenemy.getStreakText(), this.lastenemy.remoteAddress, Game.width/2, 0, 10, false)
        }
        this.pausetext = new PlayerText(this.renderer, this.text + " (You) died! Rejoining in" + seconds + " seconds", this.remoteAddress, Game.width/2, Game.height/2, seconds, true)
        this.paused = true
        this.pausetimer = Game.instance.fps * seconds
    }
    unpause() {
        this.paused = false
        this.pausetext.destruct()
        delete this.pausetext
        delete this.health
        let self = this
        setTimeout(function () {
            self.health = self.maxhealth
        }, 3000)
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
        this.radius += .01 * ((Math.abs(this.xrate) + Math.abs(this.yrate) ) /2)
    } 
    collision(self, collidee) {
        if (!self.targets.includes(collidee.constructor.name)){
            return
        }
        if (self.owner == collidee) {
            return
        }
        if (self.collided.indexOf(collidee) != -1) {
            return
        }
        /* Enemies will add score themselves, to ensure score is not duplicated.
        if (collidee.constructor.name != "Boss") {
            if (!collidee.killvalue) {
                self.owner.score += 1
            }
            else {
                self.owner.score += collidee.killvalue
            }
        } */
        else {
            this.lifetime = 0
        }
        collidee.health -= self.damage
        collidee.lastenemy = self.owner
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