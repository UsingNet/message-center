# 消息服务器

### 后台

获取 Token

```
/api/message/agent/token
```

链接 socket

```
import io from 'socket.io-client'
const socket = io('http://ws.dev.usingnet.net/?token={token}');

// 新消息
socket.on('message', function() {
    ...
});

// 通知
socket.on('notify', function() {
    ...
});
```

### IM

获取 token

```
/api/message/agent/token?track_id={track_id}&tid={tid}&
```

链接 socket   

```  
import io from 'socket.io-client'
const socket = io('http://ws.dev.usingnet.net');

socket.on('message', function() {

});
```
