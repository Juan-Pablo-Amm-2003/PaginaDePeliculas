const fs = require('fs/promises');
const path = require('path')

const db = path.join(__dirname, "../../db", "usuarios.json")

async function Escribirusuario(data){
    try{
        await fs.writeFile(db, JSON.stringify(data, null, 2));
    }catch{
        console.log("falla escribir")
    }

}

module.exports = Escribirusuario