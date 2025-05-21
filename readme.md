# 📚 Libris Mobile - Sistema de Empréstimos de Biblioteca

Aplicativo mobile para gerenciamento de empréstimos de livros em bibliotecas acadêmicas. Desenvolvido com React Native e Expo.

<div align="center">
  <img src="/assets/images/libris3.png" width="200" alt="Logo Libris">

![GitHub last commit](https://img.shields.io/github/last-commit/MathiasTAR/LibrisMobile)
![GitHub repo size](https://img.shields.io/github/repo-size/MathiasTAR/LibrisMobile)

</div>

---

## ✨ Demonstração

| Tela de Login                                             | Tela de Status dos Livros                              | Tela de Perfil do Usuário                                  | Tela de Configurações
| --------------------------------------------------------- | --------------------------------------------------------- | ---------------------------------------------------------- | ----------------------------------------- |
| <img src="/assets/images/telalogin" width="200"> | <img src="/assets/images/menubiblioteca" width="200"> | <img src="/assets/images/menuusuario" width="200"> | Em Desenvolvimento

---

## 🚀 Funcionalidades

- 📖 Listagem de Empréstimos Ativos e Atrasados
- 📅 Verificação automática de status (ativo/atrasado)
- 👤 Visualização de informações do usuário (nome, matrícula, telefone etc.)
- 🔍 Barra de pesquisa para facilitar a navegação
- 💡 Cards com UI moderna e bordas coloridas por status

---

## 🛠 Tecnologias

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [Styled Components](https://styled-components.com/) / StyleSheet
- [TypeScript](https://www.typescriptlang.org/)
- [React Navigation](https://reactnavigation.org/)
- [@expo/vector-icons](https://icons.expo.fyi/) + [Phosphor Icons](https://phosphoricons.com/)

---

## 📌 Próximos Passos

- [ ] ⚙️ Adicionar configurações (modo escuro, notificações)
- [x] 🔐 Implementar autenticação de usuários
- [x] 🔄 Conectar com backend (Node.js + MySQL)
- [ ] 🔔 Notificações para devoluções pendentes
- [ ] 🎨 Melhorar responsividade para diferentes tamanhos de tela

---

🤝 Como Contribuir

1. Faça um fork do projeto
2. Crie uma branch para sua feature (git checkout -b feature/nova-feature)
3. Commit suas alterações (git commit -m 'feat: nova feature')
4. Faça push da branch (git push origin feature/nova-feature)
5. Abra um Pull Request

---

## 🔧 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)  

- Recomenda-se instalar o app Expo Go no [Android](https://play.google.com/store/apps/details?id=host.exp.exponent) ou [iOS](https://apps.apple.com/app/expo-go/id982107779)

### Passos para rodar localmente

```bash
# Clone o repositório:
git clone https://github.com/MathiasTAR/LibrisMobile.git

# Acesse a pasta do projeto:
cd LibrisMobile

# Instale as dependências:
npm install
npm install -g expo-cli

# Rode o App
npx expo start / npm start
