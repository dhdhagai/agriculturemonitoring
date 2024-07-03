document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;

    addMessage('user', message);
    input.value = '';

    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    addMessage('bot', data.reply);
});

function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    div.className = `message ${sender}`;
    div.textContent = message;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
