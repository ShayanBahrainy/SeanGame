import {PlayerText} from './text.js'
import { Game } from './server.js'

class player {
    static KillStreakIncrement = 3
    static KillValue = 25
    static StreakPowerUpBulletQuantity = 36
    static DeathTeamScoreSubtraction = 25 //How much to subtract from the team's score when a player dies
    constructor(renderer, remoteAddress, name) {
        this.remoteAddress = remoteAddress
        this.sean = null
        this.x = Game.width/2;
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
        this.renderparts = [
            {shape: "rectangle", x: this.x + 3, y: this.y, height: 5, width: 12.5, fillStyle:"rgb(255,0,255)", priority: 11},
            {shape: "rectangle", x: this.x + 3, y: this.y, height: 12.5, width: 5, fillStyle:"rgb(255,0,255)", priority: 11},

        ]
        this.scoretext = new PlayerText(renderer, "0", remoteAddress, (Game.width/10) * 9, 0, false, false)
        this.nametag = new PlayerText(renderer, name, remoteAddress, (Game.width/10) * 1, 0, false, false)
        this.text = name
        this.shape = "polygon" 
        this.vertexes = 12
        this.apothem = 7
        this.renderer = renderer
        this.playeraim = new playeraim(this,3,10,renderer,remoteAddress)
        this.streak = 0
        this.hat = null
        this.targets = this.renderer.gamemode == Game.GameModes.Normal ? ["obstacle","boss","abhinav", "player"] : ["obstacle","boss","bossobstacle", "abhinavsquared"]
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
        this.renderparts[0].x = this.x + 9
        this.renderparts[0].y = this.y - 5
        this.renderparts[1].x = this.x + 9
        this.renderparts[1].y = this.y - 5

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
        this.scoretext.text = this.renderer.gamemode == Game.GameModes.Normal ? this.score : this.renderer.teamscore
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
    equipHat (hat) {
        if (this.hat) {
            this.hat.destruct()
        }
        this.hat = new Hat(hat, this, this.renderer)
    }
    fireBullet() {
        if (this.timer >= 0) {
            return
        }
        if (this.distance(this,this.playeraim) < 25){
            return
        }
        this.timer = this.reloadtime
        let CenterX = this.x + this.apothem/2
        let CenterY = this.y + this.apothem/2

        let Y = this.playeraim.y - CenterY
        let X = this.playeraim.x - CenterX
        new bullet(10, CenterX + 9, CenterY, X/20, Y/20, this, this.renderer, this.targets,50)
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
        if (this.hat) {
            this.hat.destruct()
        }
        this.renderer.removeObject(this.renderer, this)
        delete this
    }
    getStreakText () {
        if (this.streak % player.KillStreakIncrement == 0) {
            return "You have a " + this.streak + " kill streak 🔥"
        }
        return ""
    }
    celebrateStreak () {
        if (this.streak == player.KillStreakIncrement) {
            this.speed *= 2
            let self = this
            setTimeout(function () {
                self.speed /= 2
            }, 5000)
        }
        if (this.streak == (player.KillStreakIncrement * 2)) {
            let Offset = 360/player.StreakPowerUpBulletQuantity
            let Rotation = 0
            let Radius = 25
            let StartingRotation = 360/player.StreakPowerUpBulletQuantity
            //x = r * sin(rotation), y = r * cos(rotation)
            while (Rotation < 360) {

                let x = Radius * Math.sin((Rotation * Math.PI/180) + StartingRotation) + this.x
                let y = Radius * Math.cos((Rotation * Math.PI/180) + StartingRotation) + this.y

                let magnitude = Math.sqrt((this.x - x)^2 + (this.y - y)^2)
                //Calculate Unit
                new bullet(5, x, y, (this.x - x)/magnitude, (this.y - y)/magnitude, this, this.renderer, ["obstacle","boss","abhinav", "player"], 50)
                Rotation += Offset
            }
        }
    }

    killedMe(enemy) {
        enemy.score += player.KillValue
        enemy.streak += 1
        enemy.subtitle = new PlayerText(this.renderer, "You killed " + this.text + " 💀 " + enemy.getStreakText(), enemy.remoteAddress, Game.width/2, 0, 10, false)
        enemy.celebrateStreak()
    }

    pause() {
        this.fillStyle = "rgb(0,0,0)"
        let seconds = 10
        this.streak = 0
        if (this.lastenemy && this.lastenemy.constructor.name == "player") {
            this.killedMe(this.lastenemy)
        }
        if (this.renderer.gamemode == Game.GameModes.Boss){
            this.renderer.teamscore -= player.DeathTeamScoreSubtraction
        }
        this.pausetext = new PlayerText(this.renderer, this.text + " (You) died! Rejoining in" + seconds + " seconds", this.remoteAddress, Game.width/2, Game.height/2, seconds, true)
        this.paused = true
        let spawns = []
        for (let obj of Game.instance.objects) {
            if (obj.constructor.name == "spawn") {
                spawns.push(obj)
            }
        }
        let spawn = spawns[Math.floor(Math.random() * spawns.length)]
        if (spawn) {
            this.x = spawn.centerx
            this.y = spawn.centery
        }
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
class hat {
    constructor(type, player, renderer){
        this.apothem = 10
        this.shape = "polygon"
        this.vertexes = 3
        this.rotation = 90
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
                this.r = 255, this.b = 255, this.g = 255
                break;
            case ("GreenHat"):
                this.fillStyle = "rgb(0,255,0)"
                this.g = 255
                break;
            case ("BlueHat"):
                this.fillStyle = "rgb(0,0,255)"
                this.b = 255
                break;
            case ("BeaconHat"):
                this.fillStyle = "rgb(0,0,0)"
                break;
            case ("PurpleHat"):
                this.fillStyle = "rgb(255,0,255)"
                this.r = 255
                this.b = 255
                break;
            case ("RainbowHat"):
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
        this.x = this.player.x
        this.y = this.player.y - 10
        this.fillStyle = "rgb(" + this.r + "," + this.g + "," + this.b + ")"
    }
    collision () {

    }
    destruct() {
        this.renderer.removeObject(this.renderer, this)
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
        this.shape = "polygon"
        this.vertexes = 3
        this.apothem = radius
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
export const Hat = hat