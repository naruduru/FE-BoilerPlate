import React, {useState} from "react";
import WebSocketService from "../services/WebSocketService.ts";

const MainContent: React.FC = () => {

    const [inputMessage, setInputMessage] = useState('');

    // 메시지 전송
    const sendMessage = () => {
        if (!inputMessage.trim()) return;

        const webSocketService = WebSocketService.getInstance();

        // 서버의 @MessageMapping과 일치
        webSocketService.publish('/app/chat.sendMessage', {
            sender: '이민구',
            content: inputMessage,
            timestamp: new Date().toISOString(),
        });

        setInputMessage('');
    };

    return (
        <main className="flex-1 flex flex-col bg-blue-200 p-4">
            <div className="min-h-[50px] bg-amber-100">
                <h1> &lt; 채팅방1</h1>
            </div>
            <div className="flex-1 overflow-y-auto bg-pink-200">
                <div className="text-left">
                    <div>
                        <strong>한종승</strong>
                    </div>
                    <div className="bg-white">
                        오늘 점심 뭐드실래요?
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="text-right bg-white">
                        닭갈비
                    </div>
                </div>
                <div className="text-left">
                    <div>
                        <strong>한종승</strong>
                    </div>
                    <div className="bg-white">
                        저녁 닭갈비 약속있는데요
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="text-right bg-white">
                        그럼 찜닭
                    </div>
                </div>
                <div className="text-left">
                    <div>
                        <strong>신정엽</strong>
                    </div>
                    <div className="bg-white">
                        난 샐러드
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        그럼 한식드시러 가시죠
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤1
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤2
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤3
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤4
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤5
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤6
                    </div>
                </div>
                <div className="text-right">
                    <div>
                        <strong>이민구</strong>
                    </div>
                    <div className="bg-white">
                        우헤헤헤헤7
                    </div>
                </div>
            </div>
            <div className="min-h-[50px] flex flex-col bg-cyan-400">
                <div className="flex-1 bg-blue-500">
                    <textarea className="w-full bg-gray-300 resize-none" placeholder="메시지를 입력하세요"/>
                </div>
                <div className="h-1/3 bg-yellow-300 text-right">
                    <button onClick={sendMessage}>전송</button>
                </div>
            </div>
        </main>
    );
};

export default MainContent;
