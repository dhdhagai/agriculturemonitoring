import secretPhrase from "./env.js";
const allowedEntries = 3;

document.getElementById('chat-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const apiKey = secretPhrase();
    console.log("Test");

    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;

    const aisubmit = document.getElementById("aisubmit");
    aisubmit.disabled = true;
    aisubmit.style.background = "grey";

    addMessage('User', message, aisubmit);
    input.value = '';

    try {
        const data = { "contents": [{ "parts": [{ "text": message }] }] };

        fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            addMessage("Bot", data.candidates[0].content.parts[0].text, aisubmit);

            
        })
        .catch((error) => {
            console.error('Error:', error);
            aisubmit.disabled = false; // Enable the button on error
            aisubmit.style.background = "#d67e0a"; // Reset button color
        });

    } catch (error) {
        console.error('Error making API request:', error);
        aisubmit.disabled = false; // Enable the button on error
        aisubmit.style.background = "#d67e0a"; // Reset button color
    }
});

function addMessage(sender, message, submitButton) {
    const messages = document.getElementById('messages');
    const div = document.createElement("div");

    div.classList.add('p-2', 'mb-2', 'rounded', 'chatmsg');

    const converter = new showdown.Converter();
    const htmlMessage = converter.makeHtml(message);
    div.innerHTML = `<strong>${sender}:</strong> ${htmlMessage}`;

    messages.appendChild(div);
     // Scroll to the latest message

    // If the sender is Bot, call the typing effect
    if (sender === 'Bot') {
        const uniqueId = `bot-message-${Date.now()}`;
        div.innerHTML = `<strong>Bot:</strong> <span id="${uniqueId}" class="typed-message"></span>`;
        messages.appendChild(div);
        typing(`#${uniqueId}`, htmlMessage, submitButton);
    }
}

// Function to handle typing effect with Typed.js
function typing(targetElement, htmlMessage, submitButton) {
    new Typed(targetElement, {
        strings: [htmlMessage],
        typeSpeed: 10,
        showCursor: false,
        loop: false,
        onComplete: function() {
            submitButton.disabled = false; // Re-enable the button when typing is complete
            messages.scrollTop = messages.scrollHeight;
            aisubmit.style.background = "#d67e0a";
        }
    });
}
