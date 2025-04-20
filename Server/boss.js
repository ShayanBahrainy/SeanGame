import { Game } from './server.js'
import { Bullet } from './player.js'

class abhinavsquared {
    constructor(X,Y, renderer) {
        this.x = X
        this.y = Y
        this.priority = 100
        this.shape = "polygon"
        this.vertexes = 6
        this.apothem = 20
        this.fillStyle = "rgb(255,0,0)"
        this.direction = 1
        this.health = (1250 * renderer.clients.length) + 1000
        this.maxhealth = (1250 * renderer.clients.length) + 1000
        this.text = "Nivek the Sinner"
        this.renderparts = [
            // Right Gun
            {x: this.x, y: this.y + this.apothem, width: this.apothem, height: this.apothem / 5, shape: "rectangle", fillStyle: "rgb(51, 255, 0)", priority: 101},
            {x: this.x, y: this.y + this.apothem, width: this.apothem / 5, height: this.apothem / 2, shape: "rectangle", fillStyle: "rgb(51, 255, 0)", priority: 101},

            // Left Gun
            {x: (this.x - this.apothem * 2) + (this.apothem / 5), y: this.y + this.apothem, width: this.apothem, height: this.apothem / 5, shape: "rectangle", fillStyle: "rgb(51, 255, 0)", priority: 101},
            {x: this.x - this.apothem, y: this.y + this.apothem, width: this.apothem / 5, height: this.apothem / 2, shape: "rectangle", fillStyle: "rgb(51, 255, 0)", priority: 101}
            
            //TODO: give sunglasses
        ]
        this.renderer = renderer
        this.enemyspawntime = Game.FPS * .5
        this.spawntimer = this.enemyspawntime
        renderer.addObject(this)
    }

    update() {
        this.x += 2 * this.direction
        if (this.x >= Game.width || this.x <= 0) {
            this.direction *= -1
        }
        this.y = Game.height/2 + (Math.sin(1/100 * this.x) + Math.cos(1/40 * this.x)) * 100
        let bluecomponent = 255 - (this.health/this.maxhealth) * 255
        this.fillStyle = `rgb(255,${bluecomponent},0)`
        this.text = `Nivek the Sinister (${this.health}/${this.maxhealth})`
        if (this.spawntimer > 0) {
            this.spawntimer -= 1
        }
        else {
            this.spawntimer = this.enemyspawntime
            new bossobstacle(this.renderer, this.x, this.y)
        }

        this.renderparts[0].x = this.x + this.apothem
        this.renderparts[0].y = this.y

        this.renderparts[1].x = this.x + this.apothem
        this.renderparts[1].y = this.y

        this.renderparts[2].x = (this.x - this.apothem * 2) - (this.apothem / 5)
        this.renderparts[2].y = this.y

        this.renderparts[3].x = this.x - (this.apothem + ((this.apothem * 2) / 5))
        this.renderparts[3].y = this.y
    }

    collision (self, collidee) {

    }

}
class bossobstacle {
    constructor(renderer, x, y) {
        this.enemies = ["player"]
        this.renderer = renderer
        this.shape = "polygon"
        this.apothem = 15
        this.vertexes = 5
        this.x = x
        this.sidedirection = 0
        this.updirection = 0
        this.y = y
        this.priority = 0
        this.fillStyle = "rgb(255,127,0)"
        this.speed = .4
        this.health = 50
        this.shoottime = Game.FPS/2
        this.shoottimer = this.shoottime
        this.deathtime = Game.FPS * 1
        this.deathtimer = this.deathtime
        renderer.addObject(this)
    }
    getRandomTarget () {
        if (Object.keys(this.renderer.playerobjects).length < 1) {
            return null
        }
        let playerkeys = Object.keys(this.renderer.playerobjects)
        let key = playerkeys[Math.floor(Math.random() * playerkeys.length)]
        let playerobject = this.renderer.playerobjects[key]
        return playerobject
    }
    update(self) {
        self.deathtimer -= 1
        if (self.shoottimer > 0) {
            self.shoottimer -= 1
            return
        }
        let target = self.getRandomTarget()
        if (target) {
            let xrate = target.x - self.x
            let yrate = target.y - self.y
            new Bullet(5, self.x, self.y, xrate/20, yrate/20, self, self.renderer, ["player"], 50)
            self.shoottimer = self.shoottime
        }
        if (self.health <= 0) {
            self.destruct()
        }
        if (self.deathtimer <= 0) {
            self.destruct()
        }
    }
    collision (self,object){
    }
    destruct() {
        Game.instance.removeObject(Game.instance, this)
    }
}
export const AbhinavSquared = abhinavsquared
export const BossObstacle = bossobstacle
