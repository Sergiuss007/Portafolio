const BACKEND_URL = "https://portafolio-f8al.onrender.com";

// Esperar hasta que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function () {
    const chatButton = document.getElementById("chat-button");
    const chatContainer = document.getElementById("chat-container");
    const closeChat = document.getElementById("close-chat");
    const sendButton = document.getElementById("send-button");
    const userInput = document.getElementById("user-input");

    if (chatButton && chatContainer) {
        // Evento para abrir el chat
        chatButton.addEventListener("click", function () {
            chatContainer.classList.toggle("active");
        });
    }

    if (closeChat) {
        // Evento para cerrar el chat
        closeChat.addEventListener("click", function () {
            chatContainer.classList.remove("active");
        });
    }

    if (sendButton && userInput) {
        // Evento para enviar mensaje con el botón
        sendButton.addEventListener("click", sendMessage);

        // Evento para enviar mensaje con "Enter"
        userInput.addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                sendMessage();
            }
        });
    }
});

// Función para enviar mensaje
function sendMessage() {
    const userInput = document.getElementById("user-input").value.trim();
    if (userInput === "") return;

    addMessage(userInput, "user-message");
    document.getElementById("user-input").value = "";

    getChatGPTResponse(userInput);
}

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