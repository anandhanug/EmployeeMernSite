const Mongoose = require("mongoose");

const EmployeeSchema = Mongoose.Schema(
    {
        Name : String,
        Designation : String,
        Location : String,
        Salary : Number,
        Username : String,
        Password : String
    }
)

const EmployeeModel = Mongoose.model("Employees",EmployeeSchema);
module.exports = {EmployeeModel};