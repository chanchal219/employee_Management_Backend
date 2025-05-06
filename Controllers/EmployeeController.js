const EmployeeModel = require("../Models/EmployeeModel");


const createEmployee=async (req,res)=>{
try{
const body=req.body
body.profileImage=req.file?req.file?.path:null;
console.log(body)
const emp=new EmployeeModel(body);
await emp.save();
res.status(201)
.json({
    message:"Employee Created",
    success:true,
})

}
catch(err){
    console.log("Error while creating employee:", err);
res.status(500).json({
    message:'Internal server error',
    success:false,
    error:err
})
}
}



const getAllEmployees=async (req,res)=>{
    try{
  let {page,limit,search}=req.query;
  page=parseInt(page)||1;
  limit=parseInt(limit)||5;
  const skip=(page-1)*limit;
  //page=3=> (3-1)*5=10skip

  let searchCriteria={};
  if(search){
    searchCriteria={
        name:{
            $regex:search,
            $options:'i'
        }
    }
  }
  const totalEmployees=await EmployeeModel.countDocuments(searchCriteria);

    const emps=await EmployeeModel.find(searchCriteria)
    .skip(skip)
    .limit(limit)
    .sort({updatedAt:-1});

    const totalPages=Math.ceil(totalEmployees/limit)
    
    res.status(200)
    .json({
        message:"All Employees",
        success:true,
        data:{
            employees:emps,
            pagination:{
                totalEmployees,currentPage:page,
                totalPages,
                pageSize:limit
            }
        }
    })
    
    }
    catch(error){
    
        console.log("Error while creating employee:", error);
        res.status(500).json({
            message:'Internal server error',
            success:false,
            error:error.message
    })
    }
    }

    const getAllEmployeeById=async (req,res)=>{
        try{
      const {id}=req.params;
        const emp=await EmployeeModel.findOne({_id:id});
        
        res.status(200)
        .json({
            message:"Get Employee details",
            success:true,
            data:emp
        })
        
        }
        catch(error){
        
            console.log("Error while creating employee:", error);
            res.status(500).json({
                message:'Internal server error',
                success:false,
                error:error
        })
        }
        }


        const deleteEmployeeById=async (req,res)=>{
            try{
          const {id}=req.params;
            const emp=await EmployeeModel.findByIdAndDelete({_id:id});
            
            res.status(200)
            .json({
                message:"Employee deleted",
                success:true
                
            })
            
            }
            catch(error){
            
                console.log("Error while creating employee:", error);
                res.status(500).json({
                    message:'Internal server error',
                    success:false,
                    error:error
            })
            }
            }

            
const updateemployeeById=async (req,res)=>{
    try{
    const {name,phone,email,salary,department}=req.body;
    const {id}=req.params;

    let updateData={
        name,phone,email,salary,department,updateAt:new Date()
    }

    if(req.file){
        updateData.profileImage=req.file.path;
    }
    const updateEmployee=await EmployeeModel.findByIdAndUpdate(
        id,
        updateData,
        {new:true}
    )

    if(!updateEmployee){
        return res.status(404).json({message:'Employee Not Found'})
    }
    res.status(200)
    .json({
        message:"Employee Updated",
        success:true,
        data:updateEmployee
    })
    
    }
    catch(err){
        console.log("Error while creating employee:", err);
    res.status(500).json({
        message:'Internal server error',
        success:false,
        error:err
    })
    }
    }
module.exports={
    createEmployee,
    getAllEmployees,
    getAllEmployeeById,
    deleteEmployeeById,updateemployeeById
}