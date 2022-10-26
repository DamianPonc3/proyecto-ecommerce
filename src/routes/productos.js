const { Router } = require('express')
const { ProductsController } = require('../controllers/contenedor')
const asyncHandler  = require('express-async-handler')

const router = Router();

router.get('/', (req, res) => {
    res.render('index'); // Se muestra la plantilla index.pug --> Form
});

router.get('/productos', async (req, res, next) => {
    try {
        const obj = await ProductsController.getAll()
        res.render('productos', {
            products: obj,
            message: 'Loaded products'
        })
    } catch (err) {
        next(err);
    }
})

router.post('/productos', async (req, res,) => {
    const { title, price} = req.body;
    if (title && price) {
        await ProductsController.save({title, price})
        res.redirect('/productos');

    } else {
        res.send('Missing data');
    }

})

router.delete('/productos:id', async (req, res, next) => {
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