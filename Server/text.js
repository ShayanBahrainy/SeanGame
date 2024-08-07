class textentity {
    constructor(renderer, text, x, y, isdominant) {
        this.text = text
        this.renderer = renderer
        this.priority = 100
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
    constructor(renderer, text, remoteAddress, x, y, isdominant) {
        this.text = text
        this.renderer = renderer
        this.remoteAddress = remoteAddress
        this.priority = 100
        this.x = x
        this.y = y
        if (isdominant) {
            this.isdominant = true
        }
        renderer.addPlayerObject(remoteAddress,this)
    }
    update() {
        
    }
    collision() {

    }
    destruct() {
        this.renderer.removePlayerObject(this.remoteAddress, this)
    } 
}
export const PlayerText = playertext 
export const TextEntity = textentity