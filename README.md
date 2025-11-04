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
├── index.html           # Página inicial
├── vagas.html           # Listagem de vagas disponíveis
├── candidatar.html      # Formulário de candidatura
├── admin.html           # Área administrativa (protegida por login)
├── assets/
│   └── styles.css       # Estilos do site
└── scripts/
    ├── admin.js         # Funcionalidades da área administrativa
    └── form.js          # Validação e envio do formulário de candidatura
```

## Tecnologias Utilizadas

- HTML5 semântico
- CSS3 com design responsivo
- JavaScript vanilla
- LocalStorage para armazenamento de dados
- Acessibilidade implementada (skip-links, ARIA, etc.)

## Recursos de Acessibilidade

- Skip-links para navegação por teclado
- Landmarks semânticos (header, nav, main, footer, etc.)
- Atributos ARIA para melhor navegação por leitores de tela
- Formulários com labels associados e autocomplete
- Tabelas com caption e scope para melhor compreensão

## Como Executar

1. Clone ou baixe este repositório
2. Abra os arquivos HTML em qualquer navegador moderno
3. Para acessar a área administrativa, use:
   - Usuário: aliceVasques
   - Senha: 123456

## Armazenamento de Dados

O sistema utiliza LocalStorage para armazenar as candidaturas e o estado de autenticação. Isso significa que:

- Os dados são armazenados apenas no navegador do usuário
- Os dados persistem entre sessões no mesmo navegador
- Os dados não são compartilhados entre diferentes navegadores ou dispositivos
- Os dados podem ser limpos através da opção na área administrativa

## Melhorias Futuras

- Implementação de backend para armazenamento persistente
- Sistema de notificação por email para novas candidaturas
- Filtros avançados para busca de candidatos
- Exportação de dados em diferentes formatos
- Implementação de testes automatizados

---

Desenvolvido como projeto demonstrativo para o Restaurante Sabores da Casa.