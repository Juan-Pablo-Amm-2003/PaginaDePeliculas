const fs = require('fs/promises');
const path = require('path')

const db = path.join(__dirname, "../../db", "db.json")

async function Escribir(data){
    try{
        await fs.writeFile(db, JSON.stringify(data, null, 2));
    }catch{
        console.log("falla escribir")
    }

}

module.exports = Escribir