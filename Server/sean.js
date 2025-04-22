import {Bullet} from './player.js'
import { Game } from './server.js';

class sean {
    constructor(radius, renderer) {
        this.radius = radius
        this.x = Game.width / 2;
        this.y = 20;
        this.priority = 10
        this.cooldowntime = 0
        this.cooldowntime = 120
        this.cooldown = this.cooldowntime
        this.fillStyle = "rgb(0,255,255)"
        this.maxhealth = 400
        this.health = this.maxhealth
        this.shape = "circle"
        this.angle = 180
        this.renderer = renderer
        this.score = 0
        this.text = "Sean: " + this.maxhealth + "/" + this.maxhealth
        renderer.addObject(this)
    }
    update(){
        this.text = "Sean: " + this.health + "/" + this.maxhealth
        
        if (this.health <= 0) {
            this.destruct()
        }

        this.cooldown -= 1
        let objects = this.renderer.objects
        let enemies = new Array()

        for (let object in objects){
            object = objects[object]
            if (object.constructor.name == "obstacle" || object.constructor.name == "boss" || object.constructor.name == "abhinav"){
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
            new Bullet(5, this.x, this.y, X/20, Y/20, this, this.renderer, ["obstacle","boss","abhinav"], 50)
        } 
    }
    distance(enemy) {
        return Math.sqrt((enemy.x - this.x)^2 + (enemy.y - this.y)^2)
    }
    collision () {

    }
    destruct() {
        this.renderer.removeObject(this.renderer,this)
    }
}
export const Sean = sean