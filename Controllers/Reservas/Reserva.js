const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const citasFunctions = require('../../Conexiones/Conection.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/create', async (req,res)=>{
    try {
      await citasFunctions.createCita(req, res);
    } catch (error) {
      console.error('Error al llamar a crearCita:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.delete('/delete', async (req,res)=>{
    try {
      await citasFunctions.deleteReserva(req, res);
    } catch (error) {
      console.error('Error al llamar a deleteReserva:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/getByEmail/:email', async (req,res)=>{
    const email = req.params.email;
    try {
      await citasFunctions.getAllReservasByEmail(req, res,email);
    } catch (error) {
      console.error('Error al llamar a getAllReservasByEmail:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  router.get('/getByService/:service', async (req,res)=>{
    const serv = req.params.service;
    try {
      await citasFunctions.getAllReservasByServicio(req, res,serv);
    } catch (error) {
      console.error('Error al llamar a getAllReservasByServicio:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  });

  module.exports = router;