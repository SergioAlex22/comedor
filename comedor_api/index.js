const express = require("express")
const userService = require("./services/userService");
const uri = 'mongodb+srv://admin:marcelo17@cluster1.l4c2lfi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1'
const mongoose = require('mongoose');
mongoose.connect(uri);
const app = express()
app.use( express.json() )
const port = 8080
const { payModel } = require('./models');
app.get('/', (req, res) => { res.send("I am alive comedor"); })

app.get('/comedor', async(req, res)=>{
  const list = await payModel.find({});
  res.json( list );
});
app.get('/comedor/:code', async(req, res)=>{
  const payment = await payModel.find({code:req.params.code});
  res.json( payment );
});
app.post('/comedor', async(req, res)=>{
  try {
    const {code, codeStudent,status} = req.body;
    
    const loan=await userService.get(codeStudent);
    console.log("LOAN", loan);
    if(!loan) throw ("LOAN_NOT_FOUND");
    if( loan.status!='PENDING') throw ("LOAN_NOT_PENDING");

    const payment = new payModel({code, codeStudent, status });
    const data = await payment.save();
    await loanService.changeStatus(loanCode,'PAID');
    return res.status(201).json(data);
    

  } catch (error) {
    console.log('Error', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

