// Replace '192.168.X.X' with the actual IP address of your ESP32
const websocketURL = "ws://10.249.1.26:81/";
let websocket;

function connectWebSocket() {
    websocket = new WebSocket(websocketURL);
    console.log("Inside connect WebSocket function");

    websocket.onopen = () => {
        console.log("WebSocket connection established");
        document.getElementById("connection-status").textContent = "Connected";
        document.getElementById("connection-status").style.color = "green";
    };

    websocket.onmessage = (event) => {
        console.log("Data received: ", event.data);
        try {
            const data = JSON.parse(event.data);
            document.getElementById("temperature").textContent = data.temperature.toFixed(1);
            document.getElementById("humidity").textContent = data.humidity.toFixed(1);
        } catch (error) {
            console.error("Error parsing received data: ", error);
        }
    };

    websocket.onclose = () => {
        console.log("WebSocket connection closed");
        document.getElementById("connection-status").textContent = "Disconnected";
        document.getElementById("connection-status").style.color = "red";
        setTimeout(connectWebSocket, 2000); // Reconnect after 2 seconds
    };

    websocket.onerror = (error) => {
        console.error("WebSocket error: ", error);
    };
}

// Initialize WebSocket connection when the page loads
window.onload = () => {
    connectWebSocket();
};
