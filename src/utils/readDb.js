const fs = require('fs/promises');
const path = require('path')

const db = path.join(__dirname,"../../db", "db.json")

async function leer(){
    try{
        const data = await fs.readFile(db, "utf-8");
        return JSON.parse(data)
    }catch(error){
        console.log(error)
    }

}

module.exports = leer