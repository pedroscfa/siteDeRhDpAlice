// Util simples para ler parâmetros da URL (pré-seleção de cargo)
function getQueryParam(name) {
  const params = new URLSearchParams(window.location.search);
  return params.get(name);
}

function preselectCargo() {
  const cargoParam = getQueryParam('cargo');
  if (!cargoParam) return;
  const cargoSelect = document.getElementById('cargo');
  if (cargoSelect) {
    const option = [...cargoSelect.options].find(o => o.value === cargoParam);
    if (option) cargoSelect.value = cargoParam;
  }
}

function validate(form) {
  const requiredIds = ['nome', 'email', 'cpf', 'telefone', 'cargo', 'inicio', 'disponibilidade', 'experiencia'];
  let ok = true;
  requiredIds.forEach(id => {
    const el = document.getElementById(id);
    if (!el || !el.value) ok = false;
    if (id === 'cpf' && el && !/^\d{11}$/.test(el.value)) ok = false;
  });
  const lgpd = document.getElementById('lgpd');
  if (!lgpd || !lgpd.checked) ok = false;
  return ok;
}

function saveApplication(payload) {
  const key = 'rhdp_candidaturas';
  const list = JSON.parse(localStorage.getItem(key) || '[]');
  list.push(payload);
  localStorage.setItem(key, JSON.stringify(list));
}

// Parâmetros configuráveis para envio de e-mail
// O endpoint do Formspree deve ser configurado para que o envio de e-mail funcione.
// 1. Crie uma conta em https://formspree.io/
// 2. Crie um novo formulário e substitua a URL abaixo.
const EMAIL_ENDPOINT = 'https://formspree.io/f/mldoyywj'; // <-- SUBSTITUA COM SEU ENDPOINT
// E-mail do destinatário (quem receberá a candidatura).
const EMAIL_TO = 'saboresdacasa.rest@gmail.com';

// Validação do endpoint: precisa ser um endpoint de formulário do Formspree
function isValidEmailEndpoint(url) {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.hostname === 'formspree.io' && u.pathname.startsWith('/f/');
  } catch {
    return false;
  }
}

async function sendEmail(payload) {
  // Não envia se o endpoint não for configurado corretamente
  if (!EMAIL_TO || !isValidEmailEndpoint(EMAIL_ENDPOINT)) {
    return { ok: false, skipped: true };
  }

  const subject = `Nova candidatura – ${payload.nome} (${payload.cargo})`;

  // O Formspree usa o campo `_replyto` para o "Responder a" no e-mail
  const data = {
    ...payload,
    _subject: subject,
    _replyto: payload.email,
  };

  try {
    const res = await fetch(EMAIL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    return { ok: true };
  } catch (err) {
    console.error('Falha no envio de e-mail:', err);
    return { ok: false };
  }
}

async function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const status = document.getElementById('form-status');
  if (!validate(form)) {
    status.textContent = 'Verifique os campos obrigatórios. CPF deve ter 11 dígitos.';
    return;
  }
  const payload = {
    data: new Date().toISOString(),
    nome: document.getElementById('nome').value.trim(),
    email: document.getElementById('email').value.trim(),
    cpf: document.getElementById('cpf').value.trim(),
    telefone: document.getElementById('telefone').value.trim(),
    cargo: document.getElementById('cargo').value,
    inicio: document.getElementById('inicio').value,
    disponibilidade: document.getElementById('disponibilidade').value,
    pretensao: document.getElementById('pretensao').value.trim(),
    experiencia: document.getElementById('experiencia').value.trim(),
    linkcv: document.getElementById('linkcv').value.trim(),
    cidade: document.getElementById('cidade').value.trim(),
  };
  try {
    saveApplication(payload);
    status.textContent = 'Candidatura salva localmente. Enviando e-mail…';
    const emailResult = await sendEmail(payload);
    if (emailResult.ok) {
      status.textContent = 'Candidatura enviada com sucesso! (e-mail enviado)';
    } else if (emailResult.skipped) {
      status.textContent = 'Candidatura salva. Configure EMAIL_ENDPOINT e EMAIL_TO para enviar e-mail.';
    } else {
      status.textContent = 'Candidatura salva, mas falhou o envio de e-mail.';
    }
    form.reset();
  } catch (err) {
    console.error(err);
    status.textContent = 'Falha ao salvar. Tente novamente.';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  preselectCargo();
  const form = document.getElementById('apply-form');
  if (form) form.addEventListener('submit', onSubmit);
});