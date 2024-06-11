const express = require("express")
const uri = 'mongodb+srv://silvaiberson3:iberson123@cluster0.j8pegzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'

const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { peopleModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive People"); })

app.get('/people', async(req, res)=>{
  const people = await peopleModel.find({});
  res.json( people );
});
app.get('/people/:codeStudent', async(req, res)=>{
  const person = await peopleModel.find({codeStudent:req.params.codeStudent});
  res.json( person );
});
app.post('/people', async(req, res)=>{
  try {
    const codeStudent = req.body.codeStudent;
    const name = req.body.name;
    const lastname = req.body.lastname;

    const person = new peopleModel({ codeStudent,name,lastname, birthday});

    const data = await person.save();
    return res.status(201).json(data);
  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

