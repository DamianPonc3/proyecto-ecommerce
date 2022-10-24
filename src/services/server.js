const express = require('express');
const  { engine } = require('express-handlebars');
const mainRouter = require('../routes/index');
const path = require('path');

const app = express();
const viewsFolder = path.resolve(__dirname, '../../views')
//console.log(viewsFolder)
const layoutFolder = `${viewsFolder}/layouts`

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', mainRouter);

app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.set('views', viewsFolder)

app.engine('handlebars', engine({
    // config hbs
    layoutsDir: layoutFolder
}))


app.get('/', (req, res) => {

    res.render('main', {layout: 'index'})

});

app.get('/form', (req, res) =>{
    res.render('form', {layout: 'formLayout'})
})

app.get('/api', (req, res) =>{
    res.render('products', {layout: 'productsLayout'})
})

app.use((err, req, res, next) => {
    const status = err.status || 500
    const message = err.message || "Internal Server Error"
    res.status(status).json({
        message
    })
})


module.exports = app;