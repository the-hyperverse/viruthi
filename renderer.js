// Handle form submission
document.getElementById('user-form')?.addEventListener('submit', (event) => {
    console.log('sending form');
  event.preventDefault();
  const name = document.getElementById('name')?.value.trim();
  const age = parseInt(document.getElementById('age')?.value.trim(), 10);

  if (!name || isNaN(age)) {
    alert('Please enter valid name and age.');
    return;
  }

  console.log('sending form');
  window.electronAPI.sendForm({ name, age });
});

// Handle form submission reply
window.electronAPI.onFormSubmissionReply((event, response) => {
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
window.electronAPI.onDataRetrieved((event, rows) => {
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
