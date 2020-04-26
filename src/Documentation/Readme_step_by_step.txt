ExpressJS: é um microframework de node

1)Criando um arquivo 'package.json'
yarn init -y

2)package.json
Contém as referências para as dependências dos nossos próprios projetos
Cria-se um pacote que pode ser importado posterior para nossos projetos
{
  "name": "modulo01",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT"
}

3) Instalando o 'express' no terminal do VsCode
yarn add express

4) Executando 'index.js' no terminal
node index.js

5) Tipos de parametrização
// Query paramns = ?users=1
// Route params = /users/1
// Request body = {"name": "Vinícius", "email": "viniciusnyari@gmail.com" }

6) Chamadas get com 'Query params'
//Retornar mensagem - direto pelo navegador - localhost:3000/users
server.get('/users',(request, response) => {
  return response.send('Hello world');
});

//Retornar json - direto pelo navegador - localhost:3000/users
server.get('/users',(request, response) => {
  return response.json({message:'Hello world'});
});


//Retornar json conforme parêmtro - direto pelo navegador - localhost:3000/users
server.get('/users',(request, response) => {
   const nome = request.query.nome;
   return response.json({message: `Hello ${nome}!`});
});

7) Chamadas get com 'Route params'
//Retornar json - direto pelo navegador - localhost:3000/users/123456
server.get('/users/:id',(request, response) => {
   const id = request.params.id;
   return response.json({message: `Buscando o usuário por route params ${id}!`});
});

8) Reload da aplicação após salvar - instalando somente 'D' desenvolvimento
yarn add nodemon -D

9) Criando um middleware para log - registra todas as requisições
server.use((request, response, next)=> {
  //Exibe todos os métodos e a url
  console.log(`Método: ${request.method}; URL: ${request.url}`)

  //Permite que a execução continue
  return next();
});

server.use((request, response, next)=> {
  //Permite registrar o início para exibir o tempo que levou
  console.time('Request');

  //Exibe todos os métodos e a url
  console.log(`Método: ${request.method}; URL: ${request.url}`);

  next();

  //Registra o final para extrair o tempo decorrido
  console.timeEnd('Request');
});

10) Instalando sucrase e nodemon a nível de Desenvolvimento
sucrase =  importações no formato novo, sem require
nodemon = atualização do js a cada alteração
yarn add sucrase nodemon -D

porém ao alterar deve-se rodar pelo sucrase, conforme comando:
yarn sucrase-node src/server.js

11) Configurando Windows 10 para habilitar a vitrualização
https://mashtips.com/enable-virtualization-windows-10/

12) Instalando o Docker (baixar) - pesquisar docker postgres no google
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

13) Docker instalado
547d9743d1867a5ccc56c646ad3e4046f0acb1070cacbcebfd882fb726593d8c

14) Identificar instalações no docker
docker ps

15) Instale o PostBird que é uma IDE pro postgres

16) Comando do Docker
Listando em execução: docker ps
Parando: docker stop database
Listando todos: docker ps -a
Iniciando: docker start database
Logs: docker logs database

17) Sequelize - ORM
Para cada tabela, uma migration (não pode ter mais de uma tabela em uma migration)

18) Seeds - população de dados para desenvolvimento (fakes) - testes
executados somente por códigos

19) Métodos do controller
index() //Listagem de usuários
show() //Exibir um único usuário
store() //Cadastrar usuário
update() //Alterar usuário
delete() //Deletar usuário

20) Instalando ESLint - para ver se está seguindo um padrão de organização do código, usando os métodos do 'airbnb'
yarn add eslint

21) Inicializar um arquivo de configuração do ESLint
yarn eslint --init
? How would you like to use ESLint? To check syntax, find problems, and enforce code style
? What type of modules does your project use? JavaScript modules (import/export)
? Which framework does your project use? None of these
? Does your project use TypeScript? Yes
? Where does your code run? Node
? How would you like to define a style for your project? Use a popular style guide
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript
? What format do you want your config file to be in? JavaScript
? Would you like to install them now with npm? Yes

Removo o arquivo gerado (package.lock.json) e rodo 'yarn' para fazer o mapeamento das novas dependências - gera um arquivo eslint com as configuração

22) Alterar as configurações do eslint - adicionar essa configuração no 'settings.json' para que ao salvar
    "[javascript]" : {
        "editor.codeActionsOnSave": {
            "source.fixAll": true,
        }
    },
    "[javascriptreact]": {
        "editor.codeActionsOnSave": {
            "source.fixAll": true,
        }
    }

23) Configurações do eslint
Ver no arquivo na seção 'rules'

24) Instalando a integração entre tudo isso
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

25) Instalar 'EditorConfig for VS Code' nas extensões //faz uma configuração padrão em todos os editores
Após instalar, clicar no botão direito na área de arquivos e 'Generate editorconfig'

26) Instalando o sequelize
yarn add sequelize
yarn add sequelize-cli -D //executar as migrations - rodar scripts

27) Instalando dialeto do Postgres
yarn add pg pg-hstore

28) Gera um template de migrations
yarn sequelize migration:create --name=create-users
gera um arquivo dentro do migration

29) Rodando a migrations
Suba o docker
Abra o PostBird
docker start database
yarn sequelize db:migrate

30) No PostBird vizualise as tabelas (users e um SequelizeMeta)
SequelizeMeta: contém as migrations que foram executadas
users: usuários cadastrados

31)Desfazendo as migrations
Todas: yarn sequelize db:migrate:undo:all
Última: yarn sequelize db:migrate:undo

32) Usando senhas com hash
yarn add bcryptjs

33) JWT - Json Web Token
Token em formato de json
yarn add jsonwebtoken

34) SessionController - segundo parâmetro
md5online (https://www.md5online.org/)
informe uma string aleatória
gobarberrocketseatnode2

35) Validando schema - instalando yup
yarn add yup

36) Upload de arquivos - MultiPartForm - multer
yarn add multer

37) Sequelize - Criando tabela de arquivos
yarn sequelize migration:create --name=create-files

38) Sequelize - criando tabela appointment
yarn sequelize migration:create --name=create-appointments

39) Trabalhando com datas dentro do node (esse @next indica que desejo a versão mais atual)
yarn add date-fns@next


40) Criando um banco de dados não relacional usando MongoDB no docker
Vai tentar encontrar local essa imagem, caso não encontrar, irá baixar essa imagem
docker run --name mongobarber -p 27017:27017 -d -t mongo
Para saber se deu tudo certo digite no chrome: http://localhost:27017
Resposta: It looks like you are trying to access MongoDB over HTTP on the native driver port.

41) Adicionando Mongoose para o MongoDB instalado acima
yarn add mongoose

42)Acessando os dados do MongoDB
Baixar o MongoDB Compass e conectar usando localhost e a porta 27017
O sistema criará um novo database chamado gobarber conforme especificado no código para armazenar as notificações

43) Biblioteca para envio de e-mails - nodemailer
yarn add nodemailer

44) Enviando e-mails - mailtrap - acesse no google e crie uma conta - funciona somente em DEV
Crie uma conta e uma caixa de e-mail chamada GoBarber
https://mailtrap.io/inboxes/892239/messages/1659665495

45) Template engine - usando template para customizar os e-mails
handlebars - https://handlebarsjs.com/
yarn add express-handlebars nodemailer-express-handlebars

46) Trabalhando com backgroud jobs - persistindo no Redis (banco de dados chave valor superperformático)
Instalando imagem do redis no docker
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
52e54c235851e2b1bfa7e01ba4aec79fa0d5b72141bb983a8369ed2d0217c13a

47) Instalando bee-queue - para trabalhar com filas - https://github.com/bee-queue/bee-queue
yarn add bee-queue

#Obter Unix Timestamp de uma data
Ou usa-se a ferramenta de Console do Chrome ou https://www.unixtimestamp.com/
new Date().getTime()


yarn sucrase-node src/server.js

------------------------------------------------------------------------------------------------
tokens - alterado o token da aplicação para provider
------------------------------------------------------------------------------------------------
token de 'Vinicius provider'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTg3ODY1MjY4LCJleHAiOjE1ODg0NzAwNjh9.xH8EExjMPt3m2VY1Yex1uUqxSbmJfsRnYRK9hkBHDuY

token de 'Vinicius user'
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTg3ODY1MzQzLCJleHAiOjE1ODg0NzAxNDN9.W2SYWwV4DgAmoq8hHEBxMJsPeWakdnA0c6QGbg-7Y9A

123456789 = '$2a$08$8U.tbbqCGIrLEtYlAyR9KOPCo5dIy1h0GJhWQrJXtHHJ5TDyYnX4y'

C:\Temp\Bootcamp2019\bootcamp_modulo02



















