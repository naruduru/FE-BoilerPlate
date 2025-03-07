import React, { useEffect } from "react";
import SockJS from "sockjs-client";

const Messenger: React.FC = () => {
    useEffect(() => {
        console.log('Messager:::Messager:::' + Notification.permission)
        // 브라우저 알림 권한 요청
        const requestPermission = async () => {
            if (Notification.permission !== "granted") {
                await Notification.requestPermission();
            }
        };

        requestPermission();

        // WebSocket 예시
        const socket = new SockJS('http://10.11.64.94:8080/ws');

        socket.onmessage = (event) => {
            const data = JSON.parse(event.data); // 서버에서 데이터 수신
            if (data.type === "message") {
                const { sender, message } = data;
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                showNotification(`새 메시지: ${sender}`, message);
            }
        };

        return () => socket.close();
    }, []);

    const showNotification = (title: string, body: never) => {
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

    return <div>Messenger</div>;
};

export default Messenger;
