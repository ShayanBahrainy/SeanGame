import {Game} from './server.js'
class textentity {
    constructor(renderer, text, x, y, isdominant) {
        this.text = text
        this.renderer = renderer
        this.priority = -100
        this.x = x
        this.y = y
        renderer.addObject(this)
    }
    update() {
        
    }
    collision() {

    }
    destruct() {
        this.renderer.removeObject(this.renderer, this)
    }
}
class playertext {
    constructor(renderer, text, remoteAddress, x, y, seconds, isdominant) {
        this.text = text
        this.renderer = renderer
        this.remoteAddress = remoteAddress
        this.priority = -100
        this.x = x
        this.y = y
        if (seconds) {
            this.timer = Game.instance.fps * seconds
        }
        if (isdominant) {
            this.isdominant = true
        }
        renderer.addPlayerObject(remoteAddress,this)
    }
    update() {
        if (this.timer === false) {
            return
        }
        if (this.timer > 0) {
            this.timer -= 1
            return
        }
        if (this.timer <= 0) {
            this.destruct()
        }
    }
    collision() {

    }
    destruct() {
        this.renderer.removePlayerObject(this.remoteAddress, this)
    } 
}
export const PlayerText = playertext 
export const TextEntity = textentity