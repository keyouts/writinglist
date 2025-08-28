let checklist = [];

window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('writingChecklist')) || [];
  checklist = saved;
  renderChecklist();
};

function addItem() {
  const input = document.getElementById('newItem');
  const text = input.value.trim();
  if (text) {
    checklist.push({ text, completed: false });
    input.value = '';
    saveChecklist();
    renderChecklist();
  }
}

function toggleItem(index) {
  checklist[index].completed = !checklist[index].completed;
  saveChecklist();
  renderChecklist();
}

function deleteItem(index) {
  checklist.splice(index, 1);
  saveChecklist();
  renderChecklist();
}

function clearAll() {
  checklist = [];
  saveChecklist();
  renderChecklist();
}

function saveChecklist() {
  localStorage.setItem('writingChecklist', JSON.stringify(checklist));
}

function renderChecklist() {
  const list = document.getElementById('checklist');
  list.innerHTML = '';
  checklist.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = item.completed ? 'completed' : '';
    li.innerHTML = `
      <span onclick="toggleItem(${index})">${item.text}</span>
      <button onclick="deleteItem(${index})">🗑</button>
    `;
    list.appendChild(li);
  });
}

