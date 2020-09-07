const express = require('express');
var jwt = require('jsonwebtoken');
const app = express();
const dbQuerys = require('./repository/dbQuerys')

app.use(express.json())

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/studentLogin',(req, res)=>{
    const parsedJsonData = dbQuerys.loadUsers();
    // console.log(parsedJsonData);   
    let result = {
        valid: false,
        token: '',
        error: false
    }  
    console.log("API HIt", req.body);

    for (const iterator of parsedJsonData) {             
        if ((iterator.username == req.body.username) && (iterator.password == req.body.password)) {
            var token = jwt.sign({username: req.body.username}, '@94urn4u&*^&*98&98u7aiosu98upiOUu798a', { expiresIn: '300000' });
            result.valid = true;
            result.token = token;
            res.send(result);
        }
    }
    if(!result.valid){
        result.error = true;
        res.send(result);
    }      
})

app.post('/studentSignIn',(req, res)=>{       
    const parsedJsonData = dbQuerys.loadUsers();
    // console.log(parsedJsonData);
    let result = {
        success: false,
        token: '',
        error: false,
        msg:''
    }  

    if(!req.body.username){
        result.error = true;
        result.msg = 'Please provide User name';
        res.send(result);
    }
    if(!req.body.password){
        result.error = true;
        result.msg = 'Please provide Password ';
        res.send(result);
    }
    console.log("API HIt", req.body);

    const duplicateUser = parsedJsonData.filter((user) => ((user.username == req.body.username) && (user.password == req.body.password)));
    console.log("duplicateUser", duplicateUser.length);
    if(duplicateUser.length != 0){        
        result.error = true;
        result.msg = 'Already Registered';
        res.send(result);
    }else{
        parsedJsonData.push({
            username:req.body.username,
            password:req.body.password
        })
        dbQuerys.saveUser(parsedJsonData);
        var token = jwt.sign({username: req.body.username}, '@94urn4u&*^&*98&98u7aiosu98upiOUu798a', { expiresIn: '300000' });
        result.success = true;
        result.token = token;
        result.msg = 'User Created Succesfully';
        res.send(result);
    }      
})

app.get('/getStudents',(req, res)=>{
    const parsedJsonData = dbQuerys.loadStudent();
    const totalCount = parsedJsonData.length;
    const result = {
        totalCount,
        data:parsedJsonData
    };
    res.send(result);
})

app.post('/studentRegister',(req, res)=>{       
    const studentList = dbQuerys.loadStudent();
    // console.log(parsedJsonData);
    let result = {
        success: false,        
        error: false,
        msg:''
    }  

    if(!req.body.firstName){
        result.error = true;
        result.msg = 'Please provide First Name';
        res.send(result);
    }
    if(!req.body.lastName){
        result.error = true;
        result.msg = 'Please provide Last Name ';
        res.send(result);
    }

    console.log("API HIt", req.body);

    const duplicateUser = studentList.filter((user) => (user.email == req.body.email));
    console.log("duplicateUser", duplicateUser.length);
    if(duplicateUser.length != 0){        
        result.error = true;
        result.msg = 'Already Registered';
        res.send(result);
    }else{
        const { firstName, lastName , fatherName, email, address, mobileNo, gender , dob , country} = req.body
        studentList.push({
            firstName,
            lastName,
            fatherName,
            email,
            address,
            mobileNo,
            gender,
            dob,
            country            
        })
        dbQuerys.saveStudent(studentList);        
        result.success = true;        
        result.msg = 'Student Created Succesfully';
        res.send(result);
    }      
})


app.listen(3006,()=>{
    console.log("Server is running on port 3006")
})