class obstacle{
    constructor(height, width, renderer, target) {
        this.renderer = renderer
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
        this.damagetimer = this.damagetime
        renderer.addObject(this)
    }
    generateX() {
        let X = Math.floor(Math.random() * this.renderer.width)
        while ((this.target.x - 10 < X && X < this.target.x + 10)) {
            X = Math.floor(Math.random() * this.renderer.width);
        }
        return X
    }
    generateY() {
        let Y = Math.floor(Math.random() * this.renderer.height)
        while ((this.target.y - 10 < Y && Y < this.target.y + 10)) {
            Y = Math.floor(Math.random() * this.renderer.height);
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
        }
        if (object.constructor.name == self.target.constructor.name && self.damagetimer < 0 ) {
            object.health -= self.damage
            self.damagetimer = self.damagetime
        }
    }
}
export const Obstacle = obstacle