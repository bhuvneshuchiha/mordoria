const ws = new WebSocket('ws://localhost:8081/ws/v1/mordoria');

let messageArr = [];

document.getElementById("sendButton").addEventListener("click" ,() => {
    const input = document.getElementById("messageInput")
    const ai_score = document.getElementById("ai_emot")
    const ai_emot = ai_score.value;
    const message = input.value;

    ws.send(JSON.stringify({
        clientId: 1,
        payload: message,
        ai_emot_score: ai_emot
    }));
    input.value = ""
});

ws.onopen = () => {
    console.log('Connected to Go backend');
};

ws.onmessage = (event) => {
    console.log('Received from Go backend:', event.data);
    messageArr.push(event.data);
    console.log(messageArr);
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from Go backend');
};


