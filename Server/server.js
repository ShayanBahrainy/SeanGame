import WebSocketServer from 'ws'
import {TypedJSON} from 'typedjson'

import {readFile} from 'node:fs/promises'

import {Player} from './player.js'
import {Obstacle} from './enemies.js'
import {setTimeout} from 'node:timers/promises';
import { timeStamp } from 'node:console'

class game {
  constructor(fps) {
      this.objects = new Array()
      this.message = null
      this.frames = -1
      this.clients = {}
      this.playerobjects = {}
      game.instance = this
      this.intervalId = setInterval(this.tick,Math.round(1000/fps),this)
      let self = this
      readFile("names.txt").then(function (V) {
        V = V.toString()
        self.names = V.split("\n")
      })
      this.server = new WebSocketServer.Server({
        port: 80
      });
      this.server.on('connection', this.newClient)
      this.width = 400
      this.height = 400
      this.enemies = []
      this.playeronly = {}
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
  sendUpdate() {
    let data = this.getRenderables()
    setTimeout(100, this).then(function (self) {
        for (let name in self.clients) {
            let socket = self.clients[name]
            let playerdata = self.getPlayerRenderables(socket.remoteAddress)
            socket.send(JSON.stringify(playerdata.concat(data)))
        }
    })
  }
  newClient(socket, request) {
    let remoteAddress = this.getRemoteAddress(socket)
    let name = game.instance.generateName()
    game.instance.clients[name] = socket
    game.instance.playeronly[remoteAddress] = []
    game.instance.playerobjects[remoteAddress] = new Player(10, 10, game.instance, remoteAddress)
    game.instance.playerobjects[remoteAddress].text = name
    while (game.instance.enemies.length < 3) {
        game.instance.enemies.push(new Obstacle(10, 10, game.instance, game.instance.playerobjects[remoteAddress]))
    }
    socket.on('close', function() {
        game.instance.playerobjects[remoteAddress].destruct()
        delete game.instance.playerobjects[remoteAddress]
        delete game.instance.clients[socket]
    });
    socket.on('message', function (data) {
        data = JSON.parse(data)
        game.instance.handleInput(socket, data)
    })
  }
  getRemoteAddress(socket) {
    return socket._socket.remoteAddress + ':' + socket._socket.remotePort
  }
  handleInput(socket, data) {
    this.playerobjects[this.getRemoteAddress(socket)].handleInput(data)
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
      self.sendUpdate()
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
        delete self.objects[index]
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
export const Game = game