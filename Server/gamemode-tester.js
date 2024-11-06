import { Game } from "./server.js"
const sample = 100000000
let v = 0
for (let i = 0; i < sample; i++) {
    v += Game.selectGameMode(6)
}
console.log(v/sample)