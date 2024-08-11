import log from 'electron-log/renderer';
import { FormSubmissionReply, UserData } from './models/models'

// Handle form submission
document.getElementById('user-form')?.addEventListener('submit', (event: Event) => {
    event.preventDefault();

    const nameInput = document.getElementById('name') as HTMLInputElement | null;
    const ageInput = document.getElementById('age') as HTMLInputElement | null;

    const name  = nameInput?.value.trim() ?? '';
    const age   = parseInt(ageInput?.value.trim() ?? '', 10);

    if (!name || isNaN(age)) {
        alert('Please enter valid name and age.');
        return;
    }

    window.electronAPI.sendForm({ name, age });
});

// Handle form submission reply
window.electronAPI.onFormSubmissionReply((event: Electron.IpcRendererEvent, response: FormSubmissionReply) => {
    if (response.success) {
      alert(`Data saved with ID: ${response.id}`);
    } else {
      alert('Failed to save data.');
    }
});

// Retrieve data
document.getElementById('retrieve')?.addEventListener('click', () => {
    window.electronAPI.requestData();
});

// Handle data retrieval
window.electronAPI.onDataRetrieved((event: Electron.IpcRendererEvent, rows: UserData[]) => {
    const dataList = document.getElementById('data-list');
    if (dataList) {
        dataList.innerHTML = '';
        rows.forEach(row => {
          const listItem = document.createElement('li');
          listItem.textContent = `ID: ${row.id}, Name: ${row.name}, Age: ${row.age}`;
          dataList.appendChild(listItem);
        });
    } else {
        console.error('Data list element not found.');
    }
});
