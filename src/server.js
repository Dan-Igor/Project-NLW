const express = require("express");
const server = express()

//Configurar pasta Public para ser static
server.use(express.static("public"))

//HABILITANDO O REQ.BODY
server.use(express.urlencoded({extended: true}))
//configurando NUNJUCKS
const nunjucks = require('nunjucks')
nunjucks.configure("src/view", {
  express: server,
  noCache: true
})

//importando o banco de dados
const db = require("./database/db")

//configurar a pagina inicial
server.get("/", (req, res) =>{
  return res.render("index.html")
})

//configurar página create-point
server.get("/create-point", (req, res) =>{

  //req.query: Query strings da url
  console.log(req.query)


  return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {

  //req.body: nós retorna os query strings 
  // inserir dados em uma tabela
  const query = `
  INSERT INTO places (
    image,
    name,
    address,
    address2,
    state,
    city,
    items
  ) VALUES (?,?,?,?,?,?,?)
`
  const values = [
    req.body.image,
    req.body.name,
    req.body.address,
    req.body.address2,
    req.body.state,
    req.body.city,
    req.body.items
  ];

  function afterInsertData(err){
    if(err){
      return console.log(err)
    }

    console.log("Cadastrado com sucesso!")
    console.log(this)
    return res.render("create-point.html", {saved: true})
  }

  db.run(query, values, afterInsertData)
})

//configurar página search-results
server.get("/search-results", (req, res) =>{

  const search = req.query.search

  if(search === ""){
    return res.render("search-results.html", {total: 0})
  }

  //pegar dados do banco de dados
  db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
    if(err){
      console.log(err);
    }

    const total = rows.length

    return res.render("search-results.html", {places: rows, total})
  })
})

//ligando o servidor para ouvir a porta 3000
server.listen(3000)