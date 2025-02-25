require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors()); // Asegura que GitHub Pages pueda acceder

const BACKEND_URL = "https://portafolio-zot1.onrender.com"; // URL del backend en Render

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

// Evento para enviar mensaje con "Enter"
document.getElementById("user-input").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// Evento para enviar mensaje con botón
document.getElementById("send-button").addEventListener("click", function () {
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