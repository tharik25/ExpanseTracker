function getEntries() {
  return JSON.parse(localStorage.getItem('entries')) || [];
}

function saveEntry(entry) {
  const entries = getEntries();
  entries.push(entry);
  localStorage.setItem('entries', JSON.stringify(entries));
}

function renderList(type, containerId) {
  const entries = getEntries().filter(e => e.type === type);
  const container = document.getElementById(containerId);
  container.innerHTML = '';
  entries.forEach(e => {
    container.innerHTML += `
      <div class="card">
        <div>${e.desc} (${e.date})</div>
        <div>$${e.amount}</div>
      </div>`;
  });
}

function renderDashboard() {
  const entries = getEntries();
  let income = 0, expense = 0;
  entries.forEach(e => {
    if (e.type === 'income') income += e.amount;
    else expense += e.amount;
  });
  document.getElementById('summary').innerHTML = `
    <p>Total Income: $${income.toFixed(2)}</p>
    <p>Total Expenses: $${expense.toFixed(2)}</p>
    <p><strong>Net Balance: $${(income - expense).toFixed(2)}</strong></p>
  `;
}
