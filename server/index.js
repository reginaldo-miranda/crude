const express = require('express');
const app = express();
const mysql = require('mysql2');
const cors = require('cors');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'crudgames'
});

/*
app.get('/', (req, res) =>{
   let sql = "INSERT INTO games (name, cost, category) values ('test334', 20, 'test')";
   
   db.query(sql, (err, result) =>{
    console.log(err)
   })
  
})*/

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { name, cost, category } = req.body;
  const sql = "INSERT INTO games (name, cost, category) VALUES (?, ?, ?)";
  db.query(sql, [name, cost, category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro ao inserir no banco de dados" });
    }
    res.json({ message: "Jogo inserido com sucesso!" });
  });
});

app.get("/getCards", (req, res) =>{
  let sql = "SELECT * FROM games";
  db.query(sql, (err, result) =>{
    if (err) console.log(err);
    else res.send(result)

  });

});

app.listen(3001, () => {
    console.log('Server running on port 3001');
});

// https://www.youtube.com/watch?v=5_9rvyT9cg4&t=324s
