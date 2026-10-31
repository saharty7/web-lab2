// Add name to the title and list
function addName() {
  const input = document.getElementById('name');
  const name = input.value.trim();

  if (!name) return;

  document.getElementById('title').textContent = `Hello, ${name}!`;

  const li = document.createElement('li');
  li.textContent = name;
  document.getElementById('list').appendChild(li);

  input.value = '';
}

// Click a name to say goodbye and remove it
function removeName(e) {
  if (e.target.nodeName === 'LI') {
    const name = e.target.textContent;
    document.getElementById('title').textContent = `Goodbye, ${name}! See you later.`;
    e.target.remove();
  }
}

// Allow pressing Enter to greet
document.getElementById('name').addEventListener('keydown', (e) => {
  if (e.key === 'Enter') addName();
});

document.getElementById('greet').addEventListener('click', addName);
document.getElementById('list').addEventListener('click', removeName);
