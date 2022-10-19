const { Router } = require('express');
const ProductsRouter = require('./products')
const router = Router();

router.get('/', (req, res) => {
    res.json({
        msg: "ok router"
    })
})

router.use('/products', ProductsRouter)

module.exports = router;