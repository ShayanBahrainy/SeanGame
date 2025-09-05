
import { createServer } from 'node:https'

import {createSecureContext} from 'node:tls'

import { readFileSync } from 'node:fs'


const clientHTML = readFileSync('index.html')

const clientJS = readFileSync('multiplayer.js')

const Favicon = readFileSync("icon-128.png")

const binaryJS = readFileSync('binary.js')

const clientserver = function (req, res) {
    let headers = {}
    switch (req.url){
        case '/multiplayer.js':
            headers["Content-Type"] = "text/javascript"
            res.writeHead(200, headers)
            res.end(clientJS)
            break;
        case '/favicon.ico':
            headers["Content-Type"] = "image/png"
            res.writeHead(200, headers)
            res.end(Favicon)
            break;
        case '/binary.js':
            headers["Content-Type"] = "text/javascript"
            res.writeHead(200, headers)
            res.end(binaryJS)
            break;
        default:
            headers["Content-Type"] = "text/html"
            res.writeHead(200, headers)
            res.end(clientHTML)
            break;
    }
}
export const ClientServer = clientserver