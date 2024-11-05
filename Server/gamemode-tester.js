import { Game } from "./server.js"
const sample = 1000000
let v = 0
for (let i = 0; i < sample; i++) {
    v += Game.selectGameMode(2)
}
console.log(v/sample)