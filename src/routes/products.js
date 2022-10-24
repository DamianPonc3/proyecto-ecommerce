const asyncHandler = require('express-async-handler')
const { Router } = require('express')
const createError = require('http-errors')
const {ProductsController}  = require('../controller/products')

const router = Router();



router.get('/', (req, res) =>{
    res.json({
        msg: ProductsController.getAll()
    })
})

router.get('/:id', (req, res) =>{
        const id = req.params.id
        
        const product = ProductsController.getById(id)
        res.json({
            msg: product
    })
})


router.post('/', async (req, res, next) => {
	// const body = req.body;
	const { body }  = req

	try{
		const data = await ProductsController.save(body);
		res.json({
			data
		})
	} catch (err) {
		next(err);
	}
})

const updateAsync = async (req, res) => {
    const id = req.params.id
    const { body } = req
    const data = await ProductsController.updateById(id, body)
    res.json({
        msg: data
    })
}

router.put('/:id', asyncHandler(updateAsync))

const deleteAsync = async (req, res) => {
    const id = req.params.id
    const data = await ProductsController.deleteById(id)
    res.json({
        msg: data
    })
}

router.delete('/:id', asyncHandler(deleteAsync))


module.exports = router