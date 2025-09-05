class spawn {
    constructor(x, y, renderer) {
        this.renderparts = [
            {shape:"rectangle",x: x - 50, y: y - 60, height:60, width:5,fillStyle:"rgb(255,0,255)", priority:100},
            {shape:"rectangle",x: x - 35, y: y - 60, height:60, width:5, fillStyle:"rgb(255,0,255)",priority:100},
            {shape:"rectangle",x: x - 20, y: y - 60, height: 60, width:5, fillStyle:"rgb(255,0,255)",priority:100},
            {shape:"rectangle",x: x - 5, y: y - 60, height: 60, width:5, fillStyle:"rgb(255,0,255)",priority:100},
            {shape:"rectangle",x: x + 10, y: y - 60, height: 60, width:5, fillStyle:"rgb(255,0,255)",priority:100},
            {shape:"rectangle",x: x - 60, y: y - 60, height:5, width:90, fillStyle:"rgb(255,0,255)",priority:100},
            {shape:"rectangle",x: x - 60, y: y, height:5, width:90, fillStyle:"rgb(255,0,255)",priority:100}
        ]
        this.shape = null
        this.x = x
        this.y = y
        this.centerx = x - 20
        this.centery = y - 30
        this.priority = 0
        this.pvelocity = [0, 0]
        renderer.addObject(this)
    }
    update() {

    }
    collision() {

    }
}
export const Spawn = spawn