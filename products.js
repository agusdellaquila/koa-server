const Router = require('koa-router')

const products = [
    {id: 1, title: 'jack daniels', price: 10000},
    {id: 2, title: 'absolut', price: 5000},
    {id: 3, title: 'vino', price: 20000},
]

const router = new Router ({
    prefix: '/products'
})

//get all
router.get('/', ctx => {
    ctx.body = {
        status: 'success',
        message: products
    }
})
//get by id
router.get('/:id', ctx => {
    const getCurrentProduct = products.filter(function (product) {
        if (product.id == ctx.params.id) {
            return true
        }
    })

    if (getCurrentProduct.length) {
        ctx.body = getCurrentProduct[0]
    } else {
        ctx.response.status = 404
        ctx.body = {
            status: 'error!',
            message: 'No se encontro el producto con ese ID'
        }
    }
})
//post
router.post('/', ctx => {
    if (
        !ctx.request.body.id ||
        !ctx.request.body.title ||
        !ctx.request.body.price
    ) {
        ctx.response.status = 404
        ctx.body = {
            status: 'error!',
            message: 'Error al ingreso, falta informacion'
        }
    } else {
        products.push({
            id: ctx.request.body.id,
            title: ctx.request.body.title,
            price: ctx.request.body.price
        })
        ctx.response.status = 201
        ctx.body = {
            status: 'success!',
            message: `${ctx.request.body.title} cargado!`
        }
    }
})
//edit by id
router.put('/update/:id', ctx => {
    if (
        !ctx.request.body.id ||
        !ctx.request.body.title ||
        !ctx.request.body.price
    ) {
        ctx.response.status = 404
        ctx.body = {
            status: 'error!',
            message: 'Error al ingreso, falta informacion'
        }
    } else {
        const id = ctx.params.id
        const index = products.findIndex(product => product.id == id)
        products.splice(index, 1, ctx.request.body)
        ctx.response.status = 201
        ctx.body = {
            status: 'success!',
            message: `${ctx.request.body.title} editado!`
        }
    }
})
//delete by id
router.delete('/delete/:id', ctx => {
    const id = ctx.params.id
    const index = products.findIndex(product => product.id == id)
    products.splice(index, 1)
    ctx.response.status = 200
    ctx.body = {
        status: 'success!',
        message: `El producto con el id ${id} fue borrado!`
    }
})

module.exports = router