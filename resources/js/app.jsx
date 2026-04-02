import React from 'react';
import { createRoot } from 'react-dom/client';
import AppPage from './AppPage.jsx';

const container = document.getElementById('app');

if (container) {
    createRoot(container).render(
        <React.StrictMode>
            <AppPage />
        </React.StrictMode>,
    );
}
