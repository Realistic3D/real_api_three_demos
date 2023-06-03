import * as REAL from "real_api";

export class SocketManager{
    constructor(renderer, loginData) {
        this.connectCount = 0;
        this.connected = false;
        this.renderer = renderer;
        this.uri = getURI(loginData);
        this.socket = new WebSocket(this.uri);
        this.initSocket();
    }
    initSocket()
    {
        this.socket.onopen = this.onOpen.bind(this)
        this.socket.onmessage = this.onMessages.bind(this);
        this.socket.onerror = this.socketError.bind(this);
        this.socket.onclose = this.socketClosed.bind(this);
    }
    onOpen(messageEvent)
    {
        this.connected = true;
        this.connectCount = 0;
    }
    onMessages(messageEvent) {
        const message = messageEvent.data;
        if (!message) return;
        if(!message.startsWith('{')) return;
        const renderInfo = JSON.parse(message);
        const msg = renderInfo.msg;
        const data = renderInfo.data;
        const type = renderInfo.type;
        this.renderer.onSocketMessage(type, msg, data);
    }
    ReconnectSocket()
    {
        if(this.connectCount > 3) return;
        console.log("Reconnecting")
        this.connectCount++;
        this.socket = new WebSocket(this.uri);
    }
    socketClosed(messageEvent)
    {
        this.connected = false;
        console.log("Socket has been closed!", messageEvent.data)
        this.ReconnectSocket();
    }
    socketError(messageEvent)
    {
        console.error("There was an error in connecting socket!")
    }
}

function getURI(loginData) {
    return `wss://${(REAL.Domain)}/login?user_name=${loginData.userName}&app_key=${loginData.appKey}&app_secret=${loginData.appSecret}&prod_key=${loginData.prodKey}&ins_id=${loginData.insID}`;
}
