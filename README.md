# 👥 User Management Frontend

Este é o **frontend React** da aplicação de gerenciamento de usuários. Ele permite autenticação, cadastro e controle de permissões (roles) entre usuários comuns e administradores.

---

## 🚀 Como rodar localmente

### ✅ Pré-requisitos

- Node.js instalado (versão 18 ou superior recomendada)
- npm ou yarn
- Backend rodando localmente ou em ambiente de produção

---

### 📥 Passos para rodar o projeto

1. **Clone o repositório:**

```bash
git clone https://github.com/seu-usuario/user-management-frontend.git
cd user-management-frontend
```

### 📦 Instale as dependências
```bash
npm install
# ou
yarn install
```

### Configure as variáveis de ambiente:

Crie um arquivo .env na raiz do projeto e adicione a seguinte linha:

```env
REACT_APP_API_URL=https://usermanagement.duckdns.org
```
ℹ️ Se for rodar o backend localmente, substitua pela URL do backend local, por exemplo:

```env
REACT_APP_API_URL=http://localhost:3000
```

### Execute o projeto:

```bash
npm start
# ou
yarn start
```

A aplicação estará disponível em: http://localhost:3000 (ou na porta definida).

### 🔐 Credenciais de Acesso
👤 Usuário administrador (admin)
Email: admin@email.com

Senha: admin

### 🔄 Fluxo de uso recomendado
Acesse a aba Register e crie um novo usuário comum.

Em seguida, faça login como admin usando as credenciais acima.

Vá até a tela de Users.

Altere a role do novo usuário de user para admin.

Apenas usuários com role admin podem visualizar e editar as permissões de outros usuários.

### ⚙️ Funcionalidades
Registro e login com autenticação JWT

Proteção de rotas por tipo de usuário (user vs admin)

Edição de roles (permissões)

Interface limpa e responsiva com Material UI

Integração com backend NestJS

