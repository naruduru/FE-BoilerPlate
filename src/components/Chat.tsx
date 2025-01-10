import { useEffect, useRef, useState } from "react";
import WebSocketService from "../services/WebSocketService";
import { IMessage } from "@stomp/stompjs";

interface ChatMessage {
    sender: string;
    content: string;
    sendAt?: string;
}

function Chat() {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const [username, setUsername] = useState('');
    const subscriptionRef = useRef<any>(null);

    useEffect(() => {
        const webSocketService = WebSocketService.getInstance();

        // (1) activate 시, 연결 완료 후 콜백 내부에서 subscribe
        webSocketService.activate(() => {
            console.log('[Chat] onConnectCallback 호출');
            subscriptionRef.current = webSocketService.subscribe(
                '/topic/chat',
                (message: IMessage) => {
                    const body: ChatMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, body]);
                }
            );
        });

        // 언마운트 시 구독 해제 및 연결 해제
        return () => {
            if (subscriptionRef.current) {
                subscriptionRef.current.unsubscribe();
            }
            webSocketService.deactivate();
        };
    }, []);

    // 메시지 전송
    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const webSocketService = WebSocketService.getInstance();

        // 서버의 @MessageMapping과 일치
        webSocketService.publish('/app/chat.sendMessage', {
            sender: username,
            content: inputMessage,
            timestamp: new Date().toISOString(),
        });

        setInputMessage('');
    };

    return (
        <div style={{ width: '400px', margin: '0 auto' }}>
            <h1>실시간 채팅</h1>

            <div>
                <label>닉네임: </label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="닉네임 입력"
                />
            </div>

            <div style={{ border: '1px solid #ccc', padding: '8px', marginTop: '8px', height: '300px', overflow: 'auto' }}>
                {messages.map((msg, idx) => (
                    <div key={idx}>
                        <strong>{msg.sender}</strong> : {msg.content} - {msg.sendAt}
                    </div>
                ))}
            </div>

            <div style={{ marginTop: '8px' }}>
                <input
                    type="text"
                    style={{ width: '80%' }}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') sendMessage();
                    }}
                    placeholder="메시지를 입력하세요"
                />
                <button onClick={sendMessage}>전송</button>
            </div>
        </div>
    );
}

export default Chat;
