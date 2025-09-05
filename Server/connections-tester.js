/*
Packet type key
0 = Frame
1 = Bling
2 = Win
3 = Kick
4 = Reconnect
5 = Equip
6 = Play
*/

const EQUIPMENT_TO_IDS = {
    "WhiteHat": 0,
    "GreenHat": 1,
    "BlueHat": 2,
    "BeaconHat": 3,
    "PurpleHat": 4,
    "RainbowHat": 5
}

const IDS_TO_EQUIPMENT = {
    0: "WhiteHat",
    1: "GreenHat",
    2: "BlueHat",
    3: "BeaconHat",
    4: "PurpleHat",
    5: "RainbowHat"
}
class binaryencoder {
    static processFillStyle(fillStyle) {
        if (fillStyle.indexOf("rgb(") == -1) {
            console.error("fillStyles must be formatted as rgb(r, g, b)!")
        }
        return fillStyle.replace("rgb(", "").replace(")", "").split(",")

    }

    static createFramePacket(objects) {
        /*
        Type: 0 (uint8) (1 byte)
        Objects: 1 uint16 (2 bytes)
        ...(Objects here)
        */

        /* Prototype: Rectangle
        Type: 0 (uint8) (1 byte)
        X: int16 (2 bytes)
        Y: int16 (2 bytes)
        Red: uint8 (1 byte)
        Green: uint8 (1 byte)
        Blue: uint8 (1 byte)
        Width: uint16 (2 bytes)
        Height: uint16 (2 bytes)
        Total: 12 bytes */

        /* Prototype: Circle
        Type: 1 (uint8) (1 byte)
        X: int16 (2 bytes)
        Y: int16 (2 bytes)
        Red: uint8 (1 byte)
        Green: uint8 (1 byte)
        Blue: uint8 (1 byte)
        Radius: uint16 (2 bytes)
        Angle: uint16 (2 bytes)
        Total: 14 bytes */

        /* Prototype: Polygon
        Type: 2 (uint8) (1 byte)
        X: int16 (2 bytes)
        Y: int16 (2 bytes)
        Red: uint8 (1 byte)
        Green: uint8 (1 byte)
        Blue: uint8 (1 byte)
        Apothem: uint16 (2 bytes)
        Rotation: uint16 (2 bytes)
        Vertexes: uint8 (1 byte)
        Total: 13 bytes */

        /*Prototype: Text
        Type: 3 (uint8) (1 byte)
        X: int16 (2 bytes)
        Y: int16 (2 bytes)
        TextSize: uint16 (2 bytes)
        (TextData)
        Minimum: 7 bytes*/

        objects = objects.filter((v) => v != null)
        objects = objects.filter((v) => v.type ? true : false)

        let size = 0
        for (let object of objects) {
            if (object.type == "rectangle") {
                size += 12
            }
            else if (object.type == "circle") {
                size += 14
            }
            else if (object.type == "polygon") {
                size += 13
            }
            else if (object.type == "text") {
                size += 7 + new TextEncoder().encode(object.text).length
            }
            else {
                console.log(object)
            }
        }

        let BinaryPacket = new ArrayBuffer(size + 3)
        let dv = new DataView(BinaryPacket)
        let currentAddress = 0

        dv.setUint8(currentAddress, 0) //0 for frame packet
        currentAddress += 1

        dv.setUint16(currentAddress, objects.length)
        currentAddress += 2

        for (let object of objects) {
            if (object.type == "rectangle") {
                //Set type (0 for rectangle)
                dv.setUint8(currentAddress, 0)
                currentAddress += 1

                //Set position
                dv.setInt16(currentAddress, object.x)
                currentAddress += 2
                dv.setInt16(currentAddress, object.y)
                currentAddress += 2

                //Set color
                let rgb = binaryencoder.processFillStyle(object.fillStyle)
                dv.setUint8(currentAddress, rgb[0])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[1])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[2])
                currentAddress += 1

                //Set width + height
                dv.setUint16(currentAddress, object.width)
                currentAddress += 2
                dv.setUint16(currentAddress, object.height)
                currentAddress += 2
            }

            if (object.type == "circle") {
                //Type of circle is 1
                dv.setUint8(currentAddress, 1)
                currentAddress += 1

                //Set position
                dv.setInt16(currentAddress, object.x)
                currentAddress += 2
                dv.setInt16(currentAddress, object.y)
                currentAddress += 2

                //Set color
                let rgb = binaryencoder.processFillStyle(object.fillStyle)
                dv.setUint8(currentAddress, rgb[0])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[1])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[2])
                currentAddress += 1

                //Radius
                dv.setUint16(currentAddress, object.radius)
                currentAddress += 2

                //Angle
                dv.setUint16(currentAddress, object.angle ? object.angle : 360)
                currentAddress += 2
            }

            if (object.type == "polygon") {
                //Type of polygon is 2
                dv.setUint8(currentAddress, 2)
                currentAddress += 1

                //Set position
                dv.setInt16(currentAddress, object.x)
                currentAddress += 2
                dv.setInt16(currentAddress, object.y)
                currentAddress += 2


                //Set color
                let rgb = binaryencoder.processFillStyle(object.fillStyle)
                dv.setUint8(currentAddress, rgb[0])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[1])
                currentAddress += 1
                dv.setUint8(currentAddress, rgb[2])
                currentAddress += 1


                //Apothem
                dv.setUint16(currentAddress, object.apothem)
                currentAddress += 2

                //Angle
                dv.setUint16(currentAddress, object.rotation ? object.rotation : 0)
                currentAddress += 2

                //Vertexes
                dv.setUint8(currentAddress, object.vertexes)
                currentAddress += 1
            }
            if (object.type == "text") {
                //Type of text is 3
                dv.setUint8(currentAddress, 3)
                currentAddress += 1

                //Position
                dv.setInt16(currentAddress, object.x)
                currentAddress += 2
                dv.setInt16(currentAddress, object.y)
                currentAddress += 2

                const bytes = new TextEncoder().encode(object.text)

                //Text size
                dv.setUint16(currentAddress, bytes.length)
                currentAddress += 2


                //Char data
                for (let i = 0; i < bytes.length; ++i) {
                    dv.setUint8(currentAddress, bytes[i])
                    currentAddress += 1
                }
            }
        }
        if (currentAddress !== BinaryPacket.byteLength) {
            console.warn("Packet size mismatch! Wrote", currentAddress, "bytes, but allocated", BinaryPacket.byteLength);
        }
        return BinaryPacket
    }

    static createBlingPacket(amount) {
        /*
        Type: 1 (uint8) (1 byte)
        Amount: 1 int16 (2 bytes)
        Total: 3 bytes
        */

        let BinaryPacket = new ArrayBuffer(3)
        let dv = new DataView(BinaryPacket)
        let currentAddress = 0

        dv.setUint8(currentAddress, 1)
        currentAddress += 1
        dv.setInt16(currentAddress, amount)
        currentAddress += 2
        return BinaryPacket
    }

    static createWinPacket(clientCount) {
        /*
        Type: 2 (uint8) (1 byte)
        Player Count: 1 uint8 (1 byte)
        Total: 2 bytes
        */
       let BinaryPacket = new ArrayBuffer(2)
       let dv = new DataView(BinaryPacket)
       let currentAddress = 0

       dv.setUint8(currentAddress, 2)
       currentAddress += 1

       dv.setUint8(currentAddress, clientCount)
       currentAddress += 1

       return BinaryPacket
    }
    static createKickPacket(reason) {
        /*
        Type: 3 (uint8) (1 byte)
        Reason length: (uint16) (2 bytes)
        (Text data)
        Minimum: 3 bytes
        */
       const bytes = new TextEncoder().encode(reason)
       let size = 3 + bytes.length

       let BinaryPacket = new ArrayBuffer(size)
       let dv = new DataView(BinaryPacket)
       let currentAddress = 0

        //Type
       dv.setUint8(currentAddress, 3)
       currentAddress += 1

       //String length
       dv.setUint16(currentAddress, bytes.length)
       currentAddress += 2

       //Char data
       for (let i = 0; i < bytes.length; ++i) {
        dv.setUint8(currentAddress, bytes[i])
        currentAddress += 1
       }

       return BinaryPacket
    }

    static createReconnectPacket(text, time) {
        /*
        Type: 4 (uint8) (1 byte)
        Time: (uint16) (2 bytes)
        Text length: (uint16) (2 bytes)
        (Text data)
        Minimum: 5 bytes
        */
       let size = 5 + new TextEncoder().encode(text).length

       let BinaryPacket = new ArrayBuffer(size)
       let dv = new DataView(BinaryPacket)
       let currentAddress = 0

       dv.setUint8(currentAddress, 4)
       currentAddress += 1

       dv.setUint16(currentAddress, time)
       currentAddress += 2

       const bytes = new TextEncoder().encode(text)
       dv.setUint16(currentAddress, bytes.length)
       currentAddress += 2

       //Char data
       for (let i = 0; i < bytes.length; ++i) {
        dv.setUint8(currentAddress, bytes[i])
        currentAddress += 1
       }

       return BinaryPacket
    }
    static createEquipPacket(hat) {
        /*
        Type: 5 (uint8) (1 byte)
        Item Type: (uint8) (1 byte)
        Total: 2 bytes
        */

        let BinaryPacket = new ArrayBuffer(2)
        let dv = new DataView(BinaryPacket)

        let currentAddress = 0

        dv.setUint8(currentAddress, 5)
        currentAddress += 1

        if (EQUIPMENT_TO_IDS[hat] == undefined) {
            console.log("WARNING: Unknown Equipment String: " + hat)
        }

        dv.setUint8(currentAddress, EQUIPMENT_TO_IDS[hat])
        currentAddress += 1

        return BinaryPacket
    }
    static createPlayPacket(mousestate, mousex, mousey, keys) {
        /*
        Type: 6 (uint8) (1 byte)
        Key array length: (uint8) (1 byte)
        (Key data)
        MouseX: (int16) (2 bytes)
        MouseY: (int16) (2 bytes)
        Mouse state: 1 or 0 (uint8) (1 byte)
        Minimum: 7 bytes
        */
       let size = 7 + keys.length

       let BinaryPacket = new ArrayBuffer(size)
       let dv = new DataView(BinaryPacket)

       let currentAddress = 0

       dv.setUint8(currentAddress, 6)
       currentAddress += 1

       dv.setUint8(currentAddress, keys.length)
       currentAddress += 1

       for (let i = 0; i < keys.length; ++i) {
        dv.setUint8(currentAddress, keys[i].charCodeAt(0))
        currentAddress += 1
       }

       dv.setInt16(currentAddress, mousex)
       currentAddress += 2

       dv.setInt16(currentAddress, mousey)
       currentAddress += 2

       dv.setUint8(currentAddress, mousestate ? 1 : 0) //0 is false, true is anything else
       currentAddress += 1

       return BinaryPacket

    }
    static encodePacket(type, ...data) {
        if (type == "frame") {
            return this.createFramePacket(...data)
        }
        if (type == "bling") {
            return this.createBlingPacket(...data)
        }
        if (type == "win") {
            return this.createWinPacket(...data)
        }
        if (type == "kick") {
            return this.createKickPacket(...data)
        }
        if (type == "Equip") {
            return this.createEquipPacket(...data)
        }
        if (type == "Play") {
            return this.createPlayPacket(...data)
        }
    }
}
class binarydecoder {

    static decodeFrame(dv) {
        let framePacket = {}
        framePacket.type = "frame"
        framePacket.data = []

        let address = 1 //first byte is packet type

        const OBJECT_COUNT = dv.getUint16(address)
        address += 2

        for (let i = 0; i < OBJECT_COUNT; i++) {
            let renderObject = {}
            let type = dv.getUint8(address)
            address += 1

            renderObject.x = dv.getInt16(address)
            address += 2
            renderObject.y = dv.getInt16(address)
            address += 2

            if (type != 3) {
                let red = dv.getUint8(address)
                address += 1

                let green = dv.getUint8(address)
                address += 1

                let blue = dv.getUint8(address)
                address += 1

                renderObject.fillStyle = `rgb(${red}, ${green}, ${blue})`
            }

            switch(type) {
                case 0:
                    renderObject.type = "rectangle"

                    renderObject.width = dv.getUint16(address)
                    address += 2

                    renderObject.height = dv.getUint16(address)
                    address += 2

                    break
                case 1:
                    renderObject.type = "circle"

                    renderObject.radius = dv.getUint16(address)
                    address += 2

                    renderObject.angle = dv.getUint16(address)
                    address += 2

                    break
                case 2:
                    renderObject.type = "polygon"

                    renderObject.apothem = dv.getUint16(address)
                    address += 2

                    renderObject.rotation = dv.getUint16(address)
                    address += 2

                    renderObject.vertexes = dv.getUint8(address)
                    address += 1

                    break
                case 3:
                    renderObject.type = "text"

                    let length = dv.getUint16(address)
                    address += 2

                    let StringArray = new Uint8Array(length)

                    for (let i = 0; i < length; i++) {
                        StringArray[i] = dv.getUint8(address)
                        address += 1
                    }

                    renderObject.text = new TextDecoder().decode(StringArray)

                    break;
            }
            framePacket.data.push(renderObject)
        }
        return framePacket
    }
    static decodeBling(dv) {
        let blingPacket = {}

        let currentAddress = 1

        blingPacket.type = "bling"

        blingPacket.amount = dv.getInt16(currentAddress)
        currentAddress += 2

        return blingPacket

    }

    static decodeWin(dv) {
        let winPacket = {}

        let currentAddress = 1

        winPacket.type = "win"

        winPacket.players = dv.getUint8(currentAddress)
        currentAddress += 1

        return winPacket
    }

    static decodeKick(dv) {
        let kickPacket = {}

        let currentAddress = 1

        kickPacket.type = "kick"

        let reasonLength = dv.getUint16(currentAddress)
        currentAddress += 2

        let StringArray = new Uint8Array(reasonLength)

        for (let i = 0; i < reasonLength; ++i) {
            StringArray[i] = dv.getUint8(currentAddress)
            currentAddress += 1
        }

        kickPacket.reason = new TextDecoder().decode(StringArray)

        return kickPacket
    }
    static decodeReconnect(dv) {
        let reconnectPacket = {}
        reconnectPacket.type = "reconnect"

        let currentAddress = 1

        let time = dv.getUint16(currentAddress)
        currentAddress += 2

        let reasonSize = dv.getUint16(currentAddress)
        currentAddress += 2

        let StringArray = new Uint8Array(reasonSize)

        for (let i = 0; i < reasonSize; ++i) {
            StringArray[i] = dv.getUint8(currentAddress)
            currentAddress += 1
        }

        reconnectPacket.text = new TextDecoder().decode(StringArray)

        return reconnectPacket
    }

    static decodeEquip(dv) {
        let equipPacket = {}

        let currentAddress = 1

        equipPacket.Type = "Equip" //Client capitalizes both Type and the type

        equipPacket.Hat = IDS_TO_EQUIPMENT[dv.getUint8(currentAddress)]
        currentAddress += 1

        return equipPacket

    }

    static decodePlay(dv) {
        let playPacket = {}

        playPacket.Type = "Play"

        let currentAddress = 1

        //Pressed keys only support ascii for simplicity
        let keyCount = dv.getUint8(currentAddress)
        currentAddress += 1

        playPacket.Keys = []

        for (let i = 0; i < keyCount; ++i) {
            playPacket.Keys.push(String.fromCharCode(dv.getUint8(currentAddress)))
            currentAddress += 1
        }

        let mousex = dv.getInt16(currentAddress)
        currentAddress += 2

        let mousey = dv.getInt16(currentAddress)
        currentAddress += 2

        playPacket["MousePos"] = {}
        playPacket["MousePos"]["X"] = mousex
        playPacket["MousePos"]["Y"] = mousey

        playPacket.MouseState = dv.getUint8(currentAddress) > 0
        currentAddress += 1

        return playPacket
    }
    static decodePacket(packet) {
        let dv = new DataView(packet)

        let type = dv.getUint8(0)
        try {
            switch(type) {
                case 0:
                    return this.decodeFrame(dv)
                case 1:
                    return this.decodeBling(dv)
                case 2:
                    return this.decodeWin(dv)
                case 3:
                    return this.decodeKick(dv)
                case 4:
                    return this.decodeReconnect(dv)
                case 5:
                    return this.decodeEquip(dv)
                case 6:
                    return this.decodePlay(dv)
            }
        }
        catch (decodeerror){
            console.log("Invalid binary! Sent from " + type < 5 ? "server" : "client")
        }
    }
}

let connections = []
window.addEventListener("load", function () {
    document.getElementById("add").addEventListener("click", function () {
        let server = document.getElementById("server").value
        let quantity = document.getElementById("quantity").value
        let i = 0
        while (i < quantity) {
            connections.push(new WebSocket(server))
            i++
        }
    })
    document.getElementById("clear").addEventListener("click", function () {
        for (index in connections) {
            let connection = connections[index]
            connection.close()
        }
    })
})
function updateConnections() {
    let PotentialKeys = ["W","A","S","D","F"]
    let alive = 0
    for (index in connections) {
        let connection = connections[index]
        if (connection.readyState == 1) {
            let key = []
            let x = 0
            let y = 0
            key = PotentialKeys[Math.floor(Math.random() * PotentialKeys.length)]
            x = Math.random() * 1000 * (Math.random() > .5 ? -1 : 1)
            y = Math.random() * 1000 * (Math.random() > .5 ? -1 : 1)
            connection.send(binaryencoder.encodePacket("Play", true, x, y, [key]))
            //connection.send(`{"Keys":["W","A"],"MousePos":{"X":${x},"Y":${y}},"MouseState":true}`)
            alive += 1
        }
        if (connection.readyState == 2 || connection.readyState == 3) {
            delete connections[index]
        }
    }
    document.getElementById("connections").innerText = "Connections: " + alive
}
setInterval(updateConnections, 1000/60)