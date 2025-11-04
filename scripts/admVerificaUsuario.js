// Verificação de usuário para a área administrativa
// Define e controla autenticação usando LocalStorage

const AUTH_KEY = 'rhdp_admin_auth';
const USERNAME = 'aliceVasques';
const PASSWORD = '123456';

function isAuthed() {
  return localStorage.getItem(AUTH_KEY) === 'true';
}

function requireAuth() {
  const loginSec = document.getElementById('login');
  const gestaoSec = document.getElementById('gestao');
  if (isAuthed()) {
    if (loginSec) loginSec.classList.add('hidden');
    if (gestaoSec) gestaoSec.classList.remove('hidden');
    return true;
  } else {
    if (gestaoSec) gestaoSec.classList.add('hidden');
    if (loginSec) loginSec.classList.remove('hidden');
    return false;
  }
}

function handleLogin(e) {
  e.preventDefault();
  const user = document.getElementById('loginUsuario').value.trim();
  const pass = document.getElementById('loginSenha').value;
  const status = document.getElementById('login-status');
  if (user === USERNAME && pass === PASSWORD) {
    localStorage.setItem(AUTH_KEY, 'true');
    status.textContent = 'Login realizado com sucesso!';
    requireAuth();
    if (typeof initGestao === 'function') initGestao();
  } else {
    status.textContent = 'Login ou senha inválidos.';
  }
}

function logout() {
  localStorage.removeItem(AUTH_KEY);
  requireAuth();
}