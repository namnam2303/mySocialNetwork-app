import { Client } from "@stomp/stompjs";

class WebSocketService {
  constructor() {
    // Initialize client, connection status, and subscriptions
    this.client = null;
    this.isConnected = false;
    this.subscriptions = new Map();
  }

  connect() {
    // If already connected, do nothing
    if (this.client) {
      return;
    }

    // Create a new STOMP client
    this.client = new Client({
      brokerURL: "ws://localhost:8080/ws", // WebSocket server URL
      reconnectDelay: 5000, // Reconnect every 5 seconds if connection is lost
      heartbeatIncoming: 4000, // Expect a heartbeat from the server every 4 seconds
      heartbeatOutgoing: 4000, // Send a heartbeat to the server every 4 seconds
    });

    // Set up connection success handler
    this.client.onConnect = () => {
      this.isConnected = true;
      console.log("Connected to WebSocket");
      // Resubscribe to all previous subscriptions
      this.subscriptions.forEach((callback, destination) => {
        this.subscribe(destination, callback);
      });
    };

    // Set up error handler
    this.client.onStompError = (frame) => {
      console.error("Broker reported error: " + frame.headers["message"]);
      console.error("Additional details: " + frame.body);
    };

    // Activate the client (connect to the WebSocket server)
    this.client.activate();
  }

  disconnect() {
    // If connected, disconnect and reset state
    if (this.client) {
      this.client.deactivate();
      this.isConnected = false;
      this.client = null;
    }
  }

  subscribe(destination, callback) {
    if (this.isConnected) {
      // If connected, subscribe immediately
      const subscription = this.client.subscribe(destination, (message) => {
        callback(JSON.parse(message.body));
      });
      // Store the subscription and callback
      this.subscriptions.set(destination, { callback, subscription });
    } else {
      // If not connected, store the callback for later subscription
      this.subscriptions.set(destination, { callback, subscription: null });
    }
  }

  unsubscribe(destination) {
    const sub = this.subscriptions.get(destination);
    if (sub && sub.subscription) {
      // If there's an active subscription, unsubscribe
      sub.subscription.unsubscribe();
    }
    // Remove the subscription from our map
    this.subscriptions.delete(destination);
  }

  sendMessage(destination, message) {
    if (this.isConnected) {
      // If connected, send the message
      this.client.publish({
        destination: destination,
        body: JSON.stringify(message),
      });
    } else {
      console.error("WebSocket is not connected");
    }
  }
}

// Export a singleton instance of the WebSocketService
export default new WebSocketService();
