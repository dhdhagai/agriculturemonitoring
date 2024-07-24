document.getElementById('chat-form').addEventListener('submit', async (e) => {
    console.log("Test")
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
        body: JSON.stringify({message}),
    });

    const data = await response.json();
    addMessage('bot', data.reply);
});

function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    var converter = new showdown.Converter();
    var md = message;
    var html = converter.makeHtml(md);

    // Add sender and message to the div
    div.classList.add('chat-message');
    div.innerHTML = `<strong>${sender}:</strong> ${html}`;

    // Append the message to the messages container
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}
