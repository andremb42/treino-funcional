# Treino Funcional — Guia de Deploy

## O que você vai precisar

- Um computador (Mac, Windows ou Linux)
- Uma conta no GitHub (gratuita) → github.com
- Uma conta na Vercel (gratuita) → vercel.com
- Node.js instalado → nodejs.org (baixe a versão LTS)

## Passo a Passo

### 1. Instalar o Node.js

Acesse **nodejs.org** e baixe a versão **LTS** (Long Term Support).
Instale normalmente (próximo, próximo, concluir).

Para verificar se instalou, abra o Terminal (Mac) ou CMD/PowerShell (Windows) e digite:

```
node --version
```

Deve aparecer algo como `v20.x.x` ou superior.


### 2. Criar o projeto na sua máquina

Abra o Terminal e execute esses comandos um por um:

```bash
# Criar a pasta do projeto
mkdir treino-funcional
cd treino-funcional
```

Agora copie os arquivos que eu gerei para dentro dessa pasta. A estrutura deve ficar assim:

```
treino-funcional/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── icon-192.png
│   └── icon-512.png
└── src/
    ├── main.jsx
    └── App.jsx       ← este é o arquivo treino-app-v2.jsx renomeado
```

**Dica:** O arquivo `treino-app-v2.jsx` que eu gerei deve ser salvo como `src/App.jsx`.


### 3. Instalar as dependências

No Terminal, dentro da pasta do projeto:

```bash
npm install
```

Vai aparecer uma barra de progresso. Espere terminar.


### 4. Testar localmente

```bash
npm run dev
```

Vai aparecer algo como:

```
  VITE v6.x.x  ready in 300 ms

  ➜  Local:   http://localhost:5173/
```

Abra **http://localhost:5173/** no navegador. O app deve aparecer funcionando.

Para parar o servidor local, aperte `Ctrl + C` no Terminal.


### 5. Criar repositório no GitHub

1. Acesse **github.com** e faça login
2. Clique no botão **"+"** no canto superior direito → **New repository**
3. Nome: `treino-funcional`
4. Deixe como **Public**
5. NÃO marque "Add a README file"
6. Clique **Create repository**

O GitHub vai mostrar comandos. No Terminal, dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "primeiro commit"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/treino-funcional.git
git push -u origin main
```

**Substitua** `SEU-USUARIO` pelo seu nome de usuário do GitHub.

Se pedir senha, o GitHub agora usa **tokens**. Vá em:
Settings → Developer settings → Personal access tokens → Generate new token.
Use o token no lugar da senha.


### 6. Deploy na Vercel

1. Acesse **vercel.com** e faça login com sua conta GitHub
2. Clique **"Add New..."** → **Project**
3. Ele vai listar seus repositórios. Selecione **treino-funcional**
4. Nas configurações:
   - Framework Preset: **Vite** (deve detectar automaticamente)
   - Build Command: `npm run build`
   - Output Directory: `dist`
5. Clique **Deploy**
6. Espere ~1 minuto. Quando terminar, a Vercel vai te dar uma URL tipo:
   `https://treino-funcional.vercel.app`

**Pronto! Seu app está no ar.**


### 7. Instalar no celular como app (PWA)

#### iPhone (Safari):
1. Abra a URL do app no **Safari** (não funciona no Chrome do iPhone)
2. Toque no botão de **compartilhar** (quadrado com seta pra cima)
3. Role pra baixo e toque em **"Adicionar à Tela de Início"**
4. Dê o nome "Treino" e toque em **Adicionar**

#### Android (Chrome):
1. Abra a URL no **Chrome**
2. Toque nos **3 pontos** no canto superior direito
3. Toque em **"Adicionar à tela inicial"** ou **"Instalar app"**
4. Confirme

Agora o app aparece como um ícone na sua tela inicial e abre em tela cheia, sem barra do navegador.


### 8. Atualizações futuras

Quando quiser atualizar o app (mudar exercícios, ajustar algo):

1. Edite os arquivos na pasta do projeto
2. Teste localmente com `npm run dev`
3. Quando estiver bom:

```bash
git add .
git commit -m "descrição da mudança"
git push
```

A Vercel detecta automaticamente o push e faz o redeploy. Em ~1 minuto a versão nova está no ar. No celular, basta fechar e reabrir o app.


## Dúvidas comuns

**P: Os dados do treino ficam salvos onde?**
R: No localStorage do navegador do seu celular. Se limpar os dados do navegador, perde o histórico. Não são sincronizados entre dispositivos.

**P: Funciona offline?**
R: Sim, após a primeira visita o PWA cacheia tudo. Você pode registrar treinos sem internet. Os dados ficam no celular.

**P: Quanto custa?**
R: Zero. GitHub, Vercel e o app são 100% gratuitos para uso pessoal.

**P: Posso usar um domínio personalizado?**
R: Sim, na Vercel você pode configurar um domínio próprio (ex: treino.seudominio.com), mas precisa comprar o domínio separadamente.

**P: E se eu quiser mudar os exercícios?**
R: Edite o objeto `WORKOUTS` no arquivo `src/App.jsx`. A estrutura é bem legível — cada exercício tem id, name, sets, reps e descrição.
