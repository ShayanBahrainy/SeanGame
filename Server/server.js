import  {WebSocketServer} from 'ws'

import {readFile} from 'node:fs/promises'

import {Player} from './player.js'
import {GuardObstacle, Obstacle} from './enemies.js'
import {Sean} from './sean.js'

import { timeStamp } from 'node:console'

import { ClientServer } from './client-server.js'

import {createServer} from 'http'
import {createServer as createSecureServer} from 'https'


import { readFileSync } from 'node:fs'


let isProduction = true
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
    static enemiesperplayer = 5
  constructor(fps, server) {
      this.objects = new Array()
      this.message = null
      this.frames = -1
      this.fps = fps
      this.clients = []
      this.playerobjects = {}
      this.packettimes = {}
      game.instance = this
      this.intervalId = setInterval(this.tick,Math.round(1000/fps),this)
      let self = this
      readFile("names.txt").then(function (V) {
        V = V.toString()
        self.names = V.split("\n")
      })
      this.server = server ? server : game.setupSocketServer()
      this.server.on('connection', this.newClient)
      this.enemies = []
      this.playeronly = {}
      new GuardObstacle(10, 10, this, 0, 0, Game.width, 'x')
      new GuardObstacle(10, 10, this, 0, 0, Game.height, 'y')
      new GuardObstacle(10, 10, this, Game.width, 0, Game.height, 'y')
      new GuardObstacle(10, 10, this, 0, Game.height, Game.width, 'x')
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
        let WSServer = new WebSocketServer({server:Server,backlog:1024, perMessageDeflate:CompressionOptions})
        Server.listen(2096, "0.0.0.0")
        return WSServer
    }
    return new WebSocketServer({port:2096,backlog:1024, perMessageDeflate:CompressionOptions})
  }
  static withDelay(time, fps, previousmessage) {
    let server = game.setupSocketServer()
    function newClient(socket) {
        let r =  {}
        let message = 'Game starting in ' + time + ' seconds'
        let text = {type: 'text', text: (previousmessage ? previousmessage + message : message), x: this.width/2, y: this.height/2}
        r.type = "frame"
        r.data = [text]
        socket.send(JSON.stringify(r))
    }
    server.on('connection', newClient)
    function sendFrame(socket) {
        let message = 'Game starting in ' + time + ' seconds'
        let text = {type: 'text', text: (previousmessage ? previousmessage + message : message), x: game.width/2, y: game.height/2}
        let r = {}
        r.type = "frame"
        r.data = [text]
        socket.send(JSON.stringify(r))
    }
    function sendReconnect(socket) {
        let r = {}
        r.type = "reconnect"
        r.time = 2.5 * 1000
        socket.send(JSON.stringify(r))
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
            return new game(fps, server)
        }
    }
    setTimeout(sendAll, 1000)
  }

  getRenderables() {
    let renderObjects = game.sortObjects(this.objects)
    let data = []
    for (let key in renderObjects) {
        let object = renderObjects[key] 
        if (Object.hasOwn(object, "text")){
            let text = {type: "text", text: object.text, x: object.x, y: object.y + 20}
            data.push(text)
        }
        let render = {}
        render.fillStyle = object.fillStyle
        render.x = object.x
        render.y = object.y
        if (object.shape == "rectangle"){
            render.type = "rectangle"
            render.width = object.width
            render.height = object.height
        }
        if (object.shape == "circle"){
            render.type = "circle"
            render.radius = object.radius
        }
        if (object.shape == "texture") {
            render.type = "texture"
            render.width = object.width
            render.height = object.height
            render.src = object.texture
        }
        data.push(render)
    }
    return data
  }
  getPlayerRenderables(remoteAddress) {
    let renderObjects = this.playeronly[remoteAddress]
    let data = []
    let dominant  
    for (let key in renderObjects) {
        let object = renderObjects[key] 
        if (Object.hasOwn(object, "text")){
            let text = {type: "text", text: object.text, x: object.x, y: object.y + 20}
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
        if (object.shape == "rectangle"){
            render.type = "rectangle"
            render.width = object.width
            render.height = object.height
        }
        if (object.shape == "circle"){
            render.type = "circle"
            render.radius = object.radius
        }
        if (object.shape == "texture") {
            render.type = "texture"
            render.width = object.width
            render.height = object.height
            render.src = object.texture
        }
        data.push(render)
    }
    if (dominant) {
        return [dominant]
    }
    return data
  }
  sendUpdate() {
    let data = this.getRenderables()
    for (let name in this.clients) {
        let socket = this.clients[name]
        let playerdata = this.getPlayerRenderables(game.getRemoteAddress(socket))
        let request = {
            type : "frame",
            data : playerdata.concat(data)
        }
        for (let key in request.data) {
            let value = request.data[key]
            if (value.dominant) {
                request.data = [value]
                break
            }
        }
        socket.send(JSON.stringify(request))
    }
  }
  sendBling(socket, amount) {
    let request = {
        type : "bling",
        amount : amount
    }
    socket.send(JSON.stringify(request))
  }
  sendKick(socket, reason) {
    let request = {
        type : "kick",
        reason : reason
    }
    socket.send(JSON.stringify(request))
    socket.close()
  }
  newClient(socket, request) {
    let remoteAddress = game.getRemoteAddress(socket)
    let name = game.instance.generateName()
    game.instance.clients.push(socket)
    game.instance.playeronly[remoteAddress] = []
    game.instance.playerobjects[remoteAddress] = new Player(10, 10, game.instance, remoteAddress, name)
    game.instance.packettimes[remoteAddress] = new Date().getTime()
    while (game.instance.enemies.length < game.enemiesperplayer * game.instance.clients.length) {
        game.instance.enemies.push(new Obstacle(10, 10, game.instance, game.instance.playerobjects[remoteAddress]))
    }
    socket.on('close', function() {
        game.instance.playerobjects[remoteAddress].destruct()
        delete game.instance.playerobjects[remoteAddress]
        game.instance.clients.splice(game.instance.clients.indexOf(socket),1)
    });
    socket.on('message', function (data) {
        data = JSON.parse(data)
        game.instance.handleInput(socket, data)
    })
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
        if (currentTime - this.packettimes[game.getRemoteAddress(socket)] > 3000) {
            socket.terminate()
        }
    }
  }
  tick(self) {
      self.collisonChecks(self)
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
      let winner = self.isWinner()
      if (winner) {
        for (let name in self.clients) {
            let r = {}
            r.type = "reconnect"
            r.time = .5 * 1000
            if (self.playerobjects[Game.getRemoteAddress(self.clients[name])] == winner && self.clients.length >= 2) {
                self.sendBling(self.clients[name], 3000)
            }
            self.clients[name].send(JSON.stringify(r))
            self.clients[name].close()
        }
	self.server.on('close', function () {
            game.withDelay(60, 60, winner.text + "won! ")
        })
        self.server.close()
        clearInterval(self.intervalId)
      }
      self.sendUpdate()
      self.connectionChecker()
  }
  isWinner() {
    for (let remoteAddress in this.playerobjects) {
        if (this.playerobjects[remoteAddress].score >= 250) {
            return this.playerobjects[remoteAddress]
        }
    }
    return false
  }
  collisonChecks(self) {
      let cewidth 
      let ceheight
      let crwidth
      let crheight
      for (let collidee in self.objects) {
          collidee = self.objects[collidee]
          if (collidee.shape == "rectangle"){
              cewidth = collidee.width
              ceheight = collidee.height
          }
          if (collidee.shape == "circle"){
              cewidth = collidee.radius * 2
              ceheight = collidee.radius * 2
          }
          for (let collider in self.objects) {
              collider = self.objects[collider]
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
              //Implementation of Separating Axis Theorem
              let AverageXCollidee = (collidee.x + collidee.x + cewidth)/2
              let AverageXCollider = (collider.x + collider.x + crwidth)/2
              let AverageYCollidee = (collidee.y + collidee.y + ceheight)/2
              let AverageYCollider = (collider.y + collider.y + crheight)/2

              let HorizontonalLength  = Math.abs(AverageXCollidee - AverageXCollider)
              let VerticalLength = Math.abs(AverageYCollidee - AverageYCollider)

              HorizontonalLength -= cewidth/2 + crwidth/2
              VerticalLength -= ceheight/2 + crheight/2

              if (HorizontonalLength <= 0 && VerticalLength <= 0) {
                  collider.collision(collider,collidee)
              }
          }
      }
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
    index = self.enemies.indexOf(object)
    if (index != -1) {
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
        delete this.playeronly[remoteAddress][index]
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

game.withDelay(5, 45)

export const Game = game
