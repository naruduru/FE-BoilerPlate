import React from "react";
import { Routes, Route } from "react-router-dom";
import MainContent from "../components/MainContent.tsx";
import Login from "../components/Login.tsx";
import SignUp from  "../components/SignUp.tsx";
import DefaultLayout from "../components/DefaultLayout.tsx";
import FullscreenLayout from "../components/FullscreenLayout.tsx";
import Chat from "../components/Chat.tsx";

const AppRouter: React.FC = () => {
    return (
        <Routes>
            <Route element={<DefaultLayout />}>
                <Route path="/" element={<MainContent />} />
            </Route>

            <Route element={<FullscreenLayout />}>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/chat" element={<Chat />} />
            </Route>
        </Routes>
    );
};

export default AppRouter;