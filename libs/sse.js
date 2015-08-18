"use strict";
var http = require('http');

class ServerSendEvent {
    constructor(response, option) {
        if (response instanceof http.OutgoingMessage) {
            this.res = response;
            var option = option || {};
            var padding = option.padding || true;
            var heartbeat = option.heartbeat || false;
            this.events = {};
            this.id = 0;
            this.res.writeHead(200, {
                "Content-Type": "text/event-stream",
                "Cache-Control": "no-cache",
                "Connection": "keep-alive"
            });

            if (padding) {
                this.res.write(":" + Array(2049).join(" ") + "\n"); // 2kB
            }
            this.res.write("retry: " + (option.retry || 3000) + '\n');

            if (heartbeat) {
                setInterval(function () {
                    this.res.write("data: \n\n");
                }.bind(this), 10000)
            }

        } else {
            throw Error("Not a http response object")
        }
    }

    send(data) {
        if (typeof data === 'string' || typeof data === 'number') {
            this.res.write('data: ' + data + '\n\n');
        } else if (typeof data === 'object') {
            this.res.write('data: ' + JSON.stringify(data) + '\n\n');
        } else {
            throw Error('Invalid data');
        }
    }

    sendInterval(name, fn, time) {
        if (typeof fn === 'function') {
            if (this.events[name]) {
                throw  Error('Event already existed');
            } else {
                this.events[name] = [];
            }
            this.events[name] = setInterval(fn, time || 1000);
        }
    }

    removeEvent(name, time) {
        var self = this;
        if (time) {
            setTimeout(function () {
                self.removeEvent(name);
            }, time)
        } else {
            if (this.events[name]) {
                clearInterval(this.events[name]);
            } else {
                for (var key in this.event) {
                    if (this.event.hasOwnProperty(key) && !this.events[name].length) {
                        clearInterval(this.events[key])
                    }
                }
            }
        }
    }

    sendEvent(name, data, time) {
        var self = this;
        if (typeof name === 'string') {
            if (time) {
                this.events[name] = setInterval(function () {
                    self.sendEvent(name, data)
                }, time);
            } else {
                this.res.write('id: ' + ++this.id + '\n');
                this.res.write('event: ' + name + '\n');
                if (typeof data === 'string' || typeof data === 'number') {
                    this.res.write('data: ' + data + '\n\n');
                } else if (typeof data === 'object') {
                    this.res.write('data: ' + JSON.stringify(data) + '\n\n');
                } else if (typeof data === 'function') {
                    this.res.write('data: ' + JSON.stringify(data()) + '\n\n');
                } else {
                    throw Error('Invalid data');
                }
            }
        } else {
            throw Error('Invalid parameter: name');
        }
    }

    disconnect(fn) {
        if (typeof fn === 'function') {
            this.res.on('close', fn)
        } else {
            throw Error('Parameter must be a function')
        }

    }
}

module.exports = ServerSendEvent;