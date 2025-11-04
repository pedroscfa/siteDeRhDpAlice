function getApplications() {
  const key = 'rhdp_candidaturas';
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function renderTable(list) {
  const tbody = document.querySelector('#tabelaCandidatos tbody');
  tbody.innerHTML = '';
  list.forEach(item => {
    const tr = document.createElement('tr');
    const cells = [
      new Date(item.data).toLocaleString(),
      item.nome,
      item.email,
      item.telefone,
      item.cpf,
      cargoLabel(item.cargo),
      item.disponibilidade,
      item.experiencia,
      item.pretensao || '-',
      item.linkcv || '-',
      item.cidade || '-',
    ];
    cells.forEach(text => {
      const td = document.createElement('td');
      td.textContent = text;
      tr.appendChild(td);
    });
    tbody.appendChild(tr);
  });
}

function cargoLabel(value) {
  switch (value) {
    case 'auxiliar_cozinha': return 'Auxiliar de Cozinha';
    case 'atendente': return 'Atendente';
    case 'auxiliar_limpeza': return 'Auxiliar de Limpeza';
    default: return value || '-';
  }
}

function exportCSV(list) {
  const headers = ['Data','Nome','Email','Telefone','CPF','Cargo','Disponibilidade','Experiência','Pretensão','Link CV','Cidade/Bairro'];
  const rows = list.map(i => [
    new Date(i.data).toISOString(),
    i.nome,
    i.email,
    i.telefone,
    i.cpf,
    cargoLabel(i.cargo),
    i.disponibilidade,
    i.experiencia,
    i.pretensao || '',
    i.linkcv || '',
    i.cidade || '',
  ]);
  const csv = [headers, ...rows].map(r => r.map(v => '"' + String(v).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url; a.download = 'candidaturas_sabores_da_casa.csv';
  document.body.appendChild(a); a.click();
  document.body.removeChild(a); URL.revokeObjectURL(url);
}

function clearData() {
  localStorage.removeItem('rhdp_candidaturas');
}

function initGestao() {
  const all = getApplications();
  renderTable(all);
  const filtro = document.getElementById('filtroCargo');
  const status = document.getElementById('admin-status');
  if (filtro) {
    filtro.addEventListener('change', () => {
      const val = filtro.value;
      const list = val ? all.filter(i => i.cargo === val) : all;
      renderTable(list);
      status.textContent = val ? `Filtrando por: ${cargoLabel(val)}` : 'Exibindo todas as candidaturas';
    });
  }
  const exportBtn = document.getElementById('btnExport');
  if (exportBtn) exportBtn.addEventListener('click', () => exportCSV(all));
  const clearBtn = document.getElementById('btnClear');
  if (clearBtn) clearBtn.addEventListener('click', () => {
    if (confirm('Tem certeza que deseja limpar os dados locais?')) {
      clearData();
      status.textContent = 'Dados locais limpos. Recarregue a página para atualizar a tabela.';
    }
  });
  const logoutBtn = document.getElementById('btnLogout');
  if (logoutBtn) logoutBtn.addEventListener('click', logout);
}

document.addEventListener('DOMContentLoaded', () => {
  requireAuth();
  const loginForm = document.getElementById('login-form');
  if (loginForm) loginForm.addEventListener('submit', handleLogin);
  if (isAuthed()) initGestao();
});