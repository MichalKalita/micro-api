Gateway can works with
- Network TCP/UDP and enabled ports
- Local sockets
- Internal in program only

Functions
---------
- listen on some port or socket
- api request

API
---
var GW = new Gateway();
GW.listen({port, socket});
GW.request({data});