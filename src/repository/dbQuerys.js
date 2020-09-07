var path = require('path');
const fs = require('fs');

const loadUsers = ()=>{
    try{
        var jsonPath = path.join(__dirname , '..' , 'db', 'manifest.json');        
        const dataBuffer = fs.readFileSync(jsonPath);
        const dataJson = dataBuffer.toString();        
        return JSON.parse(dataJson);
    } catch(e){
        console.log(e);
        return [];
    }
}

const saveUser = (user)=>{
    const dataJson = JSON.stringify(user);
    var jsonPath = path.join(__dirname , '..' , 'db', 'manifest.json');
    fs.writeFileSync(jsonPath, dataJson);
}

const loadStudent = ()=>{
    try{
        var jsonPath = path.join(__dirname, '..' , 'db', 'details.json');        
        const dataBuffer = fs.readFileSync(jsonPath);
        const dataJson = dataBuffer.toString();        
        return JSON.parse(dataJson);
    } catch(e){
        console.log(e);
        return [];
    }
}

const saveStudent = (user)=>{
    const dataJson = JSON.stringify(user);
    var jsonPath = path.join(__dirname, '..' ,'db', 'details.json');
    fs.writeFileSync(jsonPath, dataJson);
}

module.exports = {
    loadUsers,
    saveUser,
    loadStudent,
    saveStudent
}