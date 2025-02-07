import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// src/index.tsx 또는 src/App.tsx
import './index.css';  // 또는 './styles.css'


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
