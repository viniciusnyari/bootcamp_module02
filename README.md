## Curso Imersão da RocketSeat - GoStack

Altamente recomendado esse curso, oferece muito mais que o preço que se paga. Investimento certo.

### ExpressJS: é um microframework de node

## Criando um arquivo 'package.json'
yarn init -y

## package.json
Contém as referências para as dependências dos nossos próprios projetos <br>
Cria-se um pacote que pode ser importado posterior para nossos projetos <br>
{ <br>
  "name": "modulo01", <br>
  "version": "1.0.0", <br>
  "main": "index.js", <br>
  "license": "MIT" <br>
} <br>

## Instalando o 'express' no terminal do VsCode
yarn add express

## Executando 'index.js' no terminal
node index.js

## Tipos de parametrização
// Query paramns = ?users=1 <br>
// Route params = /users/1 <br>
// Request body = {"name": "Vinícius", "email": "viniciusnyari@gmail.com" } <br>

## Chamadas get com 'Query params'
//Retornar mensagem - direto pelo navegador - localhost:3000/users <br>
server.get('/users',(request, response) => { <br>
  return response.send('Hello world'); <br>
}); <br>

## Retornar json - direto pelo navegador - localhost:3000/users
server.get('/users',(request, response) => { <br>
  return response.json({message:'Hello world'}); <br>
}); <br>


## Retornar json conforme parêmtro - direto pelo navegador - localhost:3000/users
server.get('/users',(request, response) => { <br>
   const nome = request.query.nome; <br>
   return response.json({message: `Hello ${nome}!`}); <br>
}); <br>

## Chamadas get com 'Route params'
//Retornar json - direto pelo navegador - localhost:3000/users/123456 <br>
server.get('/users/:id',(request, response) => { <br>
   const id = request.params.id; <br>
   return response.json({message: `Buscando o usuário por route params ${id}!`}); <br>
}); <br>

## Reload da aplicação após salvar - instalando somente 'D' desenvolvimento
yarn add nodemon -D

## Criando um middleware para log - registra todas as requisições
server.use((request, response, next)=> { <br>
  //Exibe todos os métodos e a url <br>
  console.log(`Método: ${request.method}; URL: ${request.url}`) <br>
 <br>
  //Permite que a execução continue <br>
  return next(); <br>
}); <br>

server.use((request, response, next)=> { <br>
  //Permite registrar o início para exibir o tempo que levou <br>
  console.time('Request'); <br>

  //Exibe todos os métodos e a url <br>
  console.log(`Método: ${request.method}; URL: ${request.url}`); <br>

  next(); <br>

  //Registra o final para extrair o tempo decorrido <br>
  console.timeEnd('Request'); <br>
});

## Instalando sucrase e nodemon a nível de Desenvolvimento
sucrase =  importações no formato novo, sem require <br>
nodemon = atualização do js a cada alteração <br>
yarn add sucrase nodemon -D <br>
 <br>
porém ao alterar deve-se rodar pelo sucrase, conforme comando: <br>
yarn sucrase-node src/server.js

## Configurando Windows 10 para habilitar a vitrualização
https://mashtips.com/enable-virtualization-windows-10/

## Instalando o Docker (baixar) - pesquisar docker postgres no google
docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres

## Docker instalado
547d9743d1867a5ccc56c646ad3e4046f0acb1070cacbcebfd882fb726593d8c

## Identificar instalações no docker
docker ps

## Instale o PostBird que é uma IDE pro postgres

## Comando do Docker
Listando em execução: docker ps <br>
Parando: docker stop database <br>
Listando todos: docker ps -a <br>
Iniciando: docker start database <br>
Logs: docker logs database <br>

## Sequelize - ORM
Para cada tabela, uma migration (não pode ter mais de uma tabela em uma migration)

## Seeds - população de dados para desenvolvimento (fakes) - testes
executados somente por códigos

## Métodos do controller
index() //Listagem de usuários <br>
show() //Exibir um único usuário <br>
store() //Cadastrar usuário <br>
update() //Alterar usuário <br>
delete() //Deletar usuário <br>

## Instalando ESLint - para ver se está seguindo um padrão de organização do código, usando os métodos do 'airbnb'
yarn add eslint

## Inicializar um arquivo de configuração do ESLint
yarn eslint --init <br>
? How would you like to use ESLint? To check syntax, find problems, and enforce code style <br>
? What type of modules does your project use? JavaScript modules (import/export) <br>
? Which framework does your project use? None of these <br>
? Does your project use TypeScript? Yes <br>
? Where does your code run? Node <br>
? How would you like to define a style for your project? Use a popular style guide <br>
? Which style guide do you want to follow? Airbnb: https://github.com/airbnb/javascript <br>
? What format do you want your config file to be in? JavaScript <br>
? Would you like to install them now with npm? Yes <br>
 <br>
Removo o arquivo gerado (package.lock.json) e rodo 'yarn' para fazer o mapeamento das novas dependências - gera um arquivo eslint com as configuração

## Alterar as configurações do eslint - adicionar essa configuração no 'settings.json' para que ao salvar
    "[javascript]" : {<br>
        "editor.codeActionsOnSave": {<br>
            "source.fixAll": true,<br>
        }<br>
    },<br>
    "[javascriptreact]": {<br>
        "editor.codeActionsOnSave": {<br>
            "source.fixAll": true,<br>
        }<br>
    }<br>
 
## Configurações do eslint
Ver no arquivo na seção 'rules'

## Instalando a integração entre tudo isso
yarn add prettier eslint-config-prettier eslint-plugin-prettier -D

## Instalar 'EditorConfig for VS Code' nas extensões //faz uma configuração padrão em todos os editores
Após instalar, clicar no botão direito na área de arquivos e 'Generate editorconfig'

## Instalando o sequelize
yarn add sequelize<br>
yarn add sequelize-cli -D //executar as migrations - rodar scripts<br>

## Instalando dialeto do Postgres
yarn add pg pg-hstore

## Gera um template de migrations
yarn sequelize migration:create --name=create-users<br>
gera um arquivo dentro do migration<br>

## Rodando a migrations
Suba o docker<br>
Abra o PostBird<br>
docker start database<br>
yarn sequelize db:migrate<br>

## No PostBird vizualise as tabelas (users e um SequelizeMeta)
SequelizeMeta: contém as migrations que foram executadas<br>
users: usuários cadastrados<br>

## Desfazendo as migrations
Todas: yarn sequelize db:migrate:undo:all<br>
Última: yarn sequelize db:migrate:undo<br>

## Usando senhas com hash
yarn add bcryptjs

## JWT - Json Web Token
Token em formato de json<br>
yarn add jsonwebtoken<br>

## SessionController - segundo parâmetro
md5online (https://www.md5online.org/)<br>
informe uma string aleatória<br>
gobarberrocketseatnode2<br>

## Validando schema - instalando yup
yarn add yup

## Upload de arquivos - MultiPartForm - multer
yarn add multer

## Sequelize - Criando tabela de arquivos
yarn sequelize migration:create --name=create-files

## Sequelize - criando tabela appointment
yarn sequelize migration:create --name=create-appointments

## Trabalhando com datas dentro do node (esse @next indica que desejo a versão mais atual)
yarn add date-fns@next

## Criando um banco de dados não relacional usando MongoDB no docker
Vai tentar encontrar local essa imagem, caso não encontrar, irá baixar essa imagem<br>
docker run --name mongobarber -p 27017:27017 -d -t mongo<br>
Para saber se deu tudo certo digite no chrome: http://localhost:27017<br>
Resposta: It looks like you are trying to access MongoDB over HTTP on the native driver port.<br>

## Adicionando Mongoose para o MongoDB instalado acima
yarn add mongoose

## Acessando os dados do MongoDB
Baixar o MongoDB Compass e conectar usando localhost e a porta 27017<br>
O sistema criará um novo database chamado gobarber conforme especificado no código para armazenar as notificações

## Biblioteca para envio de e-mails - nodemailer
yarn add nodemailer

## Enviando e-mails - mailtrap - acesse no google e crie uma conta - funciona somente em DEV
Crie uma conta e uma caixa de e-mail chamada GoBarber<br>
https://mailtrap.io/inboxes/892239/messages/1659665495<br>

## Template engine - usando template para customizar os e-mails
handlebars - https://handlebarsjs.com/<br>
yarn add express-handlebars nodemailer-express-handlebars<br>

## Trabalhando com backgroud jobs - persistindo no Redis (banco de dados chave valor superperformático)
Instalando imagem do redis no docker<br>
docker run --name redisbarber -p 6379:6379 -d -t redis:alpine<br>
52e54c235851e2b1bfa7e01ba4aec79fa0d5b72141bb983a8369ed2d0217c13a<br>

## Instalando bee-queue - para trabalhar com filas - https://github.com/bee-queue/bee-queue
yarn add bee-queue


## Instalando `Cors` - Permite que outras aplicações acessem nosso backend
yarn add cors

##Habilitando a virtualização
Enable-WindowsOptionalFeature -Online -FeatureName Microsoft-Hyper-V -All

##  Rodando a aplicação
yarn sucrase-node src/server.js

## Outras informações
------------------------------------------------------------------------------------------------<br>
tokens - alterado o token da aplicação para provider<br>
------------------------------------------------------------------------------------------------<br>
token de 'Vinicius provider'<br>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiaWF0IjoxNTg2OTEwMDAxLCJleHAiOjE1ODc1MTQ4MDF9.qvHuQVeZJUc83pssRMuyB-scum_AdEXBSnfQHumMADs<br>

token de 'Vinicius user'<br>
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwiaWF0IjoxNTk0NDcyNTg4LCJleHAiOjE1OTUwNzczODh9.xqSIABwrP8U-8_0j8xwr_RPzpjvAuLg6RUctBETv4Uc<br>

##  Local
C:\Temp\Bootcamp2019\bootcamp_modulo02


https://app.rocketseat.com.br/node/gobarber-web
Parei no 03:21

## Passos importantes para o backend funcionar

### Deixar os serviços do docker rodando - subir docker desktop
PS C:\Temp\Bootcamp2019\bootcamp_modulo02> docker ps -a
PS C:\Temp\Bootcamp2019\bootcamp_modulo02> docker start database
PS C:\Temp\Bootcamp2019\bootcamp_modulo02> docker start mongobarber
PS C:\Temp\Bootcamp2019\bootcamp_modulo02> docker start redisbarber

### Deixar rodando o servidor backend
Em um outro terminal, acessar essa pasta `C:\Temp\Bootcamp2019\bootcamp_modulo02` e rodar `yarn sucrase-node src/server.js`

