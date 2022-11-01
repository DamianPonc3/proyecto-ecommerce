const { Router } = require('express')
const { ProductsController } = require('../controllers/contenedor')
const asyncHandler  = require('express-async-handler')

const router = Router();

router.get('/', async (req, res) => {
    try{
    const obj = await ProductsController.getAll()
    res.render('index', {
        products: obj,
        msg: 'Loaded Products'
        })
    } catch (err) {
        next(err)
    }
});

router.post('/', async (req, res,) => {
    const { title, price} = req.body;
    if (title && price) {
        await ProductsController.save({title, price})
        res.render('index');

    } else {
        res.send('Missing data');
    }

})

router.delete('/:id', async (req, res, next) => {
    try
        {const id = parseInt(req.params.id)
        await ProductsController.deleteById(id)
    res.json(
        {message: 'Removed product'}
    )
    } catch(err){
        next(err)
    }
})

module.exports = router