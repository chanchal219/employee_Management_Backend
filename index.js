const express=require('express')
const cors = require('cors');
const app=express()
app.use(cors())
require('dotenv').config();

const PORT=process.env.PORT||PORT
require('./Models/db')
const EmployeeRouter=require('./Routes/EmployeeRoutes')
app.get('/',(req,res)=>{
    res.send("Employee Management server is running")
})
app.use(express.json());

app.use('/api/employees',EmployeeRouter)
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})