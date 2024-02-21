document.addEventListener('DOMContentLoaded', function () {
    const words = [
        "computadora", "gato", "perro", "casa", "mesa", "silla", "jardín", "ventana", "puerta", "libro",
        "teléfono", "televisión", "lápiz", "escritorio", "plato", "tenedor", "cuchillo", "taza", "reloj",
        "bicicleta", "tren", "automóvil", "avión", "barco", "globo", "árbol", "flor", "montaña", "río",
        "lago", "mar", "sol", "luna", "estrella", "nube", "lluvia", "nieve", "viento", "calor", "frío",
        "helado", "pizza", "hamburguesa", "sándwich", "ensalada", "fruta", "verdura", "carne", "pescado", "pollo"
    ];
    
    let word = ''; // Palabra a adivinar
    let guessedLetters = []; // Letras adivinadas
    let chances = 6; // Oportunidades restantes

    // Elementos del DOM
    const wordDisplay = document.querySelector('.word-display');
    const guessedLettersDisplay = document.querySelector('.guessed-letters');
    const chancesDisplay = document.querySelector('.chances-left');
    const keyboard = document.querySelector('.keyboard');

    // Función para seleccionar una palabra aleatoria
    function selectWord() {
        word = words[Math.floor(Math.random() * words.length)];
    }

    // Función para inicializar el juego
    function init() {
        selectWord();
        guessedLetters = [];
        chances = 6;
        updateWordDisplay();
        updateGuessedLettersDisplay();
        updateChancesDisplay();
        createKeyboard();
    }

    // Función para actualizar la visualización de la palabra oculta
    function updateWordDisplay() {
        wordDisplay.innerHTML = word
            .split('')
            .map(letter => guessedLetters.includes(letter) ? letter : '_')
            .join(' ');
    }

    // Función para actualizar la visualización de las letras adivinadas
    function updateGuessedLettersDisplay() {
        guessedLettersDisplay.textContent = guessedLetters.join(', ');
    }

    // Función para actualizar la visualización de las oportunidades restantes
    function updateChancesDisplay() {
        chancesDisplay.textContent = `Oportunidades restantes: ${chances}`;
    }

    // Función para crear los botones del teclado
    function createKeyboard() {
        const alphabet = 'abcdefghijklmnñopqrstuvwxyz';
        keyboard.innerHTML = '';
        alphabet.split('').forEach(letter => {
            const button = document.createElement('button');
            button.textContent = letter.toUpperCase();
            button.addEventListener('click', () => handleLetterClick(letter));
            keyboard.appendChild(button);
        });
    }

    // Función para manejar el clic en una letra del teclado
    function handleLetterClick(letter) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            if (!word.includes(letter)) {
                chances--;
            }
            updateWordDisplay();
            updateGuessedLettersDisplay();
            updateChancesDisplay();
            checkGameStatus();
        }
    }

    // Función para verificar el estado del juego (ganador o perdedor)
    function checkGameStatus() {
        if (word.split('').every(letter => guessedLetters.includes(letter))) {
            // El jugador ha adivinado todas las letras
            alert('¡Felicidades! Has ganado.');
            init();
        } else if (chances === 0) {
            // El jugador ha agotado todas las oportunidades
            alert(`¡Oh no! Has perdido. La palabra era "${word}".`);
            init();
        }
    }

    // Inicializar el juego al cargar la página
    init();
});

