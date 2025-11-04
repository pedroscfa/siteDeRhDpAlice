# RHDP - Restaurante Sabores da Casa

Sistema de recrutamento e gestão de candidaturas para o Restaurante Sabores da Casa, localizado em Carangola/MG.

![Logo do Restaurante](🍽️) Sabores da Casa

## Sobre o Projeto

O RHDP (Recursos Humanos Departamento Pessoal) é um sistema web para gerenciamento de vagas e candidaturas do restaurante Sabores da Casa. O sistema permite que candidatos visualizem vagas disponíveis e enviem suas candidaturas, enquanto a equipe de gestão pode acessar e gerenciar as candidaturas recebidas.

### Características do Restaurante

- Self-service por quilo
- Atendimento de segunda a sábado, das 11h às 15h
- Capacidade para 24 clientes
- Localização: Rua Abílio Coimbra, Triângulo 3 — Carangola/MG
- Estrutura: Cozinha e salão reformados, buffet adaptado

## Funcionalidades

### Área Pública

- **Página Inicial**: Apresentação do restaurante e chamadas para candidaturas
- **Vagas**: Listagem de vagas disponíveis com descrições e requisitos
- **Candidatura**: Formulário para envio de candidaturas com validação de dados

### Área Administrativa

- **Login**: Sistema de autenticação para acesso à área de gestão
  - Usuário: aliceVasques
  - Senha: 123456
- **Gestão de Candidaturas**: Visualização, filtragem e exportação de candidaturas
- **Controle de Dados**: Opção para limpar dados armazenados localmente

## Estrutura do Projeto

```
├── index.html               # Página inicial
├── vagas.html               # Listagem de vagas disponíveis
├── candidatar.html          # Formulário de candidatura
├── admin.html               # Área administrativa (protegida por login)
├── assets/
│   ├── base.css             # Estilos base comuns a todas as páginas
│   ├── index.css            # Estilos específicos da página inicial
│   ├── vagas.css            # Estilos específicos da página de vagas
│   ├── candidatar.css       # Estilos específicos do formulário de candidatura
│   └── admin.css            # Estilos específicos da área administrativa
└── scripts/
    ├── admVerificaUsuario.js# Verificação de usuário (auth) e utilitários
    ├── admin.js             # Funcionalidades da área administrativa
    └── form.js              # Validação, salvamento local e envio de e-mail
```

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com design responsivo
- JavaScript vanilla
- LocalStorage para armazenamento de dados
- Acessibilidade implementada (skip-links, ARIA, etc.)
 
## Autenticação (Admin)
 
- A lógica de autenticação foi separada em `scripts/admVerificaUsuario.js`.
- Funções disponíveis: `isAuthed`, `requireAuth`, `handleLogin`, `logout`.
- Credenciais padrão da área administrativa:
  - Usuário: `aliceVasques`
  - Senha: `123456`

## Recursos de Acessibilidade

- Skip-links para navegação por teclado
- Landmarks semânticos (header, nav, main, footer, etc.)
- Atributos ARIA para melhor navegação por leitores de tela
- Formulários com labels associados e autocomplete
- Tabelas com caption e scope para melhor compreensão

## Como Executar

1. Clone ou baixe este repositório
2. Abra os arquivos HTML em qualquer navegador moderno

Opcional: sirva os arquivos com um servidor estático para testar melhor rotas relativas.
- Exemplo com Node.js: `npx serve` no diretório do projeto.

## Armazenamento de Dados

O sistema utiliza LocalStorage para armazenar as candidaturas e o estado de autenticação. Isso significa que:

- Os dados são armazenados apenas no navegador do usuário
- Os dados persistem entre sessões no mesmo navegador
- Os dados não são compartilhados entre diferentes navegadores ou dispositivos
- Os dados podem ser limpos através da opção na área administrativa
 
## Envio de E-mail (Formulário de Candidatura)
 
- Além do salvamento local em `LocalStorage`, o formulário pode enviar os dados por e-mail via um serviço externo (Formspree).
- Configurações ficam em `scripts/form.js`:
  - `const EMAIL_ENDPOINT = 'https://formspree.io/f/<ID_DO_FORM>';`
  - `const EMAIL_TO = 'saboresdacasa.rest@gmail.com';`
- Para ativar:
  - Crie uma conta no Formspree e um formulário para obter o endpoint no formato `https://formspree.io/f/<id>`.
  - Substitua o valor de `EMAIL_ENDPOINT` pelo endpoint do seu formulário.
  - Garanta que o e-mail de destino está verificado/ativo no painel do Formspree.
- Mensagens de status aparecem no elemento `#form-status` em `candidatar.html`.

## Melhorias Futuras

- Implementação de backend para armazenamento persistente
- Sistema de notificação por email para novas candidaturas
- Evoluir o envio de e-mail para backend próprio com fila de mensagens
- Filtros avançados para busca de candidatos
- Exportação de dados em diferentes formatos
- Implementação de testes automatizados

---

Desenvolvido como projeto demonstrativo para o Restaurante Sabores da Casa.