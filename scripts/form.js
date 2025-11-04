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

function onSubmit(e) {
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
    status.textContent = 'Candidatura enviada com sucesso!';
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