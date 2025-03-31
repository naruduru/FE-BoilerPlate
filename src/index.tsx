import ReactDOM from "react-dom/client";
import App from "./App";
// src/index.tsx 또는 src/App.tsx
import './index.css';  // 또는 './styles.css'
import { Provider } from 'react-redux';
import store from './store'; // 방금 만든 Redux store


const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
