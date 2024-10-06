import log from 'electron-log/renderer';
import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import { Dashboard } from './components/dashboard/dashboard';
import { Home } from '@/components/home.component';
import './assets/css/globals.css'; // Assuming you already have CSS bundled

const App = () => {
  return <h1>Hello from React!</h1>;
};

const container = document.getElementById('app');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<Home />);


// // Retrieve data
// document.getElementById('retrieve')?.addEventListener('click', () => {
//   window.electronAPI.getEquities();
// });

// // Handle data retrieval
// window.electronAPI.replyGetEquities((event: Electron.IpcRendererEvent, rows: AssetClass[]) => {
//   const dataList = document.getElementById('data-list');
//   if (dataList) {
//       dataList.innerHTML = '';
//       rows.forEach(row => {
//         const listItem = document.createElement('li');
//         listItem.textContent = `ID: ${row.id}, Name: ${row.name}, Symbol: ${row.symbol}, Unit: ${row.unit}`;
//         dataList.appendChild(listItem);
//       });
//   } else {
//       log.error('Data list element not found.');
//   }
// });
