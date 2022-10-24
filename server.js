const Koa = require('koa')
const router = require('koa-router');
const koaBody = require('koa-body')

const app = new Koa()

app.use(koaBody())

const products = require('./products.js')

app.use(products.routes())

const PORT = 9090
const server = app.listen(PORT, () => {
    console.log(`Server listening on PORT ${server.address().port}`)
})
server.on('error', error => console.log('Error en el servidor:', error))