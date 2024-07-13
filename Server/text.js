class textentity {
    constructor(renderer, text) {
        this.text = text
        this.renderer = renderer
        this.priority = 100
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
    constructor(renderer, text, remoteAddress) {
        this.text = text
        this.renderer = renderer
        this.remoteAddress = remoteAddress
        this.priority = 100
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