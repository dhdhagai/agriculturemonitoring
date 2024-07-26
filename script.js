document.getElementById('chat-form').addEventListener('submit', async (e) => {
    console.log("Test")
    e.preventDefault();
    const input = document.getElementById('user-input');
    const message = input.value;
    if (!message) return;

    addMessage('user', message);
    input.value = '';

    const userMessage = req.body.message;
    console.log(userMessage);
    try {
        const data = {
            contents: [
                {
                    parts: [
                        {
                            text: userMessage
                        }
                    ]
                }
            ]
        };

        axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        .then(response => {
        try{
            let reply = response.data.candidates[0].content.parts[0].text
        }
        catch {
            reply = "Sorry I am having Trouble working out your query, Can you input it again?"
        }
           
        
        })
        .catch(error => {
            console.error(error);
        });

    } catch (error) {
        console.error('Error making API request:', error);
    }

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
