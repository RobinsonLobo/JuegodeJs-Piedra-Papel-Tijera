class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

class UserManager {
    constructor() {
        this.users = this.loadUsers();
    }

    loadUsers() {
        const users = localStorage.getItem('users');
        return users ? JSON.parse(users) : [];
    }

    saveUsers() {
        localStorage.setItem('users', JSON.stringify(this.users));
    }

    registerUser(name, email, password) {
        const existingUser = this.users.find(user => user.email === email);
        if (existingUser) {
            alert('Este correo ya está registrado.');
            return;
        }
        const newUser = new User(name, email, password);
        this.users.push(newUser);
        this.saveUsers();
    }

    authenticate(email, password) {
        return this.users.find(user => user.email === email && user.password === password);
    }
}

const userManager = new UserManager();

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('loginButton').addEventListener('click', handleLogin);
    document.getElementById('registerButton').addEventListener('click', handleRegister);
    document.getElementById('showRegisterButton').addEventListener('click', showRegister);
    document.getElementById('showLoginButton').addEventListener('click', showLogin);

    document.querySelectorAll('.game-button').forEach(button => {
        button.addEventListener('click', () => {
            playGame(button.dataset.choice);
        });
    });
});

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    if (!email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    const user = userManager.authenticate(email, password);
    if (user) {
        alert(`Bienvenido, ${user.name}!`);
        showGame();
    } else {
        alert('Correo o contraseña incorrectos.');
    }
}

function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    if (!name || !email || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }
    userManager.registerUser(name, email, password);
    alert('Registro exitoso! Ahora puedes iniciar sesión.');
    showLogin();
}

function showRegister() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.remove('hidden');
}

function showLogin() {
    document.getElementById('register').classList.add('hidden');
    document.getElementById('login').classList.remove('hidden');
}

function showGame() {
    document.getElementById('login').classList.add('hidden');
    document.getElementById('register').classList.add('hidden');
    document.getElementById('game').classList.remove('hidden');
}

function playGame(userChoice) {
    const choices = ['piedra', 'papel', 'tijera'];
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    let result = '';

    // Obtener las rutas de las imágenes
    const Imagenes = {
        piedra: './Imagenes/roca.jpg',
        papel: './Imagenes/papel.jpg',
        tijera: './Imagenes/tijera.jpg'
    };

    if (!choices.includes(userChoice)) {
        result = 'Opción no válida. Elige roca, papel o tijera.';
    } else if (userChoice === computerChoice) {
        result = `¡<span style="color: orange;">Empate</span>! Ambos eligieron <b>${userChoice}</b>.`;
    } else if (
        (userChoice === 'piedra' && computerChoice === 'tijera') ||
        (userChoice === 'papel' && computerChoice === 'piedra') ||
        (userChoice === 'tijera' && computerChoice === 'papel')
    ) {
        result = `¡<span style="color: lightgreen;">Ganaste</span>! <b>${userChoice}</b> vence a <b>${computerChoice}</b>.`;
    } else {
        result = `¡<span style="color: red;">Perdiste</span>! <b>${computerChoice}</b> vence a <b>${userChoice}</b>.`;
    }

    // Actualizar el resultado con texto e imágenes
    const resultContainer = document.getElementById('result');
    resultContainer.innerHTML = `
    <div>
        <h3>Tu elección:</h3>
        <img src="${Imagenes[userChoice]}" alt="${userChoice}" class="result-image">
    </div>
    <div>
        <h3>Elección de la computadora:</h3>
        <img src="${Imagenes[computerChoice]}" alt="${computerChoice}" class="result-image">
    </div>
    <p>${result}</p>
    `;

        // Quitar la clase 'hidden' para mostrar el contenedor
        resultContainer.classList.remove('hidden');
    }

    // Añadir clase a las imágenes de resultado
    document.querySelectorAll('.result-image').forEach(image => {
        image.classList.add('selected-image'); //aplicar el tamaño aumentado también
    });

    



