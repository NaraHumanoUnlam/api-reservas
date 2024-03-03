const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const url = "mongodb+srv://tallerweb2:rbeYmcKp3XtRh4Vv@tallerweb2.mn8e4jk.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(url, { ssl: true });
const databaseName = 'reservation';
const collectionUsers = 'Users';
const collectionCitas = 'Reservas';

const createUser = async (req, res) => {
    const { username, email, password } = req.body;
  
    try {
      const hashedPassword = await bcrypt.hash(password, 6);
  
      const userData = {
        username,
        email,
        password: hashedPassword
      };
  
      await client.connect();
  
      const db = client.db(databaseName);
      const collection = db.collection(collectionUsers);
  
      const result = await collection.insertOne(userData);
  
      client.close();
  
      res.json({ message: 'Usuario agregado exitosamente', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  };

  const getAllUsers = async (req,res) => {
    client.connect()
    .then(() => {
      const database = client.db(databaseName);
      const collection = database.collection(collectionUsers);
      return collection.find().toArray();
    })
    .then(result => {
      res.json(result); // Enviar el resultado como JSON en la respuesta
    })
    .catch(err => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener el usuario o los usuarios de la base de datos' });
    });

  };

  const getUserByEmail= async (req,res,email) => {
    const query = { email: `${email}` }; 
    client.connect()
    .then(() => {
      const database = client.db(databaseName);
      const collection = database.collection(collectionUsers);
      return collection.find(query).toArray();
    })
    .then(result => {
      res.json(result); // Enviar el resultado como JSON en la respuesta
    })
    .catch(err => {
      console.error('Error al ejecutar la consulta:', err);
      res.status(500).json({ error: 'Error al obtener el usuario o los usuarios de la base de datos' });
    });

  };

const createReserva = async (req,res) => 
{
    const { email, fecha_reserva } = req.body;
  
    try {  
      const data = {
        email,
        fecha_reserva,
        servicio
      };
  
      await client.connect();
  
      const db = client.db(databaseName);
      const collection = db.collection(collectionCitas);
  
      const result = await collection.insertOne(data);
  
      client.close();
  
      res.json({ message: 'Cita agregado exitosamente', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
};

const deleteReserva = async (req,res) => 
{
    const { email, fecha_reserva } = req.body;
    try {  
      const data = {
        email,
        fecha_reserva,
        servicio
      };
  
      await client.connect();
  
      const db = client.db(databaseName);
      const collection = db.collection(collectionCitas);
      const filtro = { email: email, fecha_reserva: fecha_reserva }; 
      const result = await collection.deleteOne(filtro);
  
      client.close();
  
      res.json({ message: 'Cita agregado exitosamente', insertedId: result.insertedId });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
};

const getAllReservasByEmail = async (req,res,email) => {
  client.connect()
  .then(() => {
    const database = client.db(databaseName);
    const collection = database.collection(collectionUsers);
    const filtro = { email: email }
    return collection.find(filtro).toArray();
  })
  .then(result => {
    res.json(result); // Enviar el resultado como JSON en la respuesta
  })
  .catch(err => {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error al obtener el usuario o los usuarios de la base de datos' });
  });

};

const getAllReservasByServicio = async (req,res, servicio) => {
  client.connect()
  .then(() => {
    const database = client.db(databaseName);
    const collection = database.collection(collectionUsers);
    const filtro = { servicio: servicio }
    return collection.find(filtro).toArray();
  })
  .then(result => {
    res.json(result); // Enviar el resultado como JSON en la respuesta
  })
  .catch(err => {
    console.error('Error al ejecutar la consulta:', err);
    res.status(500).json({ error: 'Error al obtener el usuario o los usuarios de la base de datos' });
  });

};
  
  module.exports = { createUser, getAllUsers, getUserByEmail, createReserva,deleteReserva,getAllReservasByEmail,getAllReservasByServicio};