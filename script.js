const levels = [
    {
        title: "Nivel 1 - Configuración de dispositivos de red",
        description: "¡Bienvenido al primer desafío de redes! Responde correctamente para avanzar.",
        puzzles: [
            {
                question: "¿Qué tipo de cable necesitas para conectar directamente dos computadoras sin un switch o router intermedio?",
                options: ["Cable de red plano", "Cable cruzado", "Cable de fibra óptica", "Cable coaxial"],
                correctAnswer: 1,
                hint: "Este tipo de cable invierte las conexiones de transmisión y recepción."
            },
            {
                question: "En una escuela, varios puntos de acceso están conectados a un switch para proporcionar Wi-Fi a los estudiantes...",
                options: [
                    "La configuración de QoS",
                    "La asignación de direcciones IP estáticas",
                    "La configuración de puertos para múltiples subredes",
                    "La configuración de puertos en modo acceso"
                ],
                correctAnswer: 3,
                hint: "Ten en cuenta cómo el modo afecta la comunicación."
            },
            {
                question: "El servidor no asigna IPs. ¿Qué protocolo debe estar activo?",
                options: ["DHCP", "DNS", "FTP", "HTTP"],
                correctAnswer: 0,
                hint: "Este protocolo gestiona IPs dinámicamente."
            }
        ],
        code: "192"
    },
    {
        title: "Nivel 2 - Direccionamiento IP",
        description: "¡Bienvenido al desafío de Direccionamiento IP! Responde a los acertijos presentados.",
        puzzles: [
            {
                question: "¿Cuál es la dirección de red para 192.168.1.0/24?",
                options: ["192.168.1.1", "192.168.1.255", "192.168.2.1", "192.168.1.0"],
                correctAnswer: 3,
                hint: "La primera dirección identifica la red."
            },
            {
                question: "En 10.0.0.0/8, ¿cuántas IPs puedes asignar?",
                options: ["16,777,214", "10.000", "254", "65,534"],
                correctAnswer: 0,
                hint: "Considera el tamaño de /8."
            },
            {
                question: "¿Qué método permite comunicación entre dos redes diferentes?",
                options: ["NAT", "Subnetting", "VLSM", "DHCP"],
                correctAnswer: 0,
                hint: "Permite conectar redes distintas."
            }
        ],
        code: "168"
    },
    {
        title: "Nivel 3 - Protocolos de comunicación",
        description: "¡Bienvenido al desafío de Protocolos de Comunicación! Elige tus respuestas con cuidado.",
        puzzles: [
            {
                question: "¿Qué protocolo se usa para transferir archivos?",
                options: ["HTTP", "FTP", "SMTP", "SNMP"],
                correctAnswer: 1,
                hint: "Esencial para enviar y recibir archivos."
            },
            {
                question: "En el modelo OSI, ¿qué capa maneja conexiones?",
                options: ["Capa de sesión", "Capa de red", "Capa de transporte", "Capa de presentación"],
                correctAnswer: 0,
                hint: "Intercambio entre aplicaciones en red."
            },
            {
                question: "¿Qué protocolo se usa para enviar correos?",
                options: ["IMAP", "POP3", "DHCP", "SMTP"],
                correctAnswer: 3,
                hint: "Es fundamental para enviar mensajes."
            }
        ],
        code: "0.1"
    }
];

let currentLevel = 0;
let currentPuzzle = 0;
let finalCode = "";
let timeLeft = 15 * 60;

function displayTimer() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    document.getElementById("timer").textContent = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function startTimer() {
    const timer = setInterval(() => {
        timeLeft--;
        displayTimer();
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("¡Tiempo agotado! Reinicia el juego.");
            restartGame();
        }
    }, 1000);
}

function displayPuzzle() {
    const level = levels[currentLevel];
    document.getElementById("level-title").textContent = level.title;
    document.getElementById("level-description").textContent = level.description;
    const puzzle = level.puzzles[currentPuzzle];
    document.getElementById("puzzle-question").textContent = puzzle.question;
    document.getElementById("options-container").innerHTML = "";
    document.getElementById("hint").textContent = "";

    puzzle.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.onclick = () => checkAnswer(index);
        document.getElementById("options-container").appendChild(button);
    });
}

function checkAnswer(selectedIndex) {
    const puzzle = levels[currentLevel].puzzles[currentPuzzle];
    if (selectedIndex === puzzle.correctAnswer) {
        currentPuzzle++;
        if (currentPuzzle < levels[currentLevel].puzzles.length) {
            displayPuzzle();
        } else {
            finalCode += levels[currentLevel].code;
            currentPuzzle = 0;
            currentLevel++;
            if (currentLevel < levels.length) {
                displayLevelCode();
            } else {
                displayFinalCodeInput();
            }
        }
    } else {
        document.getElementById("hint").textContent = puzzle.hint;
    }
}

function displayLevelCode() {
    const level = levels[currentLevel - 1];
    document.getElementById("puzzle-container").style.display = "none";
    document.getElementById("level-code-container").style.display = "block";
    document.getElementById("level-code").textContent = `Código del nivel: ${level.code}`;
    document.getElementById("next-level-button").style.display = "block"; // Mostrar el botón para continuar al siguiente nivel
}

function continueToNextLevel() {
    document.getElementById("level-code-container").style.display = "none";
    document.getElementById("puzzle-container").style.display = "block";
    displayPuzzle();
}

function displayFinalCodeInput() {
    document.getElementById("puzzle-container").style.display = "none";
    document.getElementById("code-input-container").style.display = "block";
    document.getElementById("level-title").textContent = "¡Felicidades! Has completado todos los niveles.";
    document.getElementById("level-description").textContent = "Introduce el código final para ganar el juego.";
}

function verifyFinalCode() {
    const finalCode = document.getElementById("final-code").value;
    const correctCode = "192.168.0.1"; // El código correcto

    if (finalCode === correctCode) {
        showVictory(); // Mostrar mensaje de victoria y confeti
    } else {
        document.getElementById("final-message").textContent = "Código incorrecto, intenta nuevamente.";
        document.getElementById("final-message").style.display = "block"; // Mostrar mensaje de error
    }
}

function restartGame() {
    currentLevel = 0;
    currentPuzzle = 0;
    finalCode = "";
    timeLeft = 15 * 60;
    document.getElementById("puzzle-container").style.display = "block";
    document.getElementById("code-input-container").style.display = "none";
    document.getElementById("level-code-container").style.display = "none";
    document.getElementById("final-message").textContent = "";
    document.getElementById("final-code").value = "";
    document.getElementById("restart-button").style.display = "none";
    displayPuzzle();
    startTimer();
}

window.onload = () => {
    displayPuzzle();
    startTimer();
};

function showVictory() {
    // Mostrar mensaje de victoria
    document.getElementById("final-message").textContent = "¡Felicidades! Has ganado el juego.";
    document.getElementById("final-message").style.display = "block"; // Mostrar el mensaje de victoria
    document.getElementById("restart-button").style.display = "block"; // Hacer visible el botón de reinicio

    // Ejecutar confeti
    triggerConfetti();
}

function triggerConfetti() {
    // Crear confeti
    const duration = 5 * 1000; // duración de la animación
    const animationEnd = Date.now() + duration;
    
    const confettiInterval = setInterval(() => {
        confetti({
            particleCount: 50,
            angle: 60,
            spread: 55,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
        confetti({
            particleCount: 50,
            angle: 120,
            spread: 55,
            origin: { x: Math.random(), y: Math.random() - 0.2 }
        });
        
        if (Date.now() > animationEnd) {
            clearInterval(confettiInterval); // Detener el confeti
        }
    }, 100);
}
