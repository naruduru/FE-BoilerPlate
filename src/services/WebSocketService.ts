import { Client, IMessage, StompConfig, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

class WebSocketService {
    private static instance: WebSocketService;
    private client: Client;

    private constructor() {
        this.client = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws/chat'),
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        } as StompConfig);
    }

    public static getInstance(): WebSocketService {
        if (!WebSocketService.instance) {
            WebSocketService.instance = new WebSocketService();
        }
        return WebSocketService.instance;
    }

    public activate(onConnectCallback?: () => void) {
        this.client.onConnect = () => {
            console.log('[WebSocketService] Connected');
            // 연결 성공 후에만 실행할 콜백 (Subscribe 등을 안전하게 처리)
            if (onConnectCallback) {
              onConnectCallback();
            }
        };
        
        // onStompError, onWebSocketError 등 추가 설정
        this.client.onStompError = (frame) => {
            console.error('[WebSocketService] Broker error: ' + frame.headers['message']);
        };
        this.client.onWebSocketError = (ev) => {
            console.error('[WebSocketService] WebSocket error:', ev);
        };   
        
        this.client.activate();
    }

    public deactivate() {
        this.client.deactivate();
    }

    // topic(구독 경로)에 대한 콜백 등록
    public subscribe(topic: string, callback: (message: IMessage) => void): StompSubscription {
        return this.client.subscribe(topic, callback);
    }

    // 메시지 전송
    public publish(destination: string, body: any) {
        this.client.publish({
            destination,
            body: JSON.stringify(body),
        });
    }
}

export default WebSocketService;