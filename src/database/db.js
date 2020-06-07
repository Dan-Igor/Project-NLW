// importando a dependencia
const sqlite3 = require("sqlite3").verbose()

// instanciando um objeto db
const db = new sqlite3.Database("./src/database/database.db")

module.exports = db


// //utilizar o objeto de banco de dados
// db.serialize(() => {

//   // criando uma tabela se não existir
//   db.run(`
//     CREATE TABLE IF NOT EXISTS places (
//       id INTEGER PRIMARY KEY AUTOINCREMENT,
//       image TEXT,
//       name TEXT,
//       address TEXT,
//       address2 TEXT,
//       state TEXT,
//       city TEXT,
//       items TEXT
//     );
//   `)

//   //inserir dados em uma tabela
//   const query = `
//   INSERT INTO places (
//     image,
//     name,
//     address,
//     address2,
//     state,
//     city,
//     items
//   ) VALUES (?,?,?,?,?,?,?)
// `
//   const values = [
//     "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1101&q=80",
//     "Collectoria",
//     "Guilherme Gemballa, Jardim América",
//     "260",
//     "Santa Catarina",
//     "Rio do Sul",
//     "Resíduos eletrônicos, lâmpadas"
//   ];

//   function afterInsertData(err){
//     if(err){
//       return console.log(err)
//     }

//     console.log("Cadastrado com sucesso!")
//     console.log(this)
//   }

//   // db.run(query, values, afterInsertData)

//   //DELETAR DADOS DE UMA TABELA
//   db.run(`DELETE FROM places WHERE id == ?`, [1], function(err){
//     if(err){
//       console.log(err)
//     }
      
//     console.log("Registros deletado com sucesso")
//   })

//   //Consultar dados da tabela
//   db.all(`SELECT * FROM places`, function(err, rows) {
//     if(err){
//       console.log(err)
//     }

//     console.log("Aqui estão seus registros!")
//     console.log(rows)
//   })

//   }
// );