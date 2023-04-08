const express = require('express');
const mongoose = require('mongoose');
const app = express();

// Se establece una conexión con la base de datos
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost:27017/mongo-1', { useNewUrlParser: true });

// Se define un modelo para un objeto "Visitor"
const visitorSchema = new mongoose.Schema({
  date: Date,
  name: { type: String, default: 'Anónimo' }
});
const Visitor = mongoose.model('Visitor', visitorSchema);

// Se define la ruta para la raíz de la aplicación
app.get('/', (req, res) => {
  // Se obtiene el nombre del visitante del query string
  const name = req.query.name || '';

  // Se crea un nuevo objeto "Visitor"
  const visitor = new Visitor({
    date: new Date(),
    name: name
  });

  // Se guarda el objeto en la base de datos
  visitor.save()
    .then(() => {
      res.send('<h1>El visitante fue almacenado con éxito</h1>');
    })
    .catch((error) => {
      res.send(`<h1>Ocurrió un error al almacenar el visitante: ${error}</h1>`);
    });
});

// Se inicia el servidor
app.listen(3000, () => {
  console.log('El servidor está corriendo en el puerto 3000');
});


//http://localhost:3000/?name=carlos
//npm run dev