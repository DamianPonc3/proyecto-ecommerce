const { v4: uuidv4 } = require('uuid')
const createError = require('http-errors')
const { type } = require('os')



class ProductsAPI{
    constructor(){
        this.products = [
            {
                title: 'remera', 
                price: 3000,
                id: uuidv4(),
            },
            {
                title: 'jean',
                price: 6200,
                id: uuidv4()
            }
        ]
    }

    exists(id) {
        const index = this.products.findIndex(product => product.id == id)
        return index >= 0
    }

    getAll() {
        return this.products
    }

    getById(id){
        const exist = this.exists(id)

        if(!exist) throw createError(404, 'The product does not exist')

        const index = this.products.findIndex(product => product.id == id)
        return this.products[index]
    }

    save(data){
        const newProduct = {
            title: data.title,
            price: data.price,
            id: uuidv4()
        }
        this.products.push(newProduct)
        return newProduct
    }

    updateById(id, newData){
        const exist = this.exists(id)

        if(!exist) throw createError(404, 'The product does not exist')

        this.validateBody(newData)

        const index = this.products.findIndex(product => product.id == id)

        const oldProduct = this.products[index]

        const newProduct = {
            title: newData.title,
            price: newData.price,
            id: oldProduct.id
        }

        this.products.splice(index, 1, newProduct)

        return newProduct
    }

    deleteById(id){
        const exist  = this.exists(id)
        if(!exist) return;

        const index = this.products.findIndex(product => product.id == id)

        this.products.splice(index, 1)
    }
}

const instanciaProductsApi = new ProductsAPI()

module.exports = {
    ProductsController : instanciaProductsApi
}