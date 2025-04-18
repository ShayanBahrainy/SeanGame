# Sean's Game
Welcome to the repository for Sean's Game. Feel free to open issues, and pull requests. I have recently hopped back in to work on it, and I brought in my expert team to work on this. 
## Chrome Extension
To load this as a chrome extension, go to chrome://settings, and toggle Developer Mode to on, and click *Load Unpacked*, then select the folder containing the code. 
The extension has been built from the start to comply with Manifest V3.
## Multiplayer Server
The server can be run via NodeJs.
## Technical challenges
I built the whole engine up from scratch using nothing but the default HTML5 Canvas, and Javascript. It's object oriented, and is driven by the *Renderer* class, or its counterpart *Game* on the server. 

The multiplayer client is very dumb, essentially it's just a video feed, but it sends keystrokes to the server. I made this design choice because I liked how the code was way simpler if all the game logic could be changed on the server, with minimal changes on the client necessary if at all.

I create *connections-tester.html* to help me test how the server would operate under different loads, this is because I wouldn't be able to test multiplayer features in an actual multiplayer environment until I released an update. This didn't do much for gameplay testing, but it helped me optimize the server to allow many people online at once.
## Contributing
If you are considering contributing, I would love it if you could make the server safer, by stopping it from trusting packets recieved by default. Currently, if you send any malformed JSON the server will crash. This should be an easy fix but I never got around to it. 

Similarily, having some system for keeping track of the timing of the packets from the client would be great. Right now, the server just trusts the client to send keypress packets at the right time. This could be exploited by someone maliciously, but the game has never grown to the point where that would become an issue. 

I'll try to review pull requests/issues in a timely manner.
