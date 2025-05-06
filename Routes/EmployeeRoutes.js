const { createEmployee, getAllEmployees, getAllEmployeeById,deleteEmployeeById,updateemployeeById} = require('../Controllers/EmployeeController');
const { cloudinaryFileUploader } = require('../Middlewares/FileUploader');

const routes=require('express').Router();


routes.get('/',getAllEmployees
);



routes.post('/',cloudinaryFileUploader.single('profileImage'),createEmployee)

routes.get('/:id',getAllEmployeeById);

routes.delete('/:id',deleteEmployeeById);

routes.put('/:id',cloudinaryFileUploader.single('profileImage'),updateemployeeById)
module.exports=routes;