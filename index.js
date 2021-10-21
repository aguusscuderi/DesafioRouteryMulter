const express = require('express')
const app = express()
//const cors = cors()
const path = require('path')
const serverRouter = require('./routes')

const PORT = 8080

//app.use(cors("*"))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/form', express.static(path.join(__dirname, 'views')))

app.get('/', (req,res)=>{
    res.send('En la raiz del SERVER')
})
serverRouter(app)

app.listen(PORT, ()=> {
    console.log(`Estas conectado a http://localhost:${PORT}`)
})
