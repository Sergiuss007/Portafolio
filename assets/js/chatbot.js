document.addEventListener("DOMContentLoaded", function () {
    const chatContainer = document.getElementById("chat-container");
    const chatBox = document.getElementById("chat-box");
    const inputField = document.getElementById("user-input");
    const sendButton = document.getElementById("send-button");
    const closeChatButton = document.getElementById("close-chat");
    const openChatButton = document.getElementById("open-chat");

    // Ocultar el chat al inicio
    chatContainer.style.display = "none";

    // Botón para abrir el chat
    openChatButton.addEventListener("click", function () {
        chatContainer.style.display = "block";
        openChatButton.style.display = "none";
    });

    // Botón para cerrar el chat
    closeChatButton.addEventListener("click", function () {
        chatContainer.style.display = "none";
        openChatButton.style.display = "block";
    });

    // Respuestas predefinidas
    const respuestas = {
        "hola": "Sergio: Hola, ¿puedo ayudarle?",
        "quién eres": "Sergio: En un momento le respondo...",
        "adiós": "Sergio: ¡Hasta luego!",
        "default": "Sergio: En horario de oficina puede llamarme al +593 986695223, o a través del formulario de contacto."
    };

    // Función para agregar mensajes al chat
    function addMessage(text, className) {
        let messageDiv = document.createElement("div");
        messageDiv.className = className;
        messageDiv.textContent = text;
        chatBox.appendChild(messageDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // Función para enviar mensajes
    function sendMessage() {
        let userMessage = inputField.value.trim().toLowerCase();
        if (userMessage === "") return;

        addMessage("Tú: " + userMessage, "user-message");

        let botResponse = respuestas[userMessage] || respuestas["default"];
        setTimeout(() => addMessage(botResponse, "bot-message"), 500);

        inputField.value = "";
    }

    sendButton.addEventListener("click", sendMessage);
    inputField.addEventListener("keypress", function (event) {
        if (event.key === "Enter") sendMessage();
    });
});