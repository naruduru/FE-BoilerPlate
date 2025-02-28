import React, {useEffect, useRef, useState} from "react";
import WebSocketService from "../services/WebSocketService.ts";
import {IMessage} from "@stomp/stompjs";
import { useUser } from "../contexts/UserContext";

interface ChatMessage {
    sender: string;
    content: string;
    sendAt?: string;
}

const MainContent: React.FC = () => {
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [inputMessage, setInputMessage] = useState('');
    const { username } = useUser();
    const subscriptionRef = useRef<any>(null);

    useEffect(() => {

        // 브라우저 알림 권한 요청
        const requestPermission = async () => {
            if (Notification.permission !== "granted") {
                await Notification.requestPermission();
            }
        };

        requestPermission();

        const webSocketService = WebSocketService.getInstance();

        // (1) activate 시, 연결 완료 후 콜백 내부에서 subscribe
        webSocketService.activate(() => {
            console.log('[Chat] onConnectCallback 호출');
            subscriptionRef.current = webSocketService.subscribe(
                '/topic/chat',
                (message: IMessage) => {
                    const body: ChatMessage = JSON.parse(message.body);
                    setMessages((prev) => [...prev, body]);
                    showNotification(`새 메시지:`, `새 메시지:`);
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

    const showNotification = (title: string, body: string) => {
        if (Notification.permission === "granted") {
            const notification = new Notification(title, {
                body,
                icon: "/path-to-icon.png",
            });

            notification.onclick = () => {
                window.focus();
            };
        }
    };

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

        console.log('inputMessage:::' + inputMessage)

        setInputMessage('');
    };

    const adjustHeight = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.target.style.height = "auto"; // 초기화
        e.target.style.height = `${e.target.scrollHeight}px`; // 내용에 맞게 높이 조정
    };

    // 링크 형식인 텍스트를 <a> 태그로 변환하는 함수
    const formatMessageWithLinks = (text: string) => {
        // 정규 표현식으로 URL을 탐지하여 <a> 태그로 감싸기
        const urlPattern = /(\bhttps?:\/\/\S+\.\S+)/g;
        return text.split(urlPattern).map((part, index) => {
            // URL 부분은 <a> 태그로 감싸기
            if (part.match(urlPattern)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500"
                    >
                        {part}
                    </a>
                );
            }
            // 그 외의 텍스트는 그대로 출력
            return part;
        });
    };

    return (
        <main className="flex-1 flex flex-col bg-custom-gold-25">
            <div className="min-h-[40px] bg-amber-100 p-2">
                <h1>그룹채팅 3</h1>
            </div>
            <hr className="border-custom-gold-75 border-1"/>
            <div className="flex-1 overflow-y-auto">
                {messages.map((msg, idx) => (
                    username === msg.sender ? (
                            <div key={idx} className="py-2 px-1 flex flex-row-reverse">
                                <div className="bg-custom-gold-75 ml-2">
                                    <div className="text-xs">{msg.sendAt}</div>
                                    <div style={{ whiteSpace: "pre-wrap" }}>{formatMessageWithLinks(msg.content)}</div>
                                </div>
                            </div>
                                ) : (
                                <div key={idx} className="flex text-left py-2 px-1">
                                    <div className="w-8 flex-none rounded-full inline-block bg-blue-300 p-2">
                                        {msg.sender.charAt(0)}
                                    </div>
                                    <div className="flex-none bg-white ml-2">
                                        <div className="text-xs">{msg.sender} {msg.sendAt}</div>
                                        <div style={{whiteSpace: "pre-wrap"}}>{formatMessageWithLinks(msg.content)}</div>
                                    </div>
                                </div>
                    )
                                ))}
                            </div>
                        <div className="flex p-2 items-end justify-center">
            <div className="flex w-full space-x-2 items-end bg-pink-200">
                    <textarea
                        className="flex-1 w-full bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none h-1 min-h-[40px] max-h-[300px] overflow-hidden"
                        placeholder="메시지를 입력하세요"
                        onChange={(e) => {
                            setInputMessage(e.target.value)
                            adjustHeight(e); // 높이 조정
                        }
                        }
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault();
                                sendMessage();
                            }
                        }}
                        value={inputMessage}
                    />
                    <button className="bg-blue-500 text-white p-1 rounded-lg hover:bg-blue-600"
                            onClick={sendMessage}>보내기
                    </button>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
