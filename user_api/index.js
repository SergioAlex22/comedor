const express = require("express")
const uri = 'mongodb+srv://admin:marcelo17@cluster1.l4c2lfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
const mongoose = require('mongoose');
mongoose.connect(uri);

const app = express()
app.use( express.json() )
const port = 8080
const { alumnoModel: alumnoModel } = require('./models');

app.get('/', (req, res) => { res.send("I am alive People"); })

app.get('/alumno', async(req, res)=>{
  const alumno = await alumnoModel.find({});
  res.json( alumno );
});

app.get('/alumno/:codeStudent', async(req, res)=>{
  const person = await alumnoModel.find({codeStudent:req.params.codeStudent});
  res.json( person );
});


app.post('/alumno', async (req, res) => {
  try {
    const { codeStudent, name, lastname } = req.body;
    const alumno = new alumnoModel({ codeStudent, name, lastname });
    const data = await alumno.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

