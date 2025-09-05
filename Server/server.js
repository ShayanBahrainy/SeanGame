import {WebSocketServer} from 'ws'

import {readFile} from 'node:fs/promises'

import {performance} from 'node:perf_hooks'

import {Player} from './player.js'
import {GuardObstacle, Obstacle} from './enemies.js'
import {Spawn} from './spawn-point.js'
import {AbhinavSquared} from './boss.js'
import {ClientServer} from './client-server.js'

import {createServer} from 'http'
import {createServer as createSecureServer} from 'https'


import { readFileSync } from 'node:fs'

import {BinaryEncoder, BinaryDecoder} from './binary.js'

let isProduction = false
let options
if (isProduction) {
    options = {
        key: readFileSync('server.key'),
        cert: readFileSync('server.cert')
    };
}

class game {
    static width = 1280
    static height = 720
    static enemiesperplayer = 4
    static SocketTimeOutPeriod = 300000 
    static MinimumRewardPlayers = 2
    static RewardPerPlayer = 1500
    static FPS = 60
    static TimeBetweenRounds = 20
    static WinQuantity = 250
    static RestartTime = game.FPS * 60 * 30 //Restart every 30 mins
    static GameModes = {
        Normal : 0,
        Boss : 1,
    }
    static ScoreIncreaseTime = game.FPS * 30
  constructor(server, estimatedclientcount) {
    this.objects = new Array()
    this.message = null
    this.frames = -1
    this.fps = game.FPS
    this.clients = []
    this.playerobjects = {}
    this.packettimes = {}
    this.restarttimer = 0
    this.gamemode = game.selectGameMode(estimatedclientcount)
    game.instance = this
    this.intervalId = setInterval(this.tick,Math.round(1000/this.fps),this)
    let self = this
    readFile("names.txt").then(function (V) {
        V = V.toString()
        self.names = V.split("\n")
    })
    this.server = server ? server : game.setupSocketServer()
    this.server.on('connection', this.newClient)
    this.enemies = []
    this.playeronly = {}
    this.enemydestruct = false //Enemies will check, and if flag is true, will self-destruct on next tick
    this.setupGamemode()
  }

  setupGamemode() {
    switch (this.gamemode){
        case game.GameModes.Normal:
            new GuardObstacle(10, 10, this, 0, 0, Game.width, 'x')
            new GuardObstacle(10, 10, this, 0, 0, Game.height, 'y')
            new GuardObstacle(10, 10, this, Game.width, 0, Game.height, 'y')
            new GuardObstacle(10, 10, this, 0, Game.height, Game.width, 'x')
            new Spawn(game.width * 1/10, game.height * 5/10, this)
            new Spawn(game.width * 8/10, game.height * 5/10, this)
            break
        case game.GameModes.Boss:
            let self = this
            setTimeout(
                () => {
                    self.boss = new AbhinavSquared(game.width/2, game.height/2, this)
                }, 5000)
            //this.boss = new AbhinavSquared(game.width/2,game.height/2,this)
            this.teamscore = 50 * this.clients.length + 100
            this.scoreincreasetime = game.ScoreIncreaseTime
            break
    }
  }

static selectGameMode(estimatedclientcount) {
    let random = Math.floor(Math.random() * 100)
    if (random <= 25) {
        console.log("Boss!")
        return game.GameModes.Boss
    }
    console.log("Normal!")
    return game.GameModes.Normal
  }

  static setupSocketServer() {
	let CompressionOptions = {
		 zlibDeflateOptions: {
			 chunkSize: 1024,
			 memlevel: 7,
			 level: 3,
		 },
		 zlibInflateOptions: {
			 chunkSize: 10 * 1024
		 }
	 }
    if (isProduction) { 
        let Server = createSecureServer(options)
        let WSServer = new WebSocketServer({server:Server,backlog:1024, perMessageDeflate:{}, maxPayload: 10 * 1024 * 1024})
        Server.listen(2096, "0.0.0.0")
        return WSServer
    }
    return new WebSocketServer({port:2096,backlog:1024, perMessageDeflate:{}, maxPayload: 10 * 1024 * 1024})
  }
  static withDelay(time, previousmessage, estimatedclientcount) {
    let server = game.setupSocketServer()
    function newClient(socket) {
        let message = 'Game starting in ' + time + ' seconds'
        let text = {type: 'text', text: (previousmessage ? previousmessage + message : message), x: this.width/2, y: this.height/2}
        socket.send(BinaryEncoder.encodePacket("frame", [text]))
    }
    server.on('connection', newClient)
    function sendFrame(socket) {
        let message = 'Game starting in ' + time + ' seconds'
        let text = {type: 'text', text: (previousmessage ? previousmessage + message : message), x: game.width/2, y: game.height/2}
        socket.send(BinaryEncoder.encodePacket("frame", [text]))
    }
    function sendReconnect(socket) {
        socket.send(BinaryEncoder.encodePacket("reconnect", 2.5 * 1000))
    }
    function sendAll() {
        time -= 1
        server.clients.forEach(sendFrame)
        if (time > 0) {
            setTimeout(sendAll, 1000)
        }
        else {
            server.clients.forEach(sendReconnect)
            server.off('connection', newClient)
            return new game(server, estimatedclientcount ? estimatedclientcount : 0)
        }
    }
    setTimeout(sendAll, 1000)
  }

  getRenderables(remoteAddress) {
    let renderObjects = []
    for (let object of (remoteAddress ? this.playeronly[remoteAddress] : this.objects)) {
        if (object.shape != null) {
            renderObjects.push(object)
        }
        if (Object.hasOwn(object, "renderparts")) {
            for (let render_object of object.renderparts) {
                render_object.pvelocity = object.pvelocity
            }
            renderObjects = renderObjects.concat(object.renderparts)
        }
    }
    renderObjects = game.sortObjects(renderObjects)
    let data = []
    let dominant = {dominant: false}
    for (let key in renderObjects) {
        let object = renderObjects[key] 
        if (Object.hasOwn(object, "text")){
            let text = {type: "text", text: object.text, x: object.x, y: object.y + 20, pvelocity: object.pvelocity}
            if (object.isdominant) {
                dominant = text
                dominant.dominant = true
            }
            data.push(text)
        }
        let render = {}
        render.fillStyle = object.fillStyle
        render.x = object.x
        render.y = object.y
        if (!Object.hasOwn(object, "pvelocity")) {
            console.warn("ERROR! (Ey Jon!) " + object.constructor.name + " has no predicted velocity!! (pvelocity)")
            console.warn("If you just got an error with Object, this means a non-class based object is missing its pvelocity, e.g. an object of another objects `renderparts`")
        }
        render.pvelocity = object.pvelocity
        if (object.shape == "rectangle"){
            render.type = "rectangle"
            render.width = object.width
            render.height = object.height
        }
        if (object.shape == "circle"){
            render.type = "circle"
            render.radius = object.radius
            render.angle = object.angle ? object.angle : 360
        }
        if (object.shape == "polygon") {
            render.type = "polygon"
            render.apothem = object.apothem
            render.vertexes = object.vertexes
            if (Object.hasOwn(object, "rotation")) {
                render.rotation = object.rotation
            }
        }
        data.push(render)
        if (dominant.dominant) {
            return [dominant]
        }
    }
    return data
  }
  sendUpdate() {
    let data = this.getRenderables()
    for (let name in this.clients) {
        let socket = this.clients[name]
        let playerdata = this.getRenderables(game.getRemoteAddress(socket))

        let objects = playerdata.concat(data) //Because playerdata comes first, a dominant object there takes precedence

        for (let object of objects) {
            if (object.dominant) {
                objects = [object]
                break
            }
        }

        socket.send(BinaryEncoder.encodePacket("frame", objects))
    }
  }

  sendBling(socket, amount) {
    socket.send(BinaryEncoder.encodePacket("bling", amount))
  }

  sendWin(socket) {
    socket.send(BinaryEncoder.encodePacket("win", this.clients.length))
  }
  sendKick(socket, reason) {
    socket.send(BinaryEncoder.encodePacket("kick", reason))
    socket.close()
  }
  newClient(socket, request) {
    let remoteAddress = game.getRemoteAddress(socket)
    let name = game.instance.generateName()
    game.instance.clients.push(socket)
    game.instance.playeronly[remoteAddress] = []
    game.instance.playerobjects[remoteAddress] = new Player(game.instance, remoteAddress, name)
    game.instance.packettimes[remoteAddress] = new Date().getTime()
    socket.on('close', function() {
        game.instance.playerobjects[remoteAddress].destruct()
        delete game.instance.playerobjects[remoteAddress]
        game.instance.clients.splice(game.instance.clients.indexOf(socket),1)
    });
    socket.on('message', function (data) {
        data = BinaryDecoder.decodePacket(data.buffer.slice(data.byteOffset, data.byteOffset + data.byteLength))
        if (data.Type == "Play") {
            game.instance.handleInput(socket, data)
        }
        if (data.Type == "Equip") {
            game.instance.playerobjects[remoteAddress].equipHat(data.Hat)
        }
    })
  }
  getEnemyCount() {
    let enemycount = 0
    for (let object of this.objects) {
        if (object instanceof Obstacle) {
            enemycount += 1
        }
    }
    return enemycount
  }
  handleEnemyCount(){
    let enemyCount = this.getEnemyCount()
    while (enemyCount < (game.enemiesperplayer * game.instance.clients.length)) {
        enemyCount += 1
        new Obstacle(10, 10, game.instance, Object.values(game.instance.playerobjects)[Object.values(game.instance.playerobjects).length - 1])
    }
    if (enemyCount > (game.enemiesperplayer * game.instance.clients.length)) {
        game.instance.enemydestruct = true
    }
  }
  static getRemoteAddress(socket) {
    return socket._socket.remoteAddress + ':' + socket._socket.remotePort
  }
  handleInput(socket, data) {
    this.playerobjects[game.getRemoteAddress(socket)].handleInput(data)
    this.packettimes[game.getRemoteAddress(socket)] = new Date().getTime()
  }
  generateName() {
    let availablenames = this.names
    for (let name in this.clients) {
      availablenames.splice(availablenames.indexOf(name),1)
    }
    return availablenames[Math.floor(Math.random() * availablenames.length)]
  }
  destruct() {
      clearInterval(this.intervalId)
      this.server.close()
  }
  connectionChecker() {
    let currentTime = new Date().getTime()
    for (let name in this.clients) {
        let socket = this.clients[name]
        if ((currentTime - this.packettimes[game.getRemoteAddress(socket)]) > game.SocketTimeOutPeriod) {
            socket.terminate()
        }
    }
  }
  tick(self) {
    if (!self.perfcount) {
        self.perfcount = 0
    }
    if (!self.perfdata) {
        self.perfdata = 0
    }
    self.restarttimer += 1
    if (self.restarttimer >= game.RestartTime) {
        for (let name in self.clients) {
            self.clients[name].send(BinaryEncoder.encodePacket("reconnect", "Server needs to restart!", .5 * 1000))
        }
        self.server.on('close', function () {
            setTimeout(game.withDelay, 300, game.TimeBetweenRounds, "Server restarted! ", self.clients.length)
        })
        self.shutdownServer(self)
    }
    let start = performance.now()
    if (self.gamemode == Game.GameModes.Normal) {
        self.handleEnemyCount()
    }
    self.collisionChecks(self)
    let renderObjects = game.sortObjects(self.objects)
    for (let key in renderObjects) {
        let object = renderObjects[key] 
        object.update(object)
    }
    for (let remoteAddress in self.playeronly) {
        let objects = self.playeronly[remoteAddress]
        for (let object in objects) {
            object = objects[object]
            object.update(object)
        }
    }
    if (self.gamemode == Game.GameModes.Boss){
        if (self.scoreincreasetime <= 0) {
            self.teamscore += 2 * 25 * self.clients.length
            self.scoreincreasetime = Game.ScoreIncreaseTime
        }
        else {
            self.scoreincreasetime -= 1
        }
        if (self.teamscore <= 0) {
            for (let name in self.clients) {
                self.clients[name].send(BinaryEncoder.encodePacket("reconnect", "Y'all losers. ", .5 * 1000))
            }
            self.server.on('close', function () {
                setTimeout(game.withDelay, 300, game.TimeBetweenRounds, " Y'all losers. ", self.clients.length)
            })
            self.shutdownServer(self)
        }
    }
    let winner = self.isWinner()
    if (winner) {
        if (self.gamemode == Game.GameModes.Normal) {
            for (let name in self.clients) {
                if (self.playerobjects[Game.getRemoteAddress(self.clients[name])] == winner && self.clients.length >= game.MinimumRewardPlayers) {
                    self.sendWin(self.clients[name])
                }
                self.clients[name].send(BinaryEncoder.encodePacket("reconnect", winner.text + " won! ", .5 * 1000))
            }
        }
        if (self.gamemode == Game.GameModes.Boss) {
            for (let name in self.clients) {
                self.sendBling(self.clients[name], 750 * self.clients.length + 1000)
                self.clients[name].send(BinaryEncoder.encodePacket("reconnect", " Y'all won!", .5 * 1000))
            }
        }
        self.server.on('close', function () {
            setTimeout(game.withDelay, 300, game.TimeBetweenRounds, winner.text ? winner.text + " won! " : " Y'all won! ", self.clients.length)
        })
        self.shutdownServer(self)
    }
    self.sendUpdate()
    self.connectionChecker()
    let end = performance.now()
    self.perfdata += 1000/(end-start + 1000/self.fps)
    self.perfcount += 1
    if (self.perfcount > 180) {
        console.log(self.perfdata/self.perfcount + "fps")
        self.perfdata = 0
        self.perfcount = 0
    }
  }
  shutdownServer(self) {
    setTimeout(function (clients) {
        for (let socket of clients) {
            socket.close()
        }
    },100,self.clients)
    if (self.server._server) {
        self.server._server.close()
    }
    self.server.close()
    clearInterval(self.intervalId)
  } 
  isWinner() {
    if (this.gamemode == Game.GameModes.Boss) {
        //For the first five seconds the boss doesn't spawn in to let everyone else spawn in before determining it's health
        if (this.boss) {
            return this.boss.health <= 0
        }
        return false 
    }
    for (let remoteAddress in this.playerobjects) {
        if (this.playerobjects[remoteAddress].score >= game.WinQuantity) {
            return this.playerobjects[remoteAddress]
        }
    }
    return false
  }
  calculateSpatialMap(self) {
    let SpatialMap = []
    for (let object of self.objects){
        let X = Math.floor(object.x/50)
        if (SpatialMap[X] == null) {
            SpatialMap[X] = []
        }
        let Y = Math.floor(object.y/50)
        if (SpatialMap[X][Y] == null) {
            SpatialMap[X][Y] = []
        }
        SpatialMap[X][Y].push(object)
    }
    return SpatialMap
  }
  narrowPhaseChecks(objects) {
    let cewidth 
    let ceheight
    let crwidth
    let crheight
    for (let collidee in objects) {
        collidee = objects[collidee]
        if (collidee.shape == "rectangle"){
        cewidth = collidee.width
        ceheight = collidee.height
        }
        if (collidee.shape == "circle"){
        cewidth = collidee.radius * 2
        ceheight = collidee.radius * 2
        }
        if (collidee.shape == "polygon") {
            cewidth = collidee.apothem * 2
            ceheight = collidee.apothem * 2
        }
        for (let collider in objects) {
            collider = objects[collider]
            if (collidee == collider) {
                continue
            }
            if (collider.shape == "rectangle"){
            crwidth = collider.width
            crheight = collider.height
            }
            if (collider.shape == "circle"){
            crwidth = collider.radius * 2
            crheight = collider.radius * 2 //Radius is already the half "width" so multiply by two
            }
            if (collider.shape == "polygon") {
                crwidth = collider.apothem * 2
                crheight = collider.apothem * 2
            }
            //Implementation of Separating Axis Theorem
            let AverageXCollidee = (collidee.x + collidee.x + cewidth)/2
            let AverageXCollider = (collider.x + collider.x + crwidth)/2
            let AverageYCollidee = (collidee.y + collidee.y + ceheight)/2
            let AverageYCollider = (collider.y + collider.y + crheight)/2

            let HorizontonalLength  = Math.abs(AverageXCollidee - AverageXCollider)
            let VerticalLength = Math.abs(AverageYCollidee - AverageYCollider)

            HorizontonalLength -= (cewidth + crwidth)/2
            VerticalLength -= (ceheight + crheight)/2

            if (HorizontonalLength <= 0 && VerticalLength <= 0) {
                collider.collision(collider,collidee)
            }
        }
    }
  }
  collisionChecks(self) {
    //Our spatial maps are 2d arrays where first dimension is x, second is y, and the values are arrays of objects at that coordinate
    //Spatial Map = [[[Object1], [Object2]], [[Object3], [Object4,Object5]]
    let SpatialMap = self.calculateSpatialMap(self)
    for (let Ys of SpatialMap) {
        if (!Ys) {
            continue
        }
        for (let Y of Ys) {
            self.narrowPhaseChecks(Y)
        }
    }
    /*
    SpatialMap.map(function (Ys) {
        Ys.map(self.narrowPhaseChecks, self)
    }, self)
    */
  }
  FlashMessage(Message, Frames) {
    this.message = Message
    this.frames = Frames
  }
  getCanvas() {
      return this.canvas
  }
  getObjects() {
      return this.objects
  }
  removeObject(self, object){
    var index = self.objects.indexOf(object)
    if (index != -1){
        self.objects.splice(index,1)
    }
  }
  addObject(object){
      this.objects.push(object)
  }
  addPlayerObject(remoteAddress, object){
    this.playeronly[remoteAddress].push(object)
  }
  removePlayerObject(remoteAddress, object) {
    var index = this.playeronly[remoteAddress].indexOf(object)
    if (index != -1){
        this.playeronly[remoteAddress].splice(index, 1)
    }
  }
  static sortObjects(objects) {
      let sorted = []
      for (let object in objects) {
          object = objects[object]
          let priority = object.priority
          let isSlotEmpty = sorted[priority] == null
          while (!isSlotEmpty) {
              priority++;
              isSlotEmpty = sorted[priority] == null
          }
          sorted[priority] = object
      }
      return sorted
  }
}

let httpsServer
let httpServer
if (isProduction) {
    
    httpsServer = createSecureServer(options, ClientServer);
    
    httpServer = createServer((req, res) => {
        res.writeHead(301, { Location: `https://${req.headers.host}${req.url}` });
        res.end("<script>window.location.protocol = 'https://'</script>");
    });
    
    httpServer.listen(80);
    httpsServer.listen(443);
}
else {
    httpServer = createServer(ClientServer)
    httpServer.listen(80)
}

game.withDelay(1)

export const Game = game