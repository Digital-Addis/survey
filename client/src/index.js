import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import App from "./App.js";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { SidebarProvider } from "./context/SidebarContext.jsx";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <ThemeProvider>
    <SidebarProvider>
      <App />
    </SidebarProvider>
  </ThemeProvider>
);

