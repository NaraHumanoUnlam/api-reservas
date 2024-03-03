const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const usersFunctions = require('../../Conexiones/Conection.js');


router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));



router.get('/all', (req,res) => {
  usersFunctions.getAllUsers(req,res);
});

router.get('/getByEmail/:email', (req,res) => {
  const email = req.params.email;
  usersFunctions.getUserByEmail(req,res,email);
});

router.post('/create', async (req,res)=>{
  try {
    await usersFunctions.createUser(req, res);
  } catch (error) {
    console.error('Error al llamar a createUser:', error);
    res.status(500).json({ error: 'Error en el servidor' });
  }
})

module.exports = router;