const express = require("express")
const userService = require("./services/userService");
const uri = 'mongodb+srv://admin:marcelo17@cluster1.l4c2lfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
const mongoose = require('mongoose');
mongoose.connect(uri);

const app = express()
app.use( express.json() )
const port = 8080
const {comedorModel } = require('./models');


app.get('/', (req, res) => { res.send("I am alive comedor"); })

app.get('/comedor', async(req, res)=>{
  const list = await comedorModel.find({});
  res.json( list );
});
app.get('/comedor/:codeStudent', async(req, res)=>{
  const codigo = await comedorModel.find({code:req.params.codeStudent});
  res.json( codigo );
});


app.post('/comedor', async(req, res)=>{
  try {
    const {codeStudent, name, lastname } = req.body;
    // Verificar si el estudiante existe utilizando userService
    const student = await userService.get(codeStudent);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const comensal = new comedorModel({codeStudent,name,lastname});
    const data = await comensal.save();
    // Si el estudiante existe, devolver una respuesta exitosa
    return res.status(200).json({ message: 'Student found', student });

  } catch (error) {
    console.log('Error', error);
    if (error.response && error.response.status === 404) {
      return res.status(404).json({ message: 'Student not found' });
    }
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

