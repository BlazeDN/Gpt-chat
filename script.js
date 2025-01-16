const authStatus = document.getElementById('auth-status');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const toggleFormBtn = document.getElementById('toggle-form-btn');
const logoutBtn = document.getElementById('logout-btn');

function updateAuthStatus() {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        authStatus.textContent = Вы вошли как ${user.username};
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');
        toggleFormBtn.classList.add('hidden');
        logoutBtn.classList.remove('hidden');
    } else {
        authStatus.textContent = 'Вы не вошли';
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        toggleFormBtn.classList.remove('hidden');
        logoutBtn.classList.add('hidden');
    }
}

toggleFormBtn.addEventListener('click', () => {
    if (registerForm.classList.contains('hidden')) {
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
        toggleFormBtn.textContent = 'Войти';
    } else {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        toggleFormBtn.textContent = 'Зарегистрироваться';
    }
});

document.getElementById('register-btn').addEventListener('click', () => {
    const username = document.getElementById('register-username').value;
    const password = document.getElementById('register-password').value;
    const passwordConfirm = document.getElementById('register-password-confirm').value;
      const users = JSON.parse(localStorage.getItem('users')) || [];

    if (users.find(user => user.username === username)) {
        document.getElementById('register-error').textContent = 'Пользователь с таким логином уже существует.';
        return;
    }

    if (password !== passwordConfirm) {
        document.getElementById('register-error').textContent = 'Пароли не совпадают.';
        return;
    }

    users.push({ username, password });
    localStorage.setItem('users', JSON.stringify(users));
    alert('Регистрация успешна! Теперь вы можете войти.');
});

document.getElementById('login-btn').addEventListener('click', () => {
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        updateAuthStatus();
        setTimeout(() => {
            localStorage.removeItem('currentUser');
            updateAuthStatus();
        }, 30 * 60 * 1000); // 30 минут
    } else {
        document.getElementById('login-error').textContent = 'Неправильный логин или пароль.';
    }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('currentUser');
    updateAuthStatus();
});

// Инициализация
updateAuthStatus();
