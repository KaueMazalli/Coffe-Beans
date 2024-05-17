document.addEventListener('DOMContentLoaded', function () {
    const switchers = [...document.querySelectorAll('.switcher')];
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.querySelector('.form-signup');
    const passwordLogin = document.getElementById('login-password');
    const passwordSignup = document.getElementById('signup-password');
    const confirmPasswordSignup = document.getElementById('signup-password-confirm');
    const agreeCheckbox = document.getElementById('agree-checkbox');

    switchers.forEach(item => {
        item.addEventListener('click', function () {
            switchers.forEach(item => item.parentElement.classList.remove('is-active'));
            this.parentElement.classList.add('is-active');
        });
    });

    function validatePasswordStrength(password) {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;
        return passwordRegex.test(password);
    }

    function validatePasswords() {
        const password = passwordSignup.value;
        const confirmPassword = confirmPasswordSignup.value;

        if (password !== confirmPassword) {
            alert('As senhas não estão iguais!');
            return false;
        }

        if (!validatePasswordStrength(password)) {
            alert('A senha deve ter pelo menos 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.');
            return false;
        }

        return true;
    }
   
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const password = passwordLogin.value;

        if (!validatePasswordStrength(password)) {
            alert('A senha deve ter pelo menos 8 caracteres, incluindo pelo menos 1 letra maiúscula, 1 número e 1 caractere especial.');
        } else {
            alert('Login realizado com sucesso!');
            window.location.href = '/home.html';  
        }
    });
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const username = document.getElementById('login-email').value;
        const password = passwordLogin.value;

        if (username === 'admin@gmail.com' && validatePasswordStrength(password)) {
            // Se as credenciais do administrador forem válidas, redirecione para a outra página
            window.location.href = '/Dashboard/template/index.html';
        } 
    });
 

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        if (validatePasswords()) {
            alert('Cadastro realizado com sucesso!');
            window.location.href = '/home.html';        }
    });
});

  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
  };

  googleSignIn().addEventListener('submit', function (event) {
    event.preventDefault();

    
        window.location.href = '/home.html';        }
);