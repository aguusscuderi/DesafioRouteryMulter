const fs = require('fs');

const products = []

class Contenedor {
    constructor(fileName){
        this.fileName = fileName
    }   

    async save(obj){
        try{
            const exists = fs.existsSync(`./productos.json`)
            if(exists){
                 const response = await fs.promises.readFile(`./productos.json`, 'utf-8')
                 const parsedResponse = JSON.parse(response)
                 const idMap = parsedResponse.map(el => parseInt(el.id))
                 let filterMaxId = Math.max(...idMap)
                 const newId = filterMaxId+1 
                 obj.id = newId
                 parsedResponse.push(obj)
                 let fileStringify = JSON.stringify(parsedResponse)
                 try{
                    await fs.promises.writeFile(this.fileName, fileStringify)
                 }catch(e){
                     console.log('error', e)
                 }
                 return newId
            }else{
                obj.id = 1
                products.push(obj)
                let fileStringify = JSON.stringify(products)
                try{
                    await fs.promises.writeFile(this.fileName, fileStringify)
                }catch(e){
                    console.log('error', e)
                }
            }    
        }catch(e){
            console.log('error', e)
        }
       
    }   

    async getAll(){
        try{
            const response = await fs.promises.readFile("./productos.json", "utf-8");
            return JSON.parse(response)
         }catch(e){
            console.log(e);
         }
    }

    async deleteById(id) {
        const fileContent = await fs.promises.readFile(`./productos.json`, 'utf-8')
        const parsedContent = JSON.parse(fileContent)
        let deleteElement = parsedContent.filter(el => el.id != id)
        let fileStringify = JSON.stringify(deleteElement)
        try{
            await fs.promises.writeFile(this.fileName, fileStringify)
        }catch(e){
            console.log('error', e)
        }
        return deleteElement
    }

    async updateById(productUpdated){
        const fileContent = await fs.promises.readFile(`./productos.json`, 'utf-8')
        const parsedContent = JSON.parse(fileContent)
        parsedContent.push(productUpdated)
        let fileStringify = JSON.stringify(parsedContent)
        try{
            await fs.promises.writeFile(this.fileName, fileStringify)
        }catch(e){
            console.log('error', e)
        }
        return productUpdated
    }

}

module.exports = Contenedor