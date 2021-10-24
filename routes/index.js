const { Router } = require('express')
const router = Router()
const productClass = require('../products')

const productsFromFile = new productClass('productos.json')

function serverRouter(app){
    app.use('/api', router)

    router.get('/productos', async (req, res)=>{
        const dataAll = await productsFromFile.getAll()
        res.send(dataAll)
    })

    router.post('/productos', async (req, res)=>{
        let product = req.body
        await productsFromFile.save(product)
        res.send('Agregado con exito!')
    })

    router.get('/productos/:id', async (req, res)=>{
        let { id } = req.params
        const dataAll = await productsFromFile.getAll()
        const filteredUserById = dataAll.filter(el => el.id == id) 
        filteredUserById.length == 0 ? res.send({'error': 'Producto no encontrado'}) : res.send(filteredUserById)
    })

    router.put('/productos/:id', async (req, res)=>{
        let { id } = req.params
        let  productUpdated  = req.body
        await productsFromFile.updateById(productUpdated, id)
        res.send('Actualizado con exito!')
    })

    router.delete('/productos/:id', async (req, res)=>{
        let { id } = req.params
        await productsFromFile.deleteById(id)
        res.send(`Eliminado con exito!`)
    })
}

module.exports = serverRouter