document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const closeChatButton = document.getElementById("close-chat");

    // Función para cerrar el chat al hacer clic en la "X"
    closeChatButton.addEventListener("click", function () {
        chatContainer.style.display = "none"; // Oculta el chatbox
    });

    const chatbox = document.getElementById("chat-box");
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");

    // Base de datos de respuestas predefinidas
    const respuestas = {
        "hola": "¡Hola! ¿En qué puedo ayudarte?",
        "quién eres": "Soy un chatbot básico sin backend. 😊",
        "adiós": "¡Hasta luego! Que tengas un gran día.",
        "default": "Lo siento, no entiendo esa pregunta. 🤖"
    };

    function addMessage(text, className) {
        let messageDiv = document.createElement("div");
        messageDiv.className = className;
        messageDiv.textContent = text;
        chatbox.appendChild(messageDiv);
        chatbox.scrollTop = chatbox.scrollHeight;
    }

    function sendMessage() {
        let userMessage = inputField.value.trim().toLowerCase();
        if (userMessage === "") return;

        addMessage("Tú: " + userMessage, "user-message");

        let botResponse = respuestas[userMessage] || respuestas["default"];
        setTimeout(() => addMessage("Chatbot: " + botResponse, "bot-message"), 500);

        inputField.value = "";
    }

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});