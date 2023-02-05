const Express = require("express");
const Bodyparser = require("body-parser");
const Mongoose = require("mongoose");
const Cors = require("cors");
const { EmployeeModel } = require("./Models/Employees");
const path = require("path")

var app = new Express();

app.use(Express.static(path.join(__dirname,"/build")))
app.use(Bodyparser.json())
app.use(Bodyparser.urlencoded({ extended: false }))
app.use(Cors())

Mongoose.set("strictQuery", true);
Mongoose.connect("mongodb+srv://Anandhan:ugugug123@cluster0.mdcorjq.mongodb.net/EmployeeAppDB?retryWrites=true&w=majority",
                 
    { useNewURlParser: true })


// Login Api
    app.post("/api/",async(req,res)=>{

        if(req.body.Username==="admin"&&req.body.Password==="admin@123"){
            res.send("admin")
        }
        else{
        await EmployeeModel.find(
        {
            $and:[{Username:req.body.Username},{Password: req.body.Password}]
        }
        ).then(
            (data)=>{
                res.json({"Status": "Success", "Data" : data})
            }
        ).catch(
            (err)=>{
                res.json({"Status": "Failed", "Data" : err})
            }
        ) 
    } 
    })




// Add employee Api

app.post("/api/employeeform", async (req, res) => {
    console.log(req.body);
    const newEmployee = new EmployeeModel(req.body)
    await newEmployee.save(
        (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err })
            } else {
                res.json({ "Status": "Success", "Data": data })
            }
        }
    )
})


// View employee
app.get("/api/employee", async (req, res) => {
    try {
        var result = await EmployeeModel.find()
        res.send(result)
    } catch (err) {
        res.Status(500).send(err)
    }
})


// View Employees
app.get("/api/viewemployees", async (req, res) => {
    try {
        var result = await EmployeeModel.find()
        res.send(result)
    } catch (err) {
        res.Status(500).send(err)
    }
})


// View single employee
app.get("/api/viewemployees/:id",(req,res)=>{
    var id = req.params.id;
    EmployeeModel.findById({_id: id},function(err,data){
        if(err) res.json(err);
        else{
            res.json(data);
        }
    })
});


// Delete employee
app.delete("/api/viewemployees/:id", (req, res) => {
    var id = req.params.id;
    var data = req.body;
    EmployeeModel.findByIdAndDelete(
        { "_id": id }, data, (err, data) => {
            if (err) {
                res.json({ "Status": "Error", "Error": err })
            } else {
                res.json({ "Status": "Success", "Data": data })
            }
        }
    )
})


// Update employee
app.post("/api/update/:id",(req,res)=>{
    var id = req.params.id;    
    var data = req.body;
    EmployeeModel.findByIdAndUpdate(
        {_id: id},data,(err,data)=>{
            if (err) {
                res.json({"Status":"Error","Error":err})
            } else {
                res.json({"Status":"Success","Data":data});
            }
        }
    )
});

app.get("/*",function(req,res){
    res.sendFile(path.join(__dirname,"/build/index.html"))
})



app.listen(3001, () => {
    console.log("Server Started");
})
