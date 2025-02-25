const BACKEND_URL = "https://chatbot-backend.onrender.com";  // URL de tu backend en Render

async function getChatGPTResponse(userInput) {
    addMessage("Escribiendo...", "bot-message");

    try {
        const response = await fetch(`${BACKEND_URL}/chat`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: userInput })
        });

        const data = await response.json();
        addMessage(data.reply, "bot-message");
    } catch (error) {
        addMessage("Error al obtener respuesta del chatbot.", "bot-message");
    }
}

// Función para agregar mensajes al chat
function addMessage(text, className) {
    let chatBox = document.getElementById("chat-box");
    let messageDiv = document.createElement("div");
    messageDiv.className = className;
    messageDiv.textContent = text;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Evento para enviar mensaje con "Enter"
document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Función para enviar mensaje desde el input
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;
    addMessage(userInput, "user-message");
    document.getElementById("user-input").value = "";
    getChatGPTResponse(userInput);
}