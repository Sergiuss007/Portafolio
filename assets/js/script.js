const BACKEND_URL = "https://portafolio-f8al.onrender.com"; // Backend en Render

// Función para obtener respuesta del chatbot
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
        addMessage("Error al conectar con el chatbot.", "bot-message");
        console.error("Error:", error);
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

// Mostrar/Ocultar el chat al hacer clic en el botón
document.getElementById("chat-button").addEventListener("click", function() {
    document.getElementById("chat-container").style.display = "block";
});

// Cerrar el chat al hacer clic en el botón de cerrar
document.getElementById("close-chat").addEventListener("click", function() {
    document.getElementById("chat-container").style.display = "none";
});

// Evento para enviar mensaje al presionar "Enter"
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Función para enviar mensaje con el botón
document.getElementById("send-button").addEventListener("click", function() {
    sendMessage();
});

// Función para enviar mensaje
function sendMessage() {
    let userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;
    addMessage(userInput, "user-message");
    document.getElementById("user-input").value = "";
    getChatGPTResponse(userInput);
}