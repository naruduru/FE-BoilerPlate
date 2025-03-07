import axios from 'axios';

const BASE_URL = 'http://10.11.64.94:8080/api/chat';

export const getMessages = async (chatRoomId: string, limit: number) => {
    const response = await axios.get(`${BASE_URL}/${chatRoomId}/messages`, {
        params: { limit },
    });
    return response.data;
};

export const sendMessage = async (chatRoomId: string, message: string) => {
    const response = await axios.post(`${BASE_URL}/${chatRoomId}/messages`, { content: message });
    return response.data;
};
