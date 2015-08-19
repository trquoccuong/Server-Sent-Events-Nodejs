# Server-Sent-Events-Nodejs
Make  Server Sent Events (Node-js)

>Easy to make a server sent events(SSE) with nodejs

## Install

```
$ npm install sse-nodejs
```

## How to use

Use with express:

```javascript
var SSE = require('sse-nodejs');

var express = require('express');

var app = express();

app.get('/', function (req,res) {
   res.sendFile(__dirname+ '/index.html')
});

app.get('/time', function (req,res) {
    var serverSent = SSE(res);

    serverSent.sendEvent('time', function () {
        return new Date
    },1000);
    serverSent.disconnect(function () {
        console.log("disconnected");
    })

    serverSent.removeEvent('time',2000);

});

app.listen(3333);

```

Use in frontend


```html
<!DOCTYPE html>
<html>
<head>

</head>
<body>
HELLO WORLD
<div id="clock"></div>
</body>
<script>
    var ev = new EventSource('/time');
    ev.addEventListener('time', function (result) {
        document.getElementById("clock").innerHTML += result.data
    })
</script>
</html>
```

## Option

```javascript
    var app = sse(res,{option});
```

| Option  | Desciption |
| ------------- | ------------- |
| padding | add padding 2Kb, default true |
| heartbeat | send a "heartbeat" every 10 seconds. https://bugzilla.mozilla.org/show_bug.cgi?id=444328 |
| retry | time to retry, default time 3000 |


## Function

| Function  | Desciption |
| ------------- | ------------- |
| send(data) | send data only (message on server sent events) |
| sendEvent(name,data,timeInterval) | send data after timeInterval if no timeInterval send once (data can be a function)|
| removeEvent(nameEvent, timeout) | remove an event after timeout, if no timeout it will remove immediately |
| disconnect(function) | listen event 'close' |


## How to use

You can use this module with HTTP response object


### The MIT License (MIT)

Copyright (c) <2015> Tran Quoc Cuong

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
