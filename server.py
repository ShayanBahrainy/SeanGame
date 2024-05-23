import socketio
from aiohttp import web

io = socketio.AsyncServer()
app = web.Application()
io.attach(app)
@io.on("*")
def broadcast_message(sid,message):
    message["player"] = sid
    io.emit(message["event"],message,skip_sid=sid)
web.run_app(app)