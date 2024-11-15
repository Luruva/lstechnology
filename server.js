const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;



const db = mysql.createConnection({
    host: '127.0.0.1',     
    user: 'root',          
    password: '1234',          
    database: 'lstechnology',    
    port: 3306             
});


db.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
    }
    console.log('Conectado a la base de datos');
});


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/api/registro_compra', (req, res) => {
    const { nombre, correo, direccion} = req.body;

    const sql = 'INSERT INTO registro_compra(nombre, correo,direccion) VALUES (?, ?, ?)';
    const values = [nombre, correo, direccion];

    db.query(sql, values, (err, result) => {
        if (err) {
            res.status(500).send('Error al guardar los datos: ' + err.message);
        } else {
            res.status(200).send('Pago realizado con éxito');
        }
    });
});


app.listen(3000, () => {
    console.log('Servidor escuchando en el puerto 3000');
  });
  
