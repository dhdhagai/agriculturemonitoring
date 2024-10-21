import secretPhrase from "./env.js"
const allowedEntrires = 3;


document.getElementById('chat-form').addEventListener('submit', async (e) => {

    e.preventDefault();
    const apiKey = secretPhrase();
    console.log("Test")

    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;
    
    addMessage('user', message);
    input.value = '';

    const userMessage = input;
    console.log(userMessage);
    const aisubmit = document.getElementById("aisubmit")
aisubmit.disabled = true

aisubmit.style.background = "grey";
    try {
const data = {"contents":[{"parts":[{"text":message}]}]}
        
        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            addMessage("BOT: ",data.candidates[0].content.parts[0].text)
            aisubmit.disabled = false;
            aisubmit.style.background = "#d67e0a"
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    
    } catch (error) {
        console.error('Error making API request:', error);
    }
    
});

function addMessage(sender, message) {
    const messages = document.getElementById('messages');
    const div = document.createElement('div');
    var converter = new showdown.Converter();
    var md = message;
    var html = converter.makeHtml(md);
    div.classList.add('chat-message');
    div.innerHTML = `<strong>${sender}:</strong> ${html}`;
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}