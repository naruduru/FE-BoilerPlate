import React from "react";
import AppRouter from "./router/router.tsx";
import { BrowserRouter as Router } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext.tsx";

const App: React.FC = () => {
    return (
        <UserProvider>
            <Router>
                <AppRouter />
            </Router>
        </UserProvider>
    );
};

export default App;
